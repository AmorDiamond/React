 /**验证类型 */
export enum VaildatorTypes {
  required = "required",
  len = "len",
  max = "max",
  min = "min",
  password = "password",
  phone = "phone",
  email = "email",
  specialChar = "specialChar",
  integer = "integer",
  numberMax = "numberMax",
  numberMin = "numberMin",
  nonSpecial = "nonSpecial",
  alphanum = "alphanum",
  money = "money",
  twoDecimals = "twoDecimals",
  noSpace = "noSpace",
  ajaxValidate = "ajaxValidate",
  number = 'number'
}

/* 验证项 */
/** 验证项 */
export interface IVaildator {
  type: VaildatorTypes;
  msg?: string;
  value?: any;
}

/* 验证项 */
/** 验证项 */
export interface ISelfVaildator {
  validator: (rule: any, value: any, callback: any) => void;
  [propName: string]: any;
}
