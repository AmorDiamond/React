import React, { Component } from "react";
import { Select } from "antd";

const { Option } = Select;

class ASelect extends Component<any, any> {
  public handleChange(value) {
    console.log(value); // { key: "lucy", label: "Lucy (101)" }
  }
  render() {
    let { tt } = this.props;
    return (
      <Select
        labelInValue
        value={tt}
        style={{ width: 120 }}
        onChange={this.handleChange}
      >
        <Option value='jack'>Jack (100)</Option>
        <Option value='lucy'>Lucy (101)</Option>
        <Option value='tt'>测试值</Option>
      </Select>
    );
  }
}
export default ASelect;
