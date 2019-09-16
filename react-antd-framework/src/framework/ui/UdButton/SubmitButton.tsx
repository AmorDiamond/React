import React, { Component, createRef, ReactNode } from "react";
import { Button } from "antd";
import { BaseButtonProps } from "antd/lib/button/button";

interface IProps extends BaseButtonProps {
  onClick?: (e: any) => void;
}

class UdButton extends Component<IProps, any> {
  public button;
  constructor(props) {
    super(props);
    this.button = createRef();
  }
  public handleClick = e => {
    const { onClick } = this.props;
    if (onClick) {
      this.button.current.buttonNode.disabled = true;
      onClick(e);
    }
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.loading) {
      this.button.current.buttonNode.disabled = true;
    } else {
      this.button.current.buttonNode.disabled = false;
    }
  }
  
  render() {
    const { loading = false, onClick, ...otherProps } = this.props;
    return (
      <Button type='primary' {...otherProps} ref={this.button} onClick={this.handleClick} loading={loading}>
        {this.props.children}
      </Button>
    );
  }
}
export default UdButton;
