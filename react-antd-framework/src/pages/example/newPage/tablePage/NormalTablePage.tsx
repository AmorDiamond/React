import React, { Component, createRef } from "react";
import NormalTable from "@component/UdTable/normalTable";
// import NormalFilter from "@ui/UdForm/UdFilterForm/normalFilter";
import SmartFilter from "@/framework/ui/UdForm/UdFilterForm/SmartFilter";

import store from "@/stores/tablePageStore";
import { GetActionButtons } from "@/framework/ui/UdActionButton/ActionButtons";
import { observer } from "mobx-react";

import { BtnIcons, IActionButton } from "@/framework/ui/UdActionButton/types";
import { IUdFormFileld } from "@/framework/ui/UdForm/types";
import { TableColumn, ColumnTypes } from "@/framework/component/UdTable/types";
import { UdFormControls } from "@/framework/ui/UdForm/types/controls";
import { fileterButtonByPower } from "@/utils";
import NormalTablePage from "../common/NormalTablePage";

export interface IProcurement {
  purchaseNo: string;
}

@observer
class ProcurementList extends NormalTablePage<IProcurement> {
  public tableBtnlist: IActionButton<IProcurement>[] = [
    {
      title: "编辑SKU",
      // authCode: 'upc_update_sku1',
      action: {
        type: "Route",
        url: "/GoodsManage/GoodsList/SkuPage/SKUEdit",
        addUrlParams: (modle: IProcurement) => {
          return `/GoodsManage/GoodsList/SkuPage/SKUEdit/${2}/${2}/edit`;
        }
      }
    }
  ];

  public PageBtnList: IActionButton<IProcurement>[] = [
    {
      title: "新建采购计划",
      icon: BtnIcons.plus,
      btnType: "primary",
      // authCode: "upc_add_property",
      action: {
        type: "Route",
        url: "/Procurement/ProcurementPlan/AddProcurementPlan"
      }
    },
    {
      title: "弹窗",
      icon: BtnIcons.plus,
      btnType: "primary",
      // authCode: "upc_add_property",
      action: {
        type: "Modal",
        modalType: "UpdateClass",
        modalTitle: "弹窗"
      }
    },
  ];

  public FilterFields: IUdFormFileld[] = [
    {
      key: "applicantCode",
      name: "供应商编码",
      control: {
        type: UdFormControls.Input,
        supplementAttr: {
          maxLength: 20
        }
      }
    },
    {
      key: "purchaseNo",
      name: "采购单号",
      control: {
        type: UdFormControls.Input,
        supplementAttr: {
          maxLength: 20
        }
      }
    },
    {
      key: "purchaseNo2",
      name: "采购单号",
      control: {
        type: UdFormControls.Input,
        supplementAttr: {
          maxLength: 20
        }
      }
    },
    {
      key: "purchaseNo3",
      name: "采购单号",
      control: {
        type: UdFormControls.Input,
        supplementAttr: {
          maxLength: 20
        }
      }
    },
    {
      key: "purchaseNo4",
      name: "采购单号",
      control: {
        type: UdFormControls.Input,
        supplementAttr: {
          maxLength: 20
        }
      }
    },
    {
      key: "purchaseNo5",
      name: "采购单号",
      control: {
        type: UdFormControls.Input,
        supplementAttr: {
          maxLength: 20
        }
      }
    },
    {
      key: "purchaseNo6",
      name: "采购单号",
      control: {
        type: UdFormControls.Input,
        supplementAttr: {
          maxLength: 20
        }
      }
    },
    {
      key: "purchaseNo7",
      name: "采购单号",
      control: {
        type: UdFormControls.Select,
        supplementAttr: {
          options: [
            {
              value: 1,
              title: "1",
            },
            {
              value: 2,
              title: "2",
            }
          ],
        },
      }
    }
  ];

  public Column: TableColumn<IProcurement>[] = [
    {
      title: "采购单号",
      className: "min-width-100",
      dataIndex: "purchaseNo",
      key: "purchaseNo"
    },
    {
      title: "供应商编码",
      className: "min-width-100",
      dataIndex: "applicantCode",
      key: "applicantCode"
    },
    {
      title: "供应商名称",
      className: "min-width-100",
      dataIndex: "applicant",
      key: "applicant"
    },
    {
      title: "二维码类型",
      className: "min-width-100",
      dataIndex: "purchaseType",
      key: "purchaseType",
      render: modle => {
        const translate = {
          BOTTLE: "瓶码",
          BOX: "箱码",
          SET: "套码"
        };
        return translate[modle] ? translate[modle] : "--";
      }
    },
    {
      title: "数量（包）",
      className: "min-width-100",
      dataIndex: "quantity",
      key: "quantity"
    },
    {
      title: "时间",
      className: "min-width-100",
      dataIndex: "createTime",
      key: "createTime"
    },
    {
      title: "收货人姓名",
      className: "min-width-100",
      dataIndex: "consignee",
      key: "consignee"
    },
    {
      title: "收货人电话",
      className: "min-width-100",
      dataIndex: "consigneePhone",
      key: "consigneePhone"
    },
    {
      title: "订货人地址",
      className: "min-width-100",
      dataIndex: "consigneeAddress",
      key: "consigneeAddress"
    },
    {
      title: "操作",
      className: "min-width-100",
      dataIndex: "op",
      key: "op",
      columnType: ColumnTypes.BtnList,
      normalBtn: fileterButtonByPower(this.tableBtnlist)
    }
  ];

  constructor(props) {
    super(props);
    this.state = {
      initUrl: "/v2/qrcode/purchaseOrder/page",
      title: "采购列表"
    };
  }
}

export default ProcurementList;
