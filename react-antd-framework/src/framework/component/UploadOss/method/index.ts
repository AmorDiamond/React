import axios from "axios";
import { notification } from "antd";

import http from "../../../../utils/http";

/**获取文件扩展名 */
export function getFileExt(fileName: string) {
  const index = fileName.lastIndexOf(".");
  let fileExt;
  if (index != -1) {
    fileExt = fileName.substring(index, fileName.length);
  }
  return fileExt;
}

/**验证大小*/
export function checkedSize(fileInfo: File, max: number = 8 * 1024, min: number = 0) {
  if (fileInfo.size < min * 1024 || fileInfo.size > max * 1024) {
    let maxNum = Math.ceil(max / 1024);
    notification["error"]({
      message: `系统消息`,
      description: "上传文件大小只能是 " + min + "kb - " + maxNum + "MB 之间的文件"
    });
    return false;
  }
  return true;
}

export function checkedType(fileInfo: File, limitFileType: string = ".jpg,.png,.gif,.txt,.rar,.zip,.doc,.docx,.pdf, .xlsx, .xls") {
  const typeArr = fileInfo.name.split(".");
  let type = typeArr[typeArr.length - 1].toLowerCase();
  if (!type || !(limitFileType.indexOf(type) > -1)) {
    notification["error"]({
      message: `系统消息`,
      description: "上传的文件格式只能为" + limitFileType
    });
    return false;
  }
  return true;
}
