import { isArray } from "util";
import { FormProps } from "antd/lib/form";
import { IUdFormLayout } from "../types";

/**获取数组key对应的表单key和value值 */
export function getKeyValueByKeys(keys: string[], values: any) {
  const value: any[] = [];
  const key = keys.join("|");
  keys.forEach(key => {
    const keyVal = values[key] || "";
    value.push(keyVal);
  });
  return { key, value };
}

/**获取数组key对应的表单key和value值 */
export function getFormValueByValues(fields: any, values: any) {
  const FieldValue: any = {};
  fields.forEach(ele => {
    if (typeof ele.key == "string" && values[ele.key] != null) {
      FieldValue[ele.key] = values[ele.key];
    } else if(isArray(ele.key)) {
      let { key, value } = getKeyValueByKeys(ele.key, values);
      FieldValue[key] = value;
    }
  });
  return FieldValue;
}
/**获取数组key对应的表单key和value值 */
export function getSubmitDataByFormValue(values: any) {
  let SubmitData = {};
  Object.keys(values).forEach(key => {
    if (key.indexOf("|") > -1) {
      let keys = key.split("|");
      if (isArray(values[key])) {
        values[key].forEach((value, index) => {
          if (value != "" && value != undefined) {
            SubmitData[keys[index]] = value;
          }
        });
      }
    } else {
      if (isArray(values[key]) && values[key][0] != "" && values[key][0] != undefined) {
        SubmitData[key] = values[key];
      }
      if (values[key] != "" && values[key] != null) {
        SubmitData[key] = values[key];
      }
    }
  });
  return SubmitData;
}
/**获取布局类信息 */
export function getFormLayout(originlayout?: IUdFormLayout) {
  let newlayout: FormProps = {
    labelCol: { sm: { span: 6 } },
    wrapperCol: { sm: { span: 15 } },
  
  };
  if (originlayout) {
    let { mode, ...layout }: any = originlayout;

    if (mode) {
      const layoutObj: any = { v: "vertical", i: "inline", h: "horizontal" };
      layout.layout = layoutObj[mode];
    }
    if (typeof layout.labelCol == "number") {
      layout.labelCol = { sm: { span: layout.labelCol } };
    }
    if (typeof layout.wrapperCol == "number") {
      layout.wrapperCol = { sm: { span: layout.wrapperCol } };
    }
    newlayout = layout;
  }

  return newlayout;
}
