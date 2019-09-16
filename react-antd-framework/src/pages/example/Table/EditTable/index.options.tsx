import React from "react";
import { IEditColumn, TableVTypeEnum } from "@/framework/component/UdTable/editTable/type";
import ContorlInput from "@/framework/ui/UdForm/controls/ContorlInput";


export interface IGroupGoods {
  index: number;
  name: string;
  deliverGrade?: number;
  deliverNum?: number;
  storeNum?: number;
}
let selfValidRepeat = ({ key, name, index, tableData }, newValue) => {
  let errorMsg = "";
  let isExitIndex = tableData.findIndex((row, i) => row[key] == newValue && i != index);
  if (isExitIndex > -1) {
    errorMsg = "数据重复，请修改。";
  }
  let isPass = false;
  return { isPass, errorMsg };
};
let selfValidRow = ({ key, name, index, tableData }, newValue) => {
  let errorMsg = "";
  let row = tableData[index];
  if (row.deliverNum > parseInt(row.storeNum)) {
    errorMsg = "发货数量不能大于库存数量";
  }
  let isPass = false;
  return { isPass, errorMsg };
};

const columns: IEditColumn<IGroupGoods>[] = [
  {
    title: "序号",
    className: "min-width-100",
    dataIndex: "index",
    key: "index",
    sorter: (a, b) => a.index - b.index
  },
  {
    title: "发货优先级（当列不能重复）",
    className: "min-width-100",
    dataIndex: "deliverGrade",
    key: "deliverGrade",
    contorl: ContorlInput,
    valdateCellRlues: [
      TableVTypeEnum.required,
      TableVTypeEnum.integer,
      { type: TableVTypeEnum.numberMin, errorMsg: "最小值不能小于2", params: 2 },
      { type: TableVTypeEnum.selfValid, errorMsg: "数据不能重复", method: selfValidRepeat }
    ],
    relationColumnKeys: "deliverGrade"
  },
  {
    title: "发货数量（不大于库存数量）",
    className: "min-width-100",
    dataIndex: "deliverNum",
    key: "deliverNum",
    contorl: ContorlInput,
    valdateCellRlues: [TableVTypeEnum.required, TableVTypeEnum.integer, { type: TableVTypeEnum.selfValid, method: selfValidRow }]
    // relationRowKeys: "storeNum"
  },

  {
    title: "库存数量",
    className: "min-width-100",
    dataIndex: "storeNum",
    key: "storeNum",
    contorl: ContorlInput,
    valdateCellRlues: [TableVTypeEnum.required, TableVTypeEnum.integer, { type: TableVTypeEnum.numberMin, errorMsg: "最小值不能小于0", params: 0 }],
    relationRowKeys: "deliverNum"
  }
];

const data: IGroupGoods[] = [];

for (let i = 0; i < 3; i++) {
  let item: IGroupGoods = {
    index: i,
    name: "第" + i + "个产品"
  };
  data.push(item);
}

export { columns, data };
