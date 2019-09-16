import { ColumnProps } from "antd/lib/table";
import { IActionButton } from "@ui/UdActionButton/types";

/******table基础数据*******/

/****table显示数据相关***/
export interface ITableData<T> {
  current: number;
  pageSize: number;
  totalCount: number;
  content: T[];
}
/******end *******/

/******自定义Column内容 *******/
interface ITranslateOption {
  [propsName: string]: string;
}

export enum ColumnTypes {
  Base = "Base",
  Translate = "Translate",
  TranslateNull = "TranslateNull",
  BtnList = "BtnList",
  Btn = "Btn"
}
export interface ITableColumn<T> extends ColumnProps<T> {
  columnType?: ColumnTypes;
  classNames?: string | string[];
}
export interface ITableColumnbase<T> extends ITableColumn<T> {
  columnType?: ColumnTypes.Base;
}

export interface ITableColumnTranslate<T> extends ITableColumn<T> {
  /**表格标题项 */
  columnType: ColumnTypes.Translate;
  /**表格translate类型option数据项 */
  option: ITranslateOption;
}
export interface ITableColumnTranslateNull<T> extends ITableColumn<T> {
  columnType: ColumnTypes.TranslateNull;
}

export interface ITableColumnBtnList<T> extends ITableColumn<T> {
  columnType: ColumnTypes.BtnList;
  normalBtn: IActionButton<T>[];
  dropDownBtns?: IActionButton<T>[];
}
export interface ITableColumnBtn<T> extends ITableColumn<T> {
  columnType: ColumnTypes.Btn;
  btnInfo: IActionButton<T>;
}


/**table表格Column数据 */

export type TableColumn<T=any> = ITableColumnbase<T> | ITableColumnTranslate<T> | ITableColumnTranslateNull<T> | ITableColumnBtnList<T> | ITableColumnBtn<T>;

/******end *******/
