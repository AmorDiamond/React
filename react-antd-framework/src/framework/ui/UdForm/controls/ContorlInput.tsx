import React from "react";
import { Input } from "antd";

interface IProps {
  value?: string;
  disabled?: boolean;
  placeholder?: string;
  onChange?: (value: any) => void;
  onBlur?: (value: any) => void;
  maxLength?: number;
}

interface IState {
  [statePropName: string]: any;
}

class ContorlInput extends React.Component<IProps, IState> {
  public onBlur = e => {
   // e.target.value.replace(/(^\s*)|(\s*$)/g, "");  
    let { onBlur } = this.props;
    onBlur && onBlur(e.target.value && e.target.value.replace(/^\s+|\s+$/g, ""));
  };
  render() {
    let props = this.props;
    
    return (
      <Input
        maxLength={props.maxLength}
        value={props.value}
        disabled={props.disabled}
        onChange={e => {
          props.onChange && props.onChange(e.target.value && e.target.value.replace(/^\s+|\s+$/g, ""));
        }}
        onBlur={this.onBlur}
        placeholder={props.placeholder}
      />
    );
  }
}

export default ContorlInput;
