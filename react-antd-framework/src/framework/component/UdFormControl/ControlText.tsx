import React, { Component } from "react";

interface Iprops {
  value: any,
  options: any
}
class ControlText extends Component<any, any>{
  render() {
    let { options, value } = this.props;
    return <div>{options ? options[value] : value}</div>;
  }
}

export default ControlText;
