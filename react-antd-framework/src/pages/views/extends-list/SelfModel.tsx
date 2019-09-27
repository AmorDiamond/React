import React, { Component } from "react";
import { Form, Modal, Switch } from "antd";

import { WrappedFormUtils } from "antd/lib/form/Form";
import { IActionModal, IActionAjax } from "@/framework/ui/UdActionButton/types";
import { IUdFormFileld } from "@/framework/ui/UdForm/types";
import { UdFormControls } from "@/framework/ui/UdForm/types/controls";
import UdTreeSelect from "@/framework/component/UdFormControl/ContorlTreeSelect";
import { VaildatorTypes } from "@/framework/ui/UdForm/types/vaildator";
import { pageGet } from "@/api/ajaxExtend";
import { getFormItemOption, getFormItemArray } from "@/framework/ui/UdForm/method/FormItem";

const layout = {
  labelCol: { sm: { span: 6 } },
  wrapperCol: { sm: { span: 15 } }
};
interface IFormPopup<T> {
  action?: IActionModal<T>;
  visible: boolean;
  submintloading: boolean;

  model?: any;
  form: WrappedFormUtils;
  submit: ({ ajaxInfo, params, loadingKey, callback }) => void;
  close: (type: string) => void;
}

class SelfModel<T> extends Component<IFormPopup<T>, { showItems: boolean; FormItems: any[] }> {
  public hiddenItems = showItems => {
    this.setState({ showItems });
  };
  public fields: IUdFormFileld[] = [
    {
      key: "parentId",
      name: "联动效果extentd",
      control: {
        type: UdFormControls.SelfControl,
        selfControl: <Switch onChange={this.hiddenItems} />
      }
    },
    {
      key: "code",
      name: "自定义选项1",
      control: {
        type: UdFormControls.Input
      }
    },
    {
      key: "name",
      name: "自定义选项2",
      control: {
        type: UdFormControls.Input
      }
    }
  ];

  constructor(props) {
    super(props);
    this.state = { FormItems: getFormItemOption(this.fields, props.form), showItems: false };
  }

  componentWillReceiveProps(nextProps: IFormPopup<T>) {
    if (nextProps.model && (!this.props.model || nextProps.model.code != this.props.model.code)) {
      let parentId;
      if (nextProps.model.id) {
        parentId = nextProps.model.id + "|" + nextProps.model.code;
      }
      if (parentId) {
        this.setState({ FormItems: getFormItemOption(this.fields, nextProps.form, { parentId }) }, () => {
          this.props.form.validateFields(["parentId"], (errors, values) => {});
        });
      } else {
        this.setState({ FormItems: getFormItemOption(this.fields, nextProps.form, { parentId }) });
      }
    }
  }
  /**确认提交 */
  public submitData = e => {
    e.preventDefault();
    const Self = this;
    const { showItems } = this.state;
    const { action, submit, close } = this.props;

    this.props.form.validateFieldsAndScroll((errors, values) => {
      if (!errors) {
        let ajaxInfo: IActionAjax = {
          successMsg: "新增成功",
          ajaxMethod: "POST",
          ajaxUrl: "/category/add"
        };
        let params: any = { name: values.name, code: values.code };
        if (values.parentId && values.parentId != "") {
          let [parentId, code] = values.parentId.split("|");
          params.parentId = parentId;
          params.code = code + values.code;
        }

        const callback = ({ isSuccess }) => {
          if (isSuccess) {
            action && close(action.modalType);
          }
        };
        submit({ ajaxInfo, params, loadingKey: "popupSubmit", callback });
      }
    });
  };
  render() {
    const { FormItems, showItems } = this.state;
    let items: any[] = showItems ? FormItems : [FormItems[0]];
    const { action, visible, submintloading, close, form } = this.props;

    return (
      <div>
        {action && (
          <Modal
            wrapClassName='public-popup'
            title={action.modalTitle}
            visible={visible}
            maskClosable={false}
            confirmLoading={submintloading}
            onOk={e => {
              this.submitData(e);
            }}
            onCancel={() => {
              close(action.modalType);
            }}
          >
            <Form {...layout}>
              <div className='form-item'>{getFormItemArray(items, form)}</div>
            </Form>
          </Modal>
        )}
      </div>
    );
  }
}

export default Form.create<IFormPopup<any>>()(SelfModel);
