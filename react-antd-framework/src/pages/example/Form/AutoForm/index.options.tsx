import React from "react";
import { IUdFormFileld } from "@/framework/ui/UdForm/types";
import { UdFormControls } from "@/framework/ui/UdForm/types/controls";
import { DatePicker } from "antd";
import { VaildatorTypes } from "@/framework/ui/UdForm/types/vaildator";
import ASelect from "./selfSelect";

const FilterFields: IUdFormFileld[] = [
  {
    key: "Input",
    name: "名称",
    control: {
      type: UdFormControls.Input
    }
  },
  {
    key: "InputT",
    name: "第二名称名称",
    control: {
      type: UdFormControls.Input,
      vaildator: [
        VaildatorTypes.required,
        { type: VaildatorTypes.required, msg: "错误数据" }
      ],
      selfVaildator: [
        form => {
          return {
            validator: (rule: any, value: any, callback: any) => {
              if (!value) {
                callback();
              }

              if (value !== form.getFieldValue("Input")) {
                callback("必须和名称一致");
              }
              callback();
            }
          };
        }
      ],
      supplementAttr: {
        maxLength: 5,
        placeholder: "必须与名称一致"
      }
    }
  },
  {
    key: "select",
    name: "下拉框",
    control: {
      type: UdFormControls.Select,
      supplementAttr: { options: [{ title: "显示名称", value: "value" }] }
    }
  },
  {
    key: ["start", "end"],
    name: "名称",
    control: {
      type: UdFormControls.DateRange,
      supplementAttr: {
        format: "YYYY-MM-DD"
      }
    }
  },
  {
    key: "Radio",
    name: "名称",
    control: {
      type: UdFormControls.Radio,
      supplementAttr: {
        options: [
          { title: "显示名称", value: "value" },
          { title: "显示名称", value: "value1" }
        ]
      }
    }
  },
  {
    key: "12",
    name: "名称",
    control: {
      type: UdFormControls.SelfControl,
      selfControl: <ASelect tt={{ key: "tt", label: "测试值" }} />
    }
  }
  //   {
  //     key: "AjaxSelect",
  //     name: "名称",
  //     control: {
  //       type: UdFormControls.AjaxSelect,
  //       supplementAttr: {
  //         getOptionUrl: "/xx",
  //         keyTranslate: { title: "name", value: "id" },
  //         mode: "multiple"
  //       }
  //     }
  //   }
];

export { FilterFields };
