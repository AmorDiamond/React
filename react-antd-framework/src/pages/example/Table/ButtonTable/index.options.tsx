import React from "react";
import { IUdFormFileld } from "@/framework/ui/UdForm/types";
import { UdFormControls } from "@/framework/ui/UdForm/types/controls";
import { DatePicker, Form } from "antd";
import { VaildatorTypes } from "@/framework/ui/UdForm/types/vaildator";
import { ColumnTypes, TableColumn } from "@/framework/component/UdTable/types";
import UdButton from "@/framework/ui/UdButton/SubmitButton";
import { ConfirmIcons, IActionButton } from "@/framework/ui/UdActionButton/types";

export interface IGroupGoods {
  id: number;
  index: number;
  code: string;
  name: string;
  createBy: string;
  updateTimestamp: string;
}

const editFields: IUdFormFileld[] = [
  {
    key: "code",
    name: "编码",
    control: {
      type: UdFormControls.Input
    }
  },
  {
    key: "name",
    name: "名称",
    control: {
      type: UdFormControls.Input
    }
  },
  {
    key: "createBy",
    name: "创建人",
    control: {
      type: UdFormControls.Input,
      supplementAttr: {
        disabled: true
      }
    }
  },
  {
    key: "updateTimestamp",
    name: "创建时间",
    control: {
      type: UdFormControls.Input,
      supplementAttr: {
        disabled: true
      }
    }
  }
];

const tableBtnlist: IActionButton<IGroupGoods>[] = [
  {
    title: "自定义弹出框",
    authCode: "upc_add_category",
    action: {
      type: "Modal",
      modalTitle: "自定义弹出框",
      modalType: "UpdateClass"
    }
  },

  
  {
    title: "编辑",
    authCode: "upc_edit_category",
    action: {
      type: "Form",
      modalTitle: "编辑标题",

      form: editFields,
      submit: {}
    }
  },
  {
    title: "查看",
    authCode: "upc_edit_category",
    action: {
      type: "Route",
      url: "/BaseDataManage/GoodsClassifyManage/ClassifyEdits",
      addUrlParams: (model: IGroupGoods) => {
        return `/BaseDataManage/GoodsClassifyManage/ClassifyEdits/${model.id}`;
      }
    }
  },
  {
    title: "删除",
    authCode: "upc_delete_category",
    action: {
      type: "Confirm",
      icon: ConfirmIcons.Info,
      content: (
        <div className='popup-box'>
          <span key='1'>删除后不可恢复,</span>确定删除吗?
        </div>
      ),
      ajaxParams: "id",
      ajaxSubmit: {
        ajaxUrl: "xx/xxx",
        successMsg: "删除成功!"
      }
    }
  }
];

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
    title: "操作",
    className: "min-width-100",
    dataIndex: "op",
    key: "op",
    columnType: ColumnTypes.BtnList,
    normalBtn: tableBtnlist
  }
];

export { Columns };
