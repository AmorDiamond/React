import React from "react";
import { Select } from "antd";
const Option = Select.Option;

interface IOption {
  title: string;
  value: any;
}

interface IProps {
  value?: string;
  mode?: any;
  disabled?: boolean;
  placeholder: string;
  options: IOption[];
  onChange?(value: any): void;
}

class ContorlSelect extends React.Component<IProps, {}> {
  public fileter = (inputValue, option) => {
    return option.props.value.indexOf(inputValue) > -1 || option.props.children.indexOf(inputValue) > -1;
  };
  render() {
    let props = this.props;
    let { mode, disabled } = this.props;
   
    return (
      <Select filterOption={this.fileter} disabled={disabled} value={props.value} allowClear={true} mode={mode} onChange={props.onChange} placeholder={props.placeholder}>
        {props.options.map((option: IOption) => (
          <Option key={option.value} value={option.value}>
            {option.title}
          </Option>
        ))}
      </Select>
    );
  }
}

export default ContorlSelect;
