import { ReactNode } from "react";

import { GetFieldDecoratorOptions } from "antd/lib/form/Form";
import { UdControl } from "../UdForm/types/controls";

interface IUDDetailItem {
  type: "base" | "render" | "contorl";
  spanCol?: number;
  /**数据唯一标识 */
  key: string | string[];
  /**表单项lable标签 */
  name: string;
  /**是否隐藏lable属性 */
  hiddenTitle?: boolean;
  /**自定义样式类名 */
  className?: string;
}
interface IUdDetailBaseItem extends IUDDetailItem {
  type: "base";
  notEllipsis?: boolean;
}
interface IUdDetailRenderItem extends IUDDetailItem {
  type: "render";
  render: (data, key) => ReactNode;
}
interface IUdDetailControlItem extends IUDDetailItem {
  type: "contorl";
  control: UdControl;
}
export type IUdDetailItemOption = IUdDetailBaseItem | IUdDetailRenderItem | IUdDetailControlItem;

export interface IUdDetailFormItem {
  spanCol: number;
  /**数据唯一标识 */
  key: string;
  /**表单项lable标签 */
  name: string;
  /**是否隐藏lable属性 */
  hiddenTitle?: boolean;
  /**自定义样式类名 */
  className?: string;
  /**定义不同类型表单属性及验证事件等 */
  content?: ReactNode;
  controlInfo?: { options: GetFieldDecoratorOptions; Control: ReactNode };
}
