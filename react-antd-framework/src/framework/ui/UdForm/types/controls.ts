import { VaildatorTypes, IVaildator, ISelfVaildator } from "./vaildator";
import { ReactNode } from "react";
import { WrappedFormUtils } from "antd/lib/form/Form";


 /**基础组件类型 */
export enum UdFormControls {
   /**自控表单 */
  SelfControl = "SelfControl",
   /**input表单 */
  Input = "UdInput",
   /**textarea(多行文本框)表单 */
  TextArea = "TextArea",
     /**下拉表单 */
  Select = "Select",
     /**ajax表单 */
  AjaxSelect = "AjaxSelect",
     /**日期表单 */
  DatePicker = "DatePicker",
  DateRange = "DateRange",
  Radio = "Radio"
  // ContorlTreeSelect='ContorlTreeSelect'
}

/* 下拉框option值 */
export interface IOption {
  title: string;
  value: string | number | boolean;
}

/* 日期扩展 */
interface IDateSupple {
  format?: string;
  allowClear?: boolean;
  disabled?: boolean;
}

/**表单标签基本属性 */
export interface IUdControl {
   /**自定义类名 */
  className?: string;
   /**验证方法 */
  vaildator?: (VaildatorTypes | IVaildator)[];
   /**自定义验证方法 */
  selfVaildator?: (ISelfVaildator | ((form: WrappedFormUtils) => ISelfVaildator))[];
   /**是否首先验证 */
  validateFirst?: boolean;
  validateTrigger?: string | string[];
  /**表单属性控制 */
  controlAttr?: {
      /**表单默认输入提示 */
    placeholder: string;
  };
   /**表单属性 */
  supplementAttr?: any;
}

/**基础表单*/
export interface IUdControlBase extends IUdControl {
   /**表单类型 */
  type: UdFormControls.Input | UdFormControls.TextArea;
}

/**基础表单*/
export interface IUdControlSelf extends IUdControl {
  type: UdFormControls.SelfControl;
  selfControl: ReactNode;
}

/**普通下拉框 */
export interface IUdControlSelect extends IUdControl {
   /**表单类型 */
  type: UdFormControls.Select;
   /**下拉框配置 */
  supplementAttr: {
     /**下拉框多选和单选 */
    mode?: "multiple" | "tags";
    /**下拉框配置属性 */
    options: IOption[];
    allowClear?: boolean;
     /**是否禁用 */
    disabled?: boolean;
  };
}

/**普通单选框 */
export interface IUdControlRadio extends IUdControl {
   /**表单类型 */
  type: UdFormControls.Radio;
  supplementAttr: {
    options: IOption[];
    disabled?: boolean;
    defaultValue?: any;
  };
}

/**ajax下拉框 */
export interface IUdControlAjaxSelect extends IUdControl {
   /**表单类型 */
  type: UdFormControls.AjaxSelect;
  supplementAttr?: {
    getOptionUrl: string;
    allowClear?: boolean;
    disabled?: boolean;
    showSearch?: boolean;
    keyTranslate?: { title: string; value: string };
    mode?: "multiple" | "tags";
  };
}

/**时间选择 */
export interface IUdControlDatePicker extends IUdControl {
   /**表单类型 */
  type: UdFormControls.DatePicker;
  supplementAttr?: IDateSupple;
}

/**日期选择 */
export interface IUdControlDateRange extends IUdControl {
  type: UdFormControls.DateRange;
  supplementAttr?: IDateSupple;
}
 /**自定类型控制 */
export type UdControl = IUdControlBase | IUdControlSelect | IUdControlAjaxSelect | IUdControlSelf | IUdControlDatePicker | IUdControlDateRange | IUdControlRadio;
