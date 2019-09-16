import { IUdFormFileld } from "@/framework/ui/UdForm/types";
import { UdFormControls } from "@/framework/ui/UdForm/types/controls";
import { DatePicker } from "antd";

const FilterFields: IUdFormFileld[] = [
  {
    key: "Input",
    name: "名称",
    control: {
      type: UdFormControls.Input,
      supplementAttr: {
        maxLength: 5
      }
    }
  },
  {
    key: "Input1",
    name: "名称2",
    control: {
      type: UdFormControls.Input
    }
  },
  {
    key: "Input2",
    name: "名称1",
    control: {
      type: UdFormControls.Input
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

export { FilterFields };
