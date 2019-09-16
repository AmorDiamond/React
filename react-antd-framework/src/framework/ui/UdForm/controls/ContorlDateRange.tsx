import React, { Component } from "react";
import { DatePicker } from "antd";
import { getMomentTimeByString } from "@/utils";

const RangePicker = DatePicker.RangePicker;

import "moment/locale/zh-cn";

/* 日期扩展 */
interface IDateSupple {
    format: string;
    allowClear: boolean;
}
interface IProps {
    onChange: (data: string[])=>void;
    value: any[];
    suppleParams?: IDateSupple;
    disabled?: boolean;
}

class ContorlDateRange extends Component<IProps, any> {
    public handleChange = (dates: any, dateStrings: [string, string]) => {
        if (dateStrings[0] !== "") {
          dateStrings[0] = dateStrings[0] + " 00:00:00";
          dateStrings[1] = dateStrings[1] + " 23:59:59";
        }
        const { onChange } = this.props;
        onChange && onChange(dateStrings);
      };
    render() {
        const {value=[], suppleParams = { format: "YYYY-MM-DD", allowClear: true }, disabled=false} = this.props;
        const { format, allowClear } = suppleParams;
        const start = getMomentTimeByString(value[0]);
        const end = getMomentTimeByString(value[1]);
        let currentVal: any[] = [start, end];
        if (end == null) {
            currentVal = [start];
          }
        return (
            <RangePicker style={{maxWidth: '200px'}} onChange={this.handleChange} value={currentVal} format={format} allowClear={allowClear} placeholder={["开始时间", "结束时间"]} disabled={disabled} />
        )
    }
}

export default ContorlDateRange;
