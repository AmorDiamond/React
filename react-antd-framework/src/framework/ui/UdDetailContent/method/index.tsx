import React from "react";
import { WrappedFormUtils } from "antd/lib/form/Form";
import { getItemControlAndValidate } from "../../UdForm/method/FormItem";
import { IUdDetailItemOption, IUdDetailFormItem } from "../type";
import { Form, Col } from "antd";
import { isArray } from "util";
import { classNames } from "@/utils";

// const optionDefaultDo = {
//   contorl: (formItem, item, form, values, key) => {
//     let filed: any = item;
//     let initValue = values[key];
//     if (isArray(item.key)) {
//       initValue = item.key.map(k => (values[k] ? values[k] : ""));
//     }
//     formItem.controlInfo = getItemControlAndValidate(filed, form, initValue);
//     return formItem;
//   }
// };

/** 获取 FormItem配置 */
export const getDetailFormItemOption = (items: IUdDetailItemOption[], form?: WrappedFormUtils, spanCol: number = 8, values?: any) => {
  const Settings: IUdDetailFormItem[] = [];

  items.forEach(item => {
    let key: string = isArray(item.key) ? item.key.join("|") : item.key;

    let { name, hiddenTitle } = item;
    let formItem: IUdDetailFormItem = { spanCol: item.spanCol || spanCol, name, hiddenTitle, key };
    let className = ["detail-item", item.className];
    if (item.type == "contorl" && form) {
      let filed: any = item;
      let initValue = values[key];
      if (isArray(item.key)) {
        initValue = item.key.map(k => (values[k] ? values[k] : ""));
      }
      formItem.controlInfo = getItemControlAndValidate(filed, form, initValue);
    } else if (item.type == "render") {
      formItem.content = item.render(values, item.key);
    } else if (item.type == "base") {
      if (!item.notEllipsis) {
        className.push("ellipsis-item ");
      }
      let value = values[key] ? values[key] : "--";
      formItem.content = <span title={value}>{values[key] ? values[key] : "--"}</span>;
    }

    formItem.className = classNames(className);

    Settings.push(formItem);
  });
  return Settings;
};

/** 获取 FormItem配置 */
export const getDetailFormItem = (items: IUdDetailFormItem[], form?: WrappedFormUtils) => {
  const Settings: any[] = [];

  items.forEach(item => {
    let content = item.content;
    if (item.controlInfo && form) {
      content = form.getFieldDecorator(item.key, item.controlInfo.options)(item.controlInfo.Control);
    }
    let Item = (
      <Col key={item.key} span={item.spanCol}>
        <Form.Item className={item.className} label={item.name}>
          {content}
        </Form.Item>
      </Col>
    );

    Settings.push(Item);
  });
  return Settings;
};
