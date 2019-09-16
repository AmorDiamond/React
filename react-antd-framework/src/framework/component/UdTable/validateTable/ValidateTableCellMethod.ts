let valdateGetErrMsgMethods = {
  required: ({ value, params }) => {
    let isPass = true;
    let errorMsg = "";
    if (value == null || value == "") {
      isPass = false;
      errorMsg = params.errorMsg || params.name + "不能为空。";
    }
    return { isPass, errorMsg };
  },
  integer: ({ value, params }) => {
    let pattern = /^-?[0-9]\d*$/;
    let errorMsg = "";
    let isPass = true;
    if (!pattern.test(value)) {
      isPass = false;
      errorMsg = params.errorMsg || params.name + "只能为整数。";
    }
    return { isPass, errorMsg };
  },
  max: ({ value, params }) => {
    let isPass = !value || !(value.length > params.ruleParams);
    let msg = params.errorMsg || params.name + "不能超出" + params.ruleParams + "个字符。";
    return { isPass, errorMsg: isPass ? "" : msg };
  },
  min: ({ value, params }) => {
    let isPass = !value || !(value.length < params.ruleParams);
    let msg = params.errorMsg || params.name + "不能少于" + params.ruleParams + "个字符。";
    return { isPass, errorMsg: isPass ? "" : msg };
  },
  numberMax: ({ value, params }) => {
    let isPass = !value || !(value > params.ruleParams);
    let msg = params.errorMsg || params.name + "不能大于" + params.ruleParams;
    return { isPass, errorMsg: isPass ? "" : msg };
  },
  numberMin: ({ value, params }) => {
    let isPass = !value || !(value < params.ruleParams);
    let msg = params.errorMsg || params.name + "不能小于" + params.ruleParams;
    return { isPass, errorMsg: isPass ? "" : msg };
  }
};

let vaildValueByGetError = ({ value, columnInfo, index, tableData }) => {
  let { valdateRlues = [], title, dataIndex } = columnInfo;
  let errorInfo = "";
  let isContinue = true;
  valdateRlues.forEach((rule: any) => {
    if (isContinue) {
      let type: string = typeof rule;
      let rulueValRes;
      let params: { name: string; ruleParams?: any } = { name: title };

      if (type == "string") {
        rulueValRes = valdateGetErrMsgMethods[rule]({ value: value, params });
      } else if (type == "object") {
        params.ruleParams = rule.params;
        if (rule.type == "selfValid") {
          rulueValRes = rule.method({ key: dataIndex, index, name: title, tableData }, value);
        } else {
          rulueValRes = valdateGetErrMsgMethods[rule.type]({ value: value, params });
        }
      }
      if (!rulueValRes.isPass) {
        isContinue = false;
        errorInfo = rulueValRes.errorMsg;
      }
    }
  });
  return errorInfo;
};

export function rowValidate({ value, columnInfo, index, tableData }) {
  let { dataIndex } = columnInfo;
  tableData[index]["errorInfo"][dataIndex] = "";
  let errorInfo;
  if (columnInfo.valdateRlues && columnInfo.valdateRlues.length > 0) {
    errorInfo = vaildValueByGetError({ value, columnInfo, index, tableData });
  }

  return errorInfo;
}
/**全局验证是否为空 */
export const allDataRequire = (tableData, columns) => {
  let hasError = false;

  tableData.forEach(item => {
    columns.forEach(column => {
      let key = column.dataIndex;
      if (column.valdateRlues) {
        if (item[key] == "" || item[key] == null) {
          item["errorInfo"][key] = column.title + "不能为空";
        }
      }

      if (!hasError) {
        hasError = item["errorInfo"][key] != null && item["errorInfo"][key] != "";
      }
    });
  });
  // this.setState({ tableData });
  return { tableData, hasError };
};
