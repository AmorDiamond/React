import React from "react";
import { Input } from "antd";
const TextArea = Input.TextArea

interface IAutoSize {
  minRows: number, 
  maxRows: number
}

interface IProps {
  placeholder: string,
  autosize?: boolean | IAutoSize,
  value: string,
  disabled?: boolean,
  onChange(value: any): void,
  onPressEnter?: (value: any) => any
}

class ContorlTextArea extends React.Component<IProps, {}> {
 
  render() {
    let props = this.props;
    let { 
      disabled = false, 
      autosize = true, 
      onPressEnter = undefined,
     } = this.props

    return (
      <TextArea 
        value={props.value}
        disabled={disabled} 
        autosize={autosize}
        placeholder={props.placeholder}
        onPressEnter={onPressEnter}
        onChange={props.onChange} 
      />
    )
  }
}

export default ContorlTextArea;