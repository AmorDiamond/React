import React, { ReactNode, Component } from "react";
import { Form, Button, Icon } from "antd";
import _ from "lodash";

import { IUdFormFileld, IUdFormProps, IUdFormItemSetting, IUdFormLayout } from "../../types";
import { WrappedFormUtils, FormProps } from "antd/lib/form/Form";

import { compareObject, classNames } from "@/utils";

// import "./NormalFilter.less";
import { isArray } from "util";
import { getFormItemOption, getFormItemArray } from "../../method/FormItem";
import { getSubmitDataByFormValue, getFormValueByValues, getFormLayout } from "../../method";

import "./index.less";
import {GetActionButtons} from "@ui/UdActionButton/ActionButtons";

/**验证表单全局属性 */
export interface IUdFilterFormProps {
  fields: IUdFormFileld[];
  values?: any;
  count?: number;
  form: WrappedFormUtils;
  isExpand?: boolean;
  changeExpand?: (params: boolean) => void;
  className?: string | string[];
  submit: (model: any) => void;
  rightSpace?: number;
  btnLeftSpace?: number;
  btnRightSpace?: number;
  pageBtnList?: any;
  changeModal?: any;
}

class NormalFilter extends Component<IUdFilterFormProps, { FormItems: any[]; init: boolean; rightBtnList: any[] }> {
  constructor(props: any) {
    super(props);
    this.state = { FormItems: [], init: false, rightBtnList: [] };
  }
  componentWillReceiveProps(nextProps: IUdFilterFormProps) {
    if (!this.state.init) {
      /**初始化赋值 */
      this.setState({ init: true }, () => {
        let values=nextProps.values?getFormValueByValues(nextProps.fields, nextProps.values):{}
        this.props.form.setFieldsValue(values);
      });

    }
  }
  componentDidMount() {
    let { fields, form, values, count,pageBtnList=[],changeModal } = this.props;
    if (this.props.count) {
      let num: number = this.props.count;
      fields = fields.map((field, index) => {
        if (!(index < num)) {
          field.className = "can-hidden-item";
        }
        return field;
      });
    }
    const FormItems = getFormItemOption(fields, form);
    const rightBtnList:any = GetActionButtons<any>({ btnlist: pageBtnList, data: {}, changeModal, loading: false });
    this.setState({ FormItems,rightBtnList });
    /**WillReceiveProps周期方法移动到DidMount*/
    if (values) {
      /**初始化赋值 */
      let initialValues=getFormValueByValues(fields, values);
      this.props.form.setFieldsValue(initialValues);
    }
  }

  public GetItems = () => {
    const { fields, form, values } = this.props;
    const FormItems = getFormItemOption(fields, form, values);
    return FormItems;
  };

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
  /**提交 */
  public Expand = () => {
    const { isExpand, changeExpand } = this.props;
    changeExpand && changeExpand(!isExpand);
  };

  /**重置 */
  public reset = () => {
    this.props.form.resetFields();
  };

  public render(): ReactNode {
    const { FormItems,rightBtnList } = this.state;
    const { form, className, count, isExpand,rightSpace=10,btnLeftSpace=10,btnRightSpace=10 } = this.props;
    const filterShrink: boolean = count != null && !isExpand;
    const classNameArray: any = isArray(className) ? className.push("filter-form") : ["filter-form", className];

    return (
      <div className={classNameArray.join(" ")}>
        <Form onSubmit={this.submitData}>
          <div style={{paddingRight:rightSpace}} className={classNames(["filter-form-content", filterShrink && "content-hidden"])}>{getFormItemArray(FormItems, form)}</div>
          <div className='filter-form-footer' style={{paddingLeft:btnLeftSpace,paddingRight:btnRightSpace}}>
            <Button type='primary' htmlType='submit' onClick={this.submitData}>
              搜索
            </Button>
            <Button onClick={this.reset}>重置</Button>
            {count != null && (
              <Button onClick={this.Expand}>
                {isExpand ? (
                  <span>
                    <Icon type='caret-up' /> 收起
                  </span>
                ) : (
                  <span>
                    <Icon type='caret-down' /> 展开
                  </span>
                )}
              </Button>
            )}
            {(rightBtnList&&rightBtnList[0])&&<div className="filter-page-btn-list">
              {rightBtnList.map(item=>(item))}
            </div>}
          </div>
        </Form>
      </div>
    );
  }
}

/**设置表单默认值 */
export default Form.create<IUdFilterFormProps>()(NormalFilter);
