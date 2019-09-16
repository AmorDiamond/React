import React, { Component } from "react";
import { observer } from "mobx-react";
import { Radio, Button, Popconfirm, Form, Icon, Table } from "antd";

import RadioGroup from "antd/lib/radio/group";
import { allDataRequire } from "@/framework/component/UdTable/validateTable/ValidateTableCellMethod";
import EditTable from "@/framework/component/UdTable/validateTable";
import ContorlInput from "@/framework/ui/UdForm/controls/ContorlInput";

import "./index.less";
import { TableVTypeEnum } from "@/framework/component/UdTable/validateTable/type";

let selfValid = ({ key, name, index, tableData }, newValue) => {
  let errorMsg = "";
  let isExitIndex = tableData.findIndex((row, i) => row[key] == newValue && i != index);
  if (isExitIndex > -1) {
    errorMsg = "数据重复，请修改。";
  }
  let isPass = false;
  return { isPass, errorMsg };
};
/**不存在的数据进行验证重复 */
const removeNotExistErrorInfo = ({ dataIndex, title, index, tableData }) => {
  tableData.forEach((item, currentIndex) => {
    if (item["errorInfo"][dataIndex] && item["errorInfo"][dataIndex][0] == "数" && currentIndex != index) {
      let isExitIndex = tableData.findIndex((row, i) => row[dataIndex] == item[dataIndex] && i != currentIndex);
      if (isExitIndex == -1) {
        item["errorInfo"][dataIndex] = "";
      }
      item[dataIndex] == "" && (item["errorInfo"][dataIndex] = title + "不能为空。");
    }
    tableData[currentIndex] = item;
  });
  return tableData;
};

@observer
class ValidateTable extends Component<any, { tableData: any[]; radioValue: boolean; isDisable: boolean }> {
  public columns: any[] = [
    {
      title: "值编码",
      dataIndex: "valueCode",
      edit: true,
      valdateRlues: [
        TableVTypeEnum.required,
        TableVTypeEnum.integer,
        { type: TableVTypeEnum.numberMax, params: 999 },
        { type: TableVTypeEnum.numberMin, params: 1 },
        { type: TableVTypeEnum.selfValid, method: selfValid }
      ],
      contorl: ContorlInput
    },
    {
      title: "值名称",
      dataIndex: "valueName",
      edit: true,
      valdateRlues: [TableVTypeEnum.required, { type: TableVTypeEnum.max, params: 10 }, { type: TableVTypeEnum.selfValid, method: selfValid }],
      contorl: ContorlInput
    },
    {
      title: "sap编码",
      edit: true,
      dataIndex: "sapCode",
      valdateRlues: [{ type: TableVTypeEnum.max, params: 32 }],
      contorl: ContorlInput
    },
    {
      title: "删除",
      dataIndex: "op",
      align: "center",
      width: 80,
      render: (text, record, index) => (
        <Popconfirm
          title='确定删除吗?'
          onConfirm={() => {
            this.romoveRow(index);
          }}
        >
          <Icon type='delete' />
        </Popconfirm>
      )
    }
  ];

  constructor(props) {
    super(props);
    this.state = { tableData: [], radioValue: false, isDisable: false };
  }

  radioChange = e => {
    this.setState({ radioValue: e.target.value });
  };

  changeCell = ({ columnInfo, value, index, errorInfo }) => {
    let { tableData } = this.state;
    let { dataIndex, title } = columnInfo;
    tableData[index][dataIndex] = value;
    if (errorInfo != "") {
      tableData[index]["errorInfo"][dataIndex] = errorInfo;
    }
    if (dataIndex != "sapCode") {
      removeNotExistErrorInfo({ tableData, dataIndex, index, title });
    }
    this.setState({ tableData });
  };

  public addRow = (): void => {
    let row = { valueCode: "", valueName: "", sapCode: "", errorInfo: {} };
    let { tableData } = this.state;
    tableData.push(row);

    this.setState({ tableData });
  };

  public romoveRow = (index): void => {
    let { tableData } = this.state;
    tableData.splice(index, 1);
    this.setState({ tableData });
  };

  public getValidateRes = () => {
    let { tableData, radioValue } = this.state;

    let validateRes = allDataRequire(tableData, this.columns);
    tableData = validateRes.tableData;
    this.setState({ tableData });

    let data: any[] = [];
    if (!validateRes.hasError) {
      data = tableData.map(item => {
        let { ...newItem } = item;
        delete newItem.errorInfo;
        return newItem;
      });
    }

    return { tableData: data, isRadio: radioValue, hasError: validateRes.hasError };
  };

  componentDidMount() {
    let { dataSource, data } = this.props;

    let tableData = dataSource.map(item => {
      item.errorInfo = {};
      return item;
    });

    this.setState({ tableData, isDisable: data && data.isLinkGood });
  }

  render() {
    let { tableData, radioValue, isDisable } = this.state;

    return (
      <div className='property-value-list'>
        <div className='list-op'>
          <RadioGroup onChange={this.radioChange} value={radioValue} disabled={isDisable}>
            <Radio value={true}>单选</Radio>
            <Radio value={false}>多选</Radio>
          </RadioGroup>
          {!isDisable && (
            <Button type='primary' onClick={this.addRow}>
              添加行
            </Button>
          )}
        </div>
        {isDisable ? (
          <Table columns={this.columns.splice(0, 3)} dataSource={tableData} pagination={false} bordered />
        ) : (
          <EditTable columns={this.columns} changeCell={this.changeCell} dataSource={tableData} />
        )}
      </div>
    );
  }
}

export default ValidateTable;
