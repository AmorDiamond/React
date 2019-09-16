import { WrappedFormUtils, GetFieldDecoratorOptions } from "antd/lib/form/Form";
import { ColProps } from "antd/lib/col";

import { UdControl } from "./controls";

// import { IOption } from "../../../types/components";

/**验证表单全局属性 */
export interface IUdFormProps {
  fields: IUdFormFileld[];
  values?: any;
  layout?: IUdFormLayout;
  form: WrappedFormUtils;
}

/**布局属性 */
export interface IUdFormLayout {
  mode?: "v" | "h" | "i";
  labelCol?: number | ColProps;
  wrapperCol?: number | ColProps;
  labelAlign?: "left" | "right";
  colon?: boolean;
}

/**验证表单item 包装项属性*/
export interface IUdFormItemSetting {
  key: string;
  label?: string;
  className?: string;
  controlInfo: {
    options?: GetFieldDecoratorOptions;
    Control: any;
  };
}

/**验证表单配置 */
export interface IUdFormFileld {
  /**数据唯一标识 */
  key: string | string[];
   /**表单项lable标签 */
  name: string;
   /**是否隐藏lable属性 */
  hiddenTitle?: boolean;
   /**自定义样式类名 */
  className?: string;
   /**定义不同类型表单属性及验证事件等 */
  control: UdControl;
  /**默认初始值*/
  initialValue?: any;
}
