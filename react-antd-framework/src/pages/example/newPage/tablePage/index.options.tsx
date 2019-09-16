import React from 'react'
import { IUdFormFileld } from "@/framework/ui/UdForm/types";
import { UdFormControls } from "@/framework/ui/UdForm/types/controls";
import { DatePicker, Icon } from "antd";
import { VaildatorTypes } from "@/framework/ui/UdForm/types/vaildator";
import { ColumnTypes, TableColumn } from "@/framework/component/UdTable/types";

export interface IGroupGoods {
  id: number;
  index: number;
  code: string;
  name: string;
  createBy: string;
  updateTimestamp: string;
}

const Columns: TableColumn<IGroupGoods>[] = [
  {
    title: "序号",
    className: "min-width-100",
    dataIndex: "index",
    key: "index"
    // sorter: true
  },
  {
    title: "组合商品编码",
    className: "min-width-100",
    dataIndex: "code",
    key: "code",
    sorter: true
  },
  {
    title: "组合商品名称",
    className: "min-width-100",
    dataIndex: "backendName",
    key: "backendName",
    sorter: true
  },
  {
    title: "所属分类",
    className: "min-width-100",
    dataIndex: "category",
    key: "category",
    columnType: ColumnTypes.Translate,
    option: { 0: "分类0", 1: "分类1", 2: "分类2", 3: "分类3" }
  },
  {
    title: "创建人",
    className: "min-width-100",
    dataIndex: "createBy",
    key: "createBy",
    sorter: true,
    columnType: ColumnTypes.TranslateNull
  },
  {
    title: "最近更新时间",
    className: "min-width-100",
    dataIndex: "updateTimestamp",
    key: "updateTimestamp",
    sorter: true
  },
  {
    title: '状态',
    className: "min-width-100",
    dataIndex: "status",
    key: "status",
    columnType: ColumnTypes.Btn,
    btnInfo: {
      title: <Icon type='edit' />,
      authCode: "upc_edit_category",
      action: {
        type: "Route",
        url: "/BaseDataManage/GoodsClassifyManage/ClassifyEdits",
        addUrlParams: (model: IGroupGoods) => {
          return `/BaseDataManage/GoodsClassifyManage/ClassifyEdits/${model.id}`;
        }
      }
    },
    sorter: true
  }
  // {
  //   title: "操作",
  //   className: "min-width-100",
  //   dataIndex: "op",
  //   key: "op",
  //   columnType: ColumnTypes.BtnList,
  //   normalBtn: tableBtnlist
  // }
];

export { Columns };
