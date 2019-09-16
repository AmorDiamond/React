import React from "react";
import { IUdFormFileld } from "../types";
import { IVaildator } from "../types/vaildator";
import { UdControl } from "../types/controls";
import { WrappedFormUtils } from "antd/lib/form/Form";
import { pageGet } from "@/api/ajaxExtend";
import http from "@/utils/http";
interface IValidatorInfo {
  name: string;
  vaildator: IVaildator;
}

const validates: any = {
  required: ({ name, vaildator }: IValidatorInfo) => {
    return {
      required: true,
      message: vaildator.msg ? vaildator.msg : name + "不能为空"
    };
  },
  len: ({ name, vaildator }: IValidatorInfo) => {
    return {
      len: vaildator.value,
      message: vaildator.msg ? vaildator.msg : name + "只能为" + vaildator.value
    };
  },
  max: ({ name, vaildator }: IValidatorInfo) => {
    return {
      max: vaildator.value,
      message: vaildator.msg ? vaildator.msg : name + "不能超出" + vaildator.value + "个字符"
    };
  },
  min: ({ name, vaildator }: IValidatorInfo) => {
    return {
      min: vaildator.value,
      message: vaildator.msg ? vaildator.msg : name + "不能小于" + vaildator.value + "个字符"
    };
  },

  password: ({ name, vaildator }: IValidatorInfo) => {
    return {
      pattern: /^(?=.*[a-zA-Z])(?=.*\d)[^]{8,30}$/,
      message: vaildator.msg ? vaildator.msg : name + "需包含字母、数字，且在8到30位"
    };
  },
  phone: ({ name, vaildator }: IValidatorInfo) => {
    return {
      pattern: /^1[3-9]\d{9}$/,
      message: vaildator.msg ? vaildator.msg : name + "格式错误"
    };
  },
  email: ({ name, vaildator }: IValidatorInfo) => {
    return {
      pattern: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
      message: vaildator.msg ? vaildator.msg : name + "格式错误"
    };
  },
  // AddressSelect:(item:VerifyFormItem)=> {
  //     return {validator: checkAddress};
  // },
  specialChar: ({ name, vaildator }: IValidatorInfo) => {
    return {
      pattern: /[，。？：；’‘”“！\w\u4e00-\u9fa5]+$/,
      message: vaildator.msg ? vaildator.msg : name + "不能包含特殊字符"
    };
  },
  integer: ({ name, vaildator }: IValidatorInfo) => {
    return {
      pattern: /^-?[0-9]\d*$/,
      message: vaildator.msg ? vaildator.msg : name + "只能为整数"
    };
  },
  numberMax: ({ name, vaildator }: IValidatorInfo) => {
    return {
      validator: (rule: any, value: any, callback: any) => {
        if (!value) {
          callback();
          return;
        }

        if (value > vaildator.value) {
          callback(vaildator.msg ? vaildator.msg : name + "不能大于" + vaildator.value);
          return;
        }
        callback();
      }
    };
  },
  numberMin: ({ name, vaildator }: IValidatorInfo) => {
    return {
      validator: (rule: any, value: any, callback: any) => {
        if (!value && value != 0) {
          callback();
          return;
        }

        if (value < vaildator.value) {
          callback(vaildator.msg ? vaildator.msg : name + "不能小于" + vaildator.value);
          return;
        }
        callback();
      }
    };
  },
  nonSpecial: ({ name, vaildator }: IValidatorInfo) => {
    return {
      pattern: /^[\w\u4e00-\u9fa5]+$/,
      message: vaildator.msg ? vaildator.msg : name + "只能包含字母、数字，汉字"
    };
  },
  alphanum: ({ name, vaildator }: IValidatorInfo) => {
    return {
      pattern: /^[\w]+$/,
      message: vaildator.msg ? vaildator.msg : name + "只能包含字母、数字"
    };
  },
  money: ({ name, vaildator }: IValidatorInfo) => {
    return {
      pattern: /(?!^0*(\.0+)?$)^\d{1,13}(\.\d+)?$/,
      message: vaildator.msg ? vaildator.msg : name + "输入格式不正确"
    };
  },
  twoDecimals: ({ name, vaildator }: IValidatorInfo) => {
    return {
      pattern: /^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/,
      message: vaildator.msg ? vaildator.msg : name + "只能是正整数或2位小数以内"
    };
  },
  noSpace: ({ name, vaildator }: IValidatorInfo) => {
    return {
      pattern: /^\s*(\S+)\s*$/,
      message: vaildator.msg ? vaildator.msg : name + "不能输入空格"
    };
  },
  ajaxValidate: ({ name, vaildator }: IValidatorInfo) => {
    let message = vaildator.msg ? vaildator.msg : name + "已存在！";
    let ajaxParams = vaildator.value;
    return {
      validator: (rule: any, value: any, callback: any) => {
        const ajaxCallback = ({ isSuccess, data }) => {
          if (isSuccess && data) {
            callback(message);
          } else {
            callback();
          }
        };
      
        if (value == "" || value == null) {
          callback();
        } else {
          pageGet({ url: ajaxParams.url, params: { [ajaxParams.key]: value }, callback: ajaxCallback });
        }
      }
    };
  },
  number: ({ name, vaildator }: IValidatorInfo) => {
    return {
      pattern: /^\d+$/,
      message: vaildator.msg ? vaildator.msg : name + "只能输入数字"
    };
  },
};

/**根据表单项获取验证条件 */
export function getValidate(item: IUdFormFileld, form: WrappedFormUtils) {
  let validate: any = [];
  if (item.control.vaildator) {
    item.control.vaildator.forEach(vaildatorItem => {
      let vaildator: any = typeof vaildatorItem == "string" ? { type: vaildatorItem } : vaildatorItem;
      let vaildatorInfo: IValidatorInfo = {
        name: item.name,
        vaildator
      };
      validate.push(validates[vaildator.type](vaildatorInfo));
    });
  }
  if (item.control.selfVaildator) {
    item.control.selfVaildator.forEach(validator => {
      if (typeof validator == "function") {
        validate.push(validator(form));
      } else {
        validate.push(validator);
      }
    });
  }

  return validate;
}

/**获取表单名和控件属性获取验证条件 */
export function getValidateByNameAndControl(name: string, control: UdControl, form: WrappedFormUtils) {
  let validate: any = [];
  if (control.vaildator) {
    control.vaildator.forEach(vaildatorItem => {
      let vaildator: any = typeof vaildatorItem == "string" ? { type: vaildatorItem } : vaildatorItem;
      let vaildatorInfo: IValidatorInfo = {
        name: name,
        vaildator
      };
      validate.push(validates[vaildator.type](vaildatorInfo));
    });
  }
  if (control.selfVaildator) {
    control.selfVaildator.forEach(validator => {
      if (typeof validator == "function") {
        validate.push(validator(form));
      } else {
        validate.push(validator);
      }
    });
  }

  return validate;
}
