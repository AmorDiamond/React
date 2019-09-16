/**
 * 获取formItems,生成jsx并渲染
 */
import React, { ReactNode, Component } from "react";
import _ from "lodash";
import { Form } from "antd";
import { FormProps } from "antd/lib/form";

import { IUdFormProps, IUdFormItemSetting, IUdFormFileld } from "../types";
import { getFormItemArray, getFormItemOption } from "../method/FormItem";
import { getFormValueByValues, getFormLayout } from "../method";
import { toJS } from "mobx";
import { compareObject } from "@/utils";

class UdSForm extends Component<
  IUdFormProps,
  { FormItems: IUdFormItemSetting[]; layout?: FormProps }
> {
  constructor(props: IUdFormProps) {
    super(props);
    this.state = { FormItems: [] };
  }

  componentDidMount() {
    // const { fields, values } = this.props;
    const layout: any = getFormLayout(this.props.layout);
    const FormItems = this.GetItems();
    this.setState({ layout, FormItems });
  }

  componentWillReceiveProps(nextProps) {
    const { fields, form,values } = this.props;
    if(!compareObject(values,nextProps.values)){
      const FormItems = getFormItemOption(fields, form, nextProps.values);
      this.setState({ FormItems });
    }
  }

  /**获取元素*/
  public GetItems = () => {
    let { fields, form, values } = this.props;
    const FormItems = getFormItemOption(toJS(fields), form, values);
    return FormItems;
  };
  /**用于直接重新赋值 */
  public setNewValue = value => {
    const FormItems = this.GetItems();
    this.setState({ FormItems });
  };

  public render(): ReactNode {
    const { layout = {}, FormItems } = this.state;
    const { form } = this.props;

    return (
      <Form {...layout}>
        <div className='form-item'>{getFormItemArray(FormItems, form)}</div>
      </Form>
    );
  }
}

const UdForm = Form.create<IUdFormProps>()(UdSForm);

/**设置表单默认值 */
export default UdForm;
