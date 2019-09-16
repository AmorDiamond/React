import React, { SFC } from 'react';
import { DatePicker } from 'antd';
import { getMomentTimeByString } from '@/utils';

import 'moment/locale/zh-cn';
import { Moment } from 'moment';


/* 日期扩展 */
interface IDateSupple {
    format: string;
    allowClear: boolean;
}
interface IProps {
    value: string;
    onChange: (value:string) => void;
    suppleParams?: IDateSupple;
    placeholder?: string;
    disabled? : boolean;
}

class ContorlDatePicker extends React.Component<IProps, any> {
    public handleChange = (data: Moment | null, dataString: string)=> {
        const { onChange } = this.props;
        onChange && onChange(dataString);
    }
    render() {
        const { value, suppleParams={format: 'YYYY-MM-DD', allowClear: true}, placeholder="请选择日期", disabled=false } = this.props;
        const { format, allowClear } = suppleParams;
        const momentValue = getMomentTimeByString(value);
        return (
            <DatePicker onChange={this.handleChange} value={momentValue} format={format} allowClear={allowClear} placeholder={placeholder} disabled={disabled} />
        )
    }
}
export default ContorlDatePicker