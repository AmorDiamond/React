import { ColumnProps } from "antd/lib/table";
import ContorlInput from "@/framework/ui/UdForm/controls/ContorlInput";
import { ReactNode } from "react";

export enum TableVTypeEnum {
  required = "required",
  integer = "integer",
  max = "max",
  min = "min",
  numberMax = "numberMax",
  numberMin = "numberMin",
  selfValid = "selfValid"
}

export interface IValidateCellParams {
  type: TableVTypeEnum;
  method?: any;
  params?: any;
  errorMsg?: string;
}
export interface IValidateRowParams extends IValidateCellParams {
  //要验证的当前数据那些键发生验证
  DataKey: string | string[];
}
export interface IValidateColumnParams extends IValidateCellParams {
  //那些列发生验证
  ColumnKey?: string | string[];
}
export type valdateCellRlue=(TableVTypeEnum | IValidateCellParams);

export interface IEditColumn<T = any> extends ColumnProps<T> {
  dataIndex: string;
  //单元格验证信息
  valdateCellRlues?: valdateCellRlue[];
  //单元格变化引起发生验证的行keys
  relationRowKeys?: string | string[];
  //单元格变化引起发生验证的列keys
  relationColumnKeys?: string | string[];
  contorl?: ReactNode;
}
