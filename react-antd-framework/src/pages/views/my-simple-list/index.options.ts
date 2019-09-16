import { IUdFormFileld } from "@/framework/ui/UdForm/types";
import { UdFormControls } from "@/framework/ui/UdForm/types/controls";
import { ColumnTypes, TableColumn } from "@/framework/component/UdTable/types";
import {BtnIcons, ConfirmIcons, IActionButton} from "@/framework/ui/UdActionButton/types";
import store from "@/stores/tablePageStore";

export interface IGroupGoods {
  id: number;
  index: number;
  code: string;
  name: string;
  createBy: string;
  updateTimestamp: string;
}
export interface IProcurement {
  purchaseNo: string;
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
      url: "/example/page/myNormalDetail",
      addUrlParams: (model: IGroupGoods) => {
        return `/example/page/myNormalDetail/${model.id}`;
      }
    }
  },
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

const FilterFields: IUdFormFileld[] = [
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
    key: "purchaseNo7",
    name: "采购单号",
    initialValue: 1,
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

const PageBtnList: IActionButton<IProcurement>[] = [
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
      modalTitle: "弹出框",
      modalType: "UpdateClass",
      changeModal: ()=>store.setPopupInfo,
    }
  },
];

export { Columns,FilterFields,PageBtnList };
