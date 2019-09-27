import React, {Component} from 'react';
import {IUdFormFileld} from "@ui/UdForm/types";
import {UdFormControls} from "@ui/UdForm/types/controls";
import {Form, Modal} from "antd";
import {IActionAjax, IActionModal} from "@ui/UdActionButton/types";
import {WrappedFormUtils} from 'antd/lib/form/Form';
import {getFormItemArray, getFormItemOption} from "@ui/UdForm/method/FormItem";
import store  from "@/stores/tablePageStore";
import {observer} from 'mobx-react';
import {VaildatorTypes} from "@ui/UdForm/types/vaildator";

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
@observer
class AddModal<T> extends Component<IFormPopup<T>, { FormItems: any[] }> {
  public fields: IUdFormFileld[] = [
    {
      key: "name",
      name: "姓名",
      control: {
        type: UdFormControls.Input,
        vaildator: [VaildatorTypes.required],
      }
    },
    {
      key: "job",
      name: "岗位",
      control: {
        type: UdFormControls.Input
      }
    },
  ];
  constructor(props) {
    super(props);
    this.state = { FormItems: getFormItemOption(this.fields, props.form) };
  }
  public submitData = (e)=>{
    const { action, submit, close } = this.props;
    this.props.form.validateFields((err,values)=>{
      console.log(values);
      if (err) {
        return;
      }
      let ajaxInfo: IActionAjax = {
        successMsg: "新增成功",
        ajaxMethod: "POST",
        ajaxUrl: "/category/add"
      };
      let params = values;
      const callback = ({ isSuccess }) => {
        if (isSuccess) {
          action && close(action.modalType);
        }
      };
      submit({ ajaxInfo, params, loadingKey: "popupSubmit", callback });
    });
  };
  render() {
    const { action, visible, submintloading, close, form } = this.props;
    const items = this.state.FormItems;
    const {loading:{popupSubmit}} = store;
    return (
      <div>
        {action && (
          <Modal
            wrapClassName='public-popup'
            title={action.modalTitle}
            visible={visible}
            maskClosable={false}
            // confirmLoading={submintloading}
            confirmLoading={popupSubmit}
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

export default Form.create<IFormPopup<any>>()(AddModal);