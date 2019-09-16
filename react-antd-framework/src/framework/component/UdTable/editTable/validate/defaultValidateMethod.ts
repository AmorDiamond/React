import { TableVTypeEnum, IEditColumn, valdateCellRlue } from "../type";
import { object } from "prop-types";

export interface IMethodOtherParam {
  name: string;
  ruleParams?: any;
  errorMsg?: string;
}

interface IDefaultValidateMethodParam {
  value: any;
  otherParams: IMethodOtherParam;
}
interface IDefaultValidateMethodRes {
  isPass: boolean;
  errorMsg: string;
}
interface IDefaultValidateMethod {
  [rule: string]: ({ value, otherParams: params }: IDefaultValidateMethodParam) => IDefaultValidateMethodRes;
}

let defaultValidateMethod: IDefaultValidateMethod = {
  [TableVTypeEnum.required]: ({ value, otherParams }) => {
    let isPass = true;
    let errorMsg = "";
    if (value == null || value == "") {
      isPass = false;
      errorMsg = otherParams.errorMsg || otherParams.name + "不能为空。";
    }
    return { isPass, errorMsg };
  },
  [TableVTypeEnum.integer]: ({ value, otherParams }) => {
    let pattern = /^-?[0-9]\d*$/;
    let errorMsg = "";
    let isPass = true;
    if (!pattern.test(value)) {
      isPass = false;
      errorMsg = otherParams.errorMsg || otherParams.name + "只能为整数。";
    }
    return { isPass, errorMsg };
  },
  [TableVTypeEnum.max]: ({ value, otherParams }) => {
    let isPass = !value || !(value.length > otherParams.ruleParams);
    let msg = otherParams.errorMsg || otherParams.name + "不能超出" + otherParams.ruleParams + "个字符。";
    return { isPass, errorMsg: isPass ? "" : msg };
  },
  [TableVTypeEnum.min]: ({ value, otherParams }) => {
    let isPass = !value || !(value.length < otherParams.ruleParams);
    let msg = otherParams.errorMsg || otherParams.name + "不能少于" + otherParams.ruleParams + "个字符。";
    return { isPass, errorMsg: isPass ? "" : msg };
  },
  [TableVTypeEnum.numberMax]: ({ value, otherParams }) => {
    let isPass = !value || !(value > otherParams.ruleParams);
    let msg = otherParams.errorMsg || otherParams.name + "不能大于" + otherParams.ruleParams;
    return { isPass, errorMsg: isPass ? "" : msg };
  },
  [TableVTypeEnum.numberMin]: ({ value, otherParams }) => {
    let isPass = !value || !(value < otherParams.ruleParams);
    let msg = otherParams.errorMsg || otherParams.name + "不能小于" + otherParams.ruleParams;
    return { isPass, errorMsg: isPass ? "" : msg };
  }
};
interface IVCellRuleParams {
  rule: valdateCellRlue;
  value: any;
  title: any;
  dataIndex: string;
  index: number;
  tableData: any[];
}
interface IVCellAllRuleParams {
  columnInfo: IEditColumn;
  value: any;
  index: number;
  tableData: any[];
}
interface IVRowParams {
  columns: IEditColumn[];
  currentErrorInfo: { [name: string]: string };
  index: number;
  VNoOpCol: boolean;
  tableData: any[];
}
interface IVColumnParams {
  columns: IEditColumn[];
  VNoOpCol: boolean;
  tableData: any[];
}
/**促发单个验证规则 并返回结果 */
export const validateCellRule = ({ rule, value, title, dataIndex, index, tableData }: IVCellRuleParams): IDefaultValidateMethodRes => {
  // let type: string = typeof rule;
  let ruleValRes;
  let params: IMethodOtherParam = { name: title };
  if (typeof rule == "string") {
    ruleValRes = defaultValidateMethod[rule]({ value: value, otherParams: params });
  } else if (typeof rule == "object") {
    params.ruleParams = rule.params;
    if (rule.errorMsg) {
      params.errorMsg = rule.errorMsg;
    }
    if (rule.type == "selfValid") {
      ruleValRes = rule.method({ key: dataIndex, name: title, index, tableData }, value);
    } else {
      ruleValRes = defaultValidateMethod[rule.type]({ value: value, otherParams: params });
    }
  }
  return ruleValRes;
};
/**促发所有验证规则 */
export const validateCellAllRule = ({ value, columnInfo, index, tableData }: IVCellAllRuleParams): string => {
  let { valdateCellRlues = [], title, dataIndex } = columnInfo;
  let errorInfo = "";
  let isContinue = true;
  valdateCellRlues.forEach((rule: any) => {
    if (isContinue) {
      let type: string = typeof rule;
      let rulueValRes = validateCellRule({ rule, value, title, dataIndex, index, tableData });
      if (!rulueValRes.isPass) {
        isContinue = false;
        errorInfo = rulueValRes.errorMsg;
      }
    }
  });
  return errorInfo;
};
/**验证单条数据指定的行 */
export const validateRow = ({ columns, index, tableData, currentErrorInfo, VNoOpCol = false }: IVRowParams) => {
  let { ...errorInfo } = currentErrorInfo;
  columns.forEach(columnInfo => {
    if (VNoOpCol || errorInfo.hasOwnProperty(columnInfo.dataIndex)) {
      errorInfo[columnInfo.dataIndex] = "";
      let value = tableData[index][columnInfo.dataIndex];
      let errorMsg = validateCellAllRule({ value, columnInfo, index, tableData });
      if (errorMsg != "") {
        errorInfo[columnInfo.dataIndex] = errorMsg;
      }
    }
  });
  return errorInfo;
};
/**验证指定列 */
export const validateColumns = ({ columns, tableData, VNoOpCol = false }: IVColumnParams) => {
  tableData.forEach((row, index) => {
    let currentErrorInfo = row.errorInfo;
    row.errorInfo = validateRow({ columns, index, tableData, currentErrorInfo, VNoOpCol });
  });
  return tableData;
};
/**验证所有table */
export const validateTable = ({ columns, tableData }) => {
  let isPass = true;
  tableData.forEach((row, index) => {
    let currentErrorInfo = row.errorInfo;
    row.errorInfo = validateRow({ columns, index, tableData, currentErrorInfo, VNoOpCol: true });
    if (isPass && row.errorInfo && Object.keys(row.errorInfo).length > 0) {
      isPass = false;
    }
  });
  return { isPass, tableData };
};
