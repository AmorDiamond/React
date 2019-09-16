import React, { ReactNode } from "react";
import { Form } from "antd";
import { UdFormControls } from "../types/controls";
import { WrappedFormUtils, GetFieldDecoratorOptions } from "antd/lib/form/Form";

import { IUdFormFileld, IUdFormItemSetting } from "../types";

import { getValidate } from "../vaildators/vaildator";
import UdControls from "../controls";
import { isArray } from "util";
import { getFormValueByValues } from ".";

const FormItem = Form.Item;

/** 获取验证item的jsx标签 */
export function getControlByItem(item: IUdFormFileld) {
  const Control: any = UdControls[item.control.type];
  const { controlAttr = {}, supplementAttr = {} } = item.control;
  let ControlAttr: any = Object.assign(controlAttr, supplementAttr);
  if (!ControlAttr.placeholder) {
    ControlAttr.placeholder = "请输入" + item.name;
  }
  return <Control {...ControlAttr} />;
}

/** 动态获取 FormItem */
export const getFormItem = (item: IUdFormItemSetting, getFieldDecorator: any) => {
  const { controlInfo, ...attr } = item;
  /**生成表单项 */
  // console.log('options', controlInfo.options);
  let Element: ReactNode = <FormItem {...attr}>{getFieldDecorator(item.key, controlInfo.options)(controlInfo.Control)}</FormItem>;
  // console.log('Element', Element);
  return Element;
};

/** 动态配置 FormItem数组 */
export const getFormItemArray = (items: IUdFormItemSetting[] = [], form: WrappedFormUtils): any[] => {
  const array: any = [];
  const { getFieldDecorator } = form;
  items.forEach(item => {
    array.push(getFormItem(item, getFieldDecorator));
  });
  return array;
};

/** 获取 FormItem的标签和验证项 */
export const getItemControlAndValidate = (item: IUdFormFileld, form: any, initialValue?: any) => {
  const options: GetFieldDecoratorOptions = { 
    validateFirst: item.control.validateFirst, 
    validateTrigger: item.control.validateTrigger,
    rules: getValidate(item, form) 
  };
  if (initialValue) {
    options.initialValue = initialValue;
  }
  let Control: ReactNode;
  if (item.control.type === UdFormControls.SelfControl) {
    Control = item.control.selfControl;
  } else {
    Control = getControlByItem(item);
  }
  return { options, Control };
};

/** 获取 FormItem配置 */
export const getFormItemOption = (items: IUdFormFileld[], form: WrappedFormUtils, values?: any):IUdFormItemSetting[] => {
  const Settings: IUdFormItemSetting[] = [];
  if (values) {
    values = getFormValueByValues(items, values);
  } else {
    values = {};
  }
  items.forEach(item => {
    let key: string = isArray(item.key) ? item.key.join("|") : item.key;
    const FormItemAttr: IUdFormItemSetting = {
      key,
      controlInfo: getItemControlAndValidate(item, form, values[key]||item.initialValue)
    };
    if (!item.hiddenTitle) {
      FormItemAttr.label = item.name;
    }
    let className = [item.className, UdFormControls.Input.toLowerCase() + "-item"].filter(Boolean);
    FormItemAttr.className = className.join(" ");
    Settings.push(FormItemAttr);
  });
  return Settings;
};
