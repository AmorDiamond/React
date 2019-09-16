import React from "react";
import { Select } from "antd";

import { observer } from "mobx-react";
import ajaxSelectOption from "./store";
import { pageGet } from "@/api/ajaxExtend";

const Option = Select.Option;

interface IProps {
  value?: string;
  placeholder: string;
  disabled?: boolean;
  onChange?: (value: any) => void;
  keyTranslate?: { title: string; value: string };
  getOptionUrl: string;
  allowClear?: boolean;
  mode?: 'default' | 'multiple' | 'tags' | 'combobox' | string;
}

interface IState {
  options: any[];
  loading: boolean;
}

@observer
class ContorlAjaxSelect extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      options: [],
      loading: false
    };
  }

  componentDidMount() {
    const { getOptionUrl } = this.props;
    const callback = ({ isSuccess, data }) => {
      this.setState({
        loading: false
      });
      if (isSuccess && data) {
        this.setState({
          options: data
        });
      }
    };
    this.setState({
      loading: true
    });
    pageGet({ url: getOptionUrl, callback });
  }

  render() {
    const { options = [], loading } = this.state;
    let { value, mode, onChange, placeholder, disabled = false, allowClear = true, keyTranslate = { value: "value", title: "title" } } = this.props;

    return (
      <Select mode={mode}  allowClear={allowClear} onChange={onChange} placeholder={placeholder} value={value === "" || value == null ? undefined : value} disabled={disabled} loading={loading}>
        {options.length > 0 &&
          options.map(option => (
            <Option key={option[keyTranslate.value]} value={option[keyTranslate.value]}>
              {option[keyTranslate.title]}
            </Option>
          ))}
      </Select>
    );
  }
}

export default ContorlAjaxSelect;
