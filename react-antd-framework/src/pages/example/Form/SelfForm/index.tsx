import React, { Component, createRef } from "react";
import { RouteComponentProps } from "react-router";

// import SmartFilter from "@/framework/ui/UdForm/UdFilterForm/SmartFilter";
// import NormalFilter from "@/framework/ui/UdForm/UdFilterForm/NormalFilter";

import { FormFields } from "./index.options";
import { Form } from "antd";
import {
  getFormItemArray,
  getFormItemOption
} from "@/framework/ui/UdForm/method/FormItem";
import { WrappedFormUtils } from "antd/lib/form/Form";
import { IUdFormItemSetting, IUdFormFileld } from "@/framework/ui/UdForm/types";
import ContorlInput from "@/framework/ui/UdForm/controls/ContorlInput";
import { UdFormControls } from "@/framework/ui/UdForm/types/controls";
interface IProps extends RouteComponentProps {
  form: WrappedFormUtils;
}

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 }
  },
  wrapperCol: {
    xs: { span: 12 },
    sm: { span: 10 }
  }
};

class SelfForm extends Component<
  IProps,
  { data: any; FormItems: IUdFormItemSetting[] }
> {
  public form;
  constructor(props) {
    super(props);
    this.form = createRef();
    this.state = {
      data: {},
      FormItems: []
    };
  }
  componentDidMount() {
    let { form } = this.props;
    let control: any = {
      type: UdFormControls.SelfControl,
      selfControl: (
        <ContorlInput onChange={this.nameChange} placeholder='请输入名称' />
      )
    };
    FormFields[0].control = control;
    let FormItems = getFormItemOption(FormFields, form);
    this.setState({ FormItems });
  }
  public submitData = data => {
    this.setState({ data });
  };
  public nameChange = value => {
    this.props.form.validateFields(["name"], { force: true });
  };
  public handleSubmit = () => {
    this.form.current.setFieldsValue({ title: 224 });
  };

  render() {
    let { form } = this.props;
    let { FormItems } = this.state;
    return (
      <div className='page'>
        <div className='page-title'>自定义表单</div>
        <Form {...formItemLayout} onSubmit={this.submitData}>
          <div className='page'>{getFormItemArray(FormItems, form)}</div>
        </Form>
      </div>
    );
  }
}

export default Form.create()(SelfForm);
