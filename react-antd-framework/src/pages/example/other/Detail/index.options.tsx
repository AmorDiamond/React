import { IUdFormFileld } from "@/framework/ui/UdForm/types";
import { UdFormControls } from "@/framework/ui/UdForm/types/controls";
import { DatePicker } from "antd";
import { VaildatorTypes } from "@/framework/ui/UdForm/types/vaildator";
import { IUdDetailItemOption } from "@/framework/ui/UdDetailContent/type";

const FilterFields: IUdDetailItemOption[] = [
  {
    key: "labelF",
    type: "base",
    name: "字段1",
    spanCol: 8
  },
  {
    key: "labelS",
    type: "base",
    name: "字段2",
    spanCol: 8
  },
  {
    key: "labelT",
    type: "base",
    name: "字段3",
    spanCol: 8
  },
  {
    key: "input",
    type: "base",
    name: "输入框",
    spanCol: 18
  },
  {
    key: "InputT",
    name: "输入框",
    type: "contorl",
    control: {
      type: UdFormControls.Input,
      vaildator: [{ type: VaildatorTypes.required, msg: "错误数据" }]
    }
  },
  {
    key: "InputS",
    name: "输入框",
    type: "contorl",
    control: {
      type: UdFormControls.Input,
      vaildator: [{ type: VaildatorTypes.required, msg: "错误数据" }]
    }
  }
];

export { FilterFields };
