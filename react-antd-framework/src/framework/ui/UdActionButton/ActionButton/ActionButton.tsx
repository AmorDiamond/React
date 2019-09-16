import React from "react";
import { Button, Modal, message } from "antd";
import { IActionButton } from "../types";
import { getContentByMethod } from "../method";

/*按钮属性 */
export interface IButtonAttr<T> {
  btnInfo: IActionButton<T>;
  className: string;
  data: T;
  submit: any;
  loading?: boolean;
  loadingKey?: string;
}

function FormButton<T>({ btnInfo, data, className, submit, loading, loadingKey }: IButtonAttr<T>) {
  let submitData = data;
  if (btnInfo.action && btnInfo.action.type == "Form" && btnInfo.action.changeModal) {
    submitData = btnInfo.action.changeModal(data);
  }
  const click = () => {
    let { actionBefore = (data: T) => ({ canContinue: true, msg: "" }) } = btnInfo;
    let actionBeforeRes = actionBefore(data);
    if (actionBeforeRes.canContinue) {
      submit({ data: submitData, action: btnInfo.action, loadingKey });
    } else {
      message.error(actionBeforeRes.msg);
    }
  };

  return (
    <Button type={btnInfo.btnType} icon={btnInfo.icon} className={className} loading={loading} onClick={click}>
      {getContentByMethod(data, btnInfo.title)}
    </Button>
  );
}

export default FormButton;
