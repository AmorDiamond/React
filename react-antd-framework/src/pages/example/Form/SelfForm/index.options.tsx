import { IUdFormFileld } from "@/framework/ui/UdForm/types";
import { UdFormControls } from "@/framework/ui/UdForm/types/controls";
import { DatePicker } from "antd";
import { VaildatorTypes } from "@/framework/ui/UdForm/types/vaildator";

/**名称字段在didmount中重写 */
const FormFields: IUdFormFileld[] = [
  {
    key: "inputs",
    name: "名称",
    control: {
      type: UdFormControls.Input
    }
  },
  {
    key: "name",
    name: "第二名称",
    control: {
      type: UdFormControls.Input,
      vaildator: [VaildatorTypes.required],
      selfVaildator: [
        form => {
          return {
            validator: (rule: any, value: any, callback: any) => {
              if (!value) {
                callback();
              }

              if (value !== form.getFieldValue("input")) {
                callback("必须和名称一致");
              }
              callback();
            }
          };
        }
      ],
      supplementAttr: {
        maxLength: 5
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
        options: [{ title: "显示名称", value: "value" }, { title: "显示名称", value: "value1" }]
      }
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

export { FormFields };
