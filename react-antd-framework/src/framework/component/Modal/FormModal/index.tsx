import React, { Component } from "react";
import { Table, Modal } from "antd";
import _ from "lodash";

import VForm from "../../../ui/UdForm/UdNormalForm";
import { compareObject } from "../../../../utils";
import { IUdFormFileld } from "@/framework/ui/UdForm/types";
import { IActionForm, IActionAjax } from "@/framework/ui/UdActionButton/types";
import { pageGet, pagePost } from "@/api/ajaxExtend";
import { IPageAjaxParams } from "@/stores/tablePageStore";
// import './index.less'

export interface IFormPopup {
  action?: IActionForm<any>;
  visible: boolean;
  submintloading: boolean;

  model?: any;
  submit: ({ ajaxInfo, params, loadingKey, callback }: IPageAjaxParams) => void;
  close: (type: string) => void;
}

class FormModal extends Component<IFormPopup, { model: object }> {
  private form: any;
  constructor(props) {
    super(props);
    this.form = React.createRef();
    this.state = { model: {} };
  }

  componentWillReceiveProps(nextProps: IFormPopup) {
    let oldAction = this.props.action;
    let newAction = nextProps.action;
    if (
      newAction &&
      newAction.init &&
      (!oldAction || !oldAction.init || newAction.init != oldAction.init)
    ) {
      this.ajaxGetInitData(newAction, nextProps.model);
    }
    // 原型数据发生变化
    else if (
      newAction &&
      !newAction.init &&
      !compareObject(nextProps.model, this.props.model)
    ) {
      const model = { ...nextProps.model };
      this.setState({ model });
    } else if (!newAction) {
      this.setState({ model: {} });
    }
  }
  /**初始化请求数据 */
  public ajaxGetInitData = (action: IActionForm<any>, model: any) => {
    if (action.init) {
      let url: string = action.init.ajaxUrl;
      let params: any = {};
      if (action.init.ajaxBefore) {
        let ajax = action.init.ajaxBefore(model);
        ajax.url ? (url = ajax.url) : "";
        ajax.data ? (params = ajax.data) : "";
      }

      const callback = ({ isSuccess, data }) => {
        if (isSuccess) {
          this.setState({ model: data });
        }
      };

      if ((action.init.ajaxMethod = "GET")) {
        pageGet({ url, params, callback });
      } else {
        pagePost({ url, params, callback });
      }
    }
  };

  /**更新model */
  public updateModel = values => {
    const { model } = this.state;
    Object.keys(values).forEach(key => {
      model[key] = values[key];
    });
    return model;
  };

  /**确认提交 */
  public submitData = e => {
    e.preventDefault();
    const Self = this;
    const { model } = this.state;
    const { action, submit, close } = this.props;

    this.form.current.validateFieldsAndScroll((errors, values) => {
      if (!errors) {
        if (action) {
          let beforeInfo = action.submit.ajaxBefore
            ? action.submit.ajaxBefore(model, values)
            : {};
          let params = beforeInfo.data ? beforeInfo.data : { ...values };
          /** action.submit.ajaxUrl不存在时， action.submit.ajaxBefore必然返回url*/
          let ajaxUrl: string =
            beforeInfo.url != null
              ? beforeInfo.url
              : action.submit.ajaxUrl || "";
          let ajaxInfo: IActionAjax = {
            ajaxUrl,
            ajaxId: action.submit.ajaxId,
            successMsg: action.submit.successMsg,
            ajaxMethod: action.submit.ajaxMethod
          };
          const callback = ({ isSuccess, data }) => {
            isSuccess && close("Form");
          };
          submit({ ajaxInfo, params, loadingKey: "", callback });
        }
      }
    });
  };

  render() {
    const { action, visible, submintloading, submit, close } = this.props;
    const { model } = this.state;

    return (
      <div>
        {action && (
          <Modal
            wrapClassName='public-popup'
            title={action.modalTitle}
            visible={visible}
            maskClosable={false}
            destroyOnClose={true}
            confirmLoading={submintloading}
            onOk={e => {
              this.submitData(e);
            }}
            onCancel={() => {
              close("Form");
            }}
          >
            <VForm ref={this.form} fields={action.form} values={model} />
          </Modal>
        )}
      </div>
    );
  }
}

export default FormModal;
