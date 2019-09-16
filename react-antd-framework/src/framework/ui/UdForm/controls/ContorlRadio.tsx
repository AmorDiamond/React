import React from "react";
import { Input, Radio } from "antd";

const RadioGroup = Radio.Group;

interface IRadio {
  title: string;
  value: any;
}
interface IProps {
  value: string,
  disabled: boolean,
  placeholder: string,
  onChange(value: any): void,
  options: IRadio[],
  defaultValue: any  
}

interface IState {
  [statePropName: string]: any
}

class ContorlRadio extends React.Component<IProps, IState> {
  render() {
    let props = this.props;

    return (
      <RadioGroup
      onChange={e => {
        props.onChange(e.target.value);
      }}
        value={props.value || props.value=='0' ? props.value : props.defaultValue }
        disabled={props.disabled}
        >
        {props.options.map((option: IRadio) => (
          <Radio 
            key={option.value} 
            value={option.value}
          >
            {option.title}
          </Radio>
        ))}
      </RadioGroup>
    );
  }
}

export default ContorlRadio;
