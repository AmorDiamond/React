import React from "react";
import { Icon } from "antd";
import { IActionButton } from "../../framework/ui/UdActionButton/types";
import {
  TableColumn,
  ITableColumn,
  ColumnTypes,
  ITableColumnTranslate,
  ITableColumnTranslateNull,
  ITableColumnBtnList,
  ITableColumnBtn,
  ITableColumnbase
} from "../../framework/component/UdTable/types";
import { IUdFormFileld } from "../../framework/ui/UdForm/types";
import { UdFormControls } from "../../framework/ui/UdForm/types/controls";

export interface ILog {
  title: string;
  pro: number;
  status: number;
}
const FormItems: IUdFormFileld[] = [
  {
    key: "title",
    name: "商品分类",
    control: {
      type: UdFormControls.Input
    }
  },
  {
    key: "title1",
    name: "名称1",
    control: {
      type: UdFormControls.Input
    }
  }
];

/*
 * 列表按钮配置
 * 接受对象数组，对象具体属性参照 IActionButton类型
 */

const pageBtnlist: IActionButton<ILog>[] = [
  {
    title: <Icon type='delete' />,
    action: {
      type: "Confirm",
      content: data => {
        return "可以返回这条数据所有类容";
      },
      ajaxParams: "id",
      ajaxSubmit: {
        ajaxUrl: "12"
      }
    }
  },
  {
    title: "评价",
    action: {
      type: "Form",
      modalTitle: "评价",
      form: FormItems,
      submit: {
        ajaxUrl: "ee"
      }
    }
  }
];

const column: TableColumn<ILog>[] = [
  {
    title: "事件标题",
    className: "min-width-100",
    dataIndex: "title",
    key: "title"
  },
  {
    title: "进度",
    className: "min-width-100",
    dataIndex: "pro",
    key: "pro",
    columnType: ColumnTypes.Translate,
    option: { 1: "进度1", 2: "进度2" }
  },
  {
    title: "事件状态",
    className: "min-width-100",
    dataIndex: "status",
    columnType: ColumnTypes.Btn,
    btnInfo: {
      title: <Icon type='delete' />,
      action: {
        type: "Confirm",
        content: "测试一下",
        ajaxParams: "id",
        ajaxSubmit: {
          ajaxUrl: "12"
        }
      }
    },
    key: "status"
  },
  {
    title: "操作",
    className: "min-width-100",
    dataIndex: "op",
    key: "op",
    columnType: ColumnTypes.BtnList,
    normalBtn: pageBtnlist
  }
];

export { column, pageBtnlist, FormItems };
