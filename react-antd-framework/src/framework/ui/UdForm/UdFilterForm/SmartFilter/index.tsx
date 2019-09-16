import React, { ReactNode, Component } from "react";
import { Form, Button } from "antd";
import _ from "lodash";

import { IUdFormFileld, IUdFormProps, IUdFormItemSetting, IUdFormLayout } from "../../types";
import { WrappedFormUtils, FormProps } from "antd/lib/form/Form";

import { compareObject } from "@/utils";

// import "./NormalFilter.less";
import { isArray } from "util";
import { getFormItemOption, getFormItemArray } from "../../method/FormItem";
import { getSubmitDataByFormValue, getFormValueByValues, getFormLayout } from "../../method";

import "./index.less";

/**验证表单全局属性 */
export interface IUdFilterFormProps {
  fields: IUdFormFileld[];
  values: any;
  form: WrappedFormUtils;
  showReset?: boolean;
  btnLeftSpace?: number;
  submit: (model: any) => void;
}

class NormalFilter extends Component<IUdFilterFormProps, { FormItems: any[]; init: boolean }> {
  constructor(props: any) {
    super(props);
    this.state = { FormItems: [], init: false };
  }

  componentWillReceiveProps(nextProps: IUdFilterFormProps) {
    if (!this.state.init) {
      // let valuesLength = Object.keys(nextProps.values).length;
      // let currentValueLength = Object.keys(this.props.values).length;
      // if (currentValueLength > valuesLength && valuesLength == 0) {
      /**初始化赋值 */
      this.setState({ init: true }, () => {
        let values=nextProps.values?getFormValueByValues(nextProps.fields, nextProps.values):{}
        this.props.form.setFieldsValue(values);
        // this.props.form.resetFields();
      });
      // }
    }
  }
  
  componentDidMount() {
    const { fields, form, values = {} } = this.props;
    const FormItems = getFormItemOption(fields, form);
    this.setState({ FormItems });
  }

  /**提交 */
  public submitData = e => {
    e.preventDefault();
    const { submit } = this.props;
    this.props.form.validateFieldsAndScroll((errors, values) => {
      if (!errors) {
        const SubmitData = getSubmitDataByFormValue(values);
        /**新的键提交 */
        submit({ filterSearch: SubmitData });
      }
    });
  };

  /**重置 */
  public reset = () => {
    this.props.form.resetFields();
  };

  public render(): ReactNode {
    const { FormItems } = this.state;
    const { form, showReset, btnLeftSpace = 10 } = this.props;

    return (
      <div className='filter-form'>
        <Form onSubmit={this.submitData}>
          <div className='filter-form-content filter-form-3-content'>
            {getFormItemArray(FormItems, form)}
            <div className='ant-row ant-form-item op-item'>
              <Button style={{marginLeft:btnLeftSpace}} type='primary' htmlType='submit' onClick={this.submitData}>
                搜索
              </Button>

              {showReset && <Button onClick={this.reset}>重置</Button>}
            </div>
          </div>
        </Form>
      </div>
    );
  }
}

/**设置表单默认值 */
export default Form.create<IUdFilterFormProps>()(NormalFilter);
