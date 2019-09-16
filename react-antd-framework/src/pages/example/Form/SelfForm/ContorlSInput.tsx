import React from "react";
import { Input, Icon } from "antd";
import TableCell from "@/framework/component/UdTable/validateTable/ValidateTableCell";

interface IProps {
  value?: any[];
  disabled?: boolean;
  placeholder?: string;
  onChange?: (value: any) => void;
  onBlur?: (value: any) => void;
  maxLength?: number;
}

interface IState {
  [statePropName: string]: any;
}

class ContorlSInput extends React.Component<IProps, IState> {
  public onBlur = e => {
    // e.target.value.replace(/(^\s*)|(\s*$)/g, "");
    let { onBlur } = this.props;
    onBlur && onBlur(e.target.value && e.target.value.replace(/^\s+|\s+$/g, ""));
  };
  public add = e => {
    // e.target.value.replace(/(^\s*)|(\s*$)/g, "");
    let { onChange, value = [""] } = this.props;
    value.push("");
    debugger;
    onChange && onChange(value);
  };
  ValiadateAll
  public onChange = (val, index) => {
    // e.target.value.replace(/(^\s*)|(\s*$)/g, "");
    let { onChange, value = [{ name: "", errorInfo: "", isop: false }] } = this.props;
    let errorInfo = val == "" ? "数据不能为空" : "";
   
    value[index].errorInfo = errorInfo;
    debugger;
    value[index].name = val;
    onChange && onChange(value);
  };
  render() {
    let { value = [{ name: "", errorInfo: "", isop: false }] } = this.props;

    return (
      <div>
        {value.map((item, index) => (
          <TableCell errorInfo={item.errorInfo}>
            <Input
              key={index}
              onChange={e => {
                this.onChange(e.target.value, index);
              }}
              value={item.name}
            />
          </TableCell>
        ))}
        <span onClick={this.add}>+</span>
      </div>
    );
  }
}

export default ContorlSInput;
