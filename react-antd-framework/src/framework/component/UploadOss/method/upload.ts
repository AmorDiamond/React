import OSS from "ali-oss";
import { pagePost } from "@/api/ajaxExtend";

let client: any;
let createClientTime: number;
let fileFolder: number;

function setNewClientInfoByConfig(stsInfo) {
  createClientTime = new Date().getTime();
  fileFolder=stsInfo.bucketDir;

  client = new OSS({
    accessKeyId: stsInfo.accessKeyId,
    accessKeySecret: stsInfo.accessKeySecret,
    stsToken: stsInfo.securityToken,
    region: 'oss-cn-beijing',
    bucket: stsInfo.bucketName
  });
}

function updateClient(upload, reject) {
  let url = "/sts/getStsAccessKeyInfo";

  let callback = ({ isSuccess, data: stsInfo }) => {
    if (isSuccess) {
      setNewClientInfoByConfig(stsInfo);
      upload(client);
    } else {
      reject();
    }
  };

  pagePost({ url, callback });
}
// 使用日期为文件命名
const getFileSuffix = (file) => {
    const index1 = file.name.lastIndexOf('.')
    const index2 = file.name.length
    const suffix = file.name.substring(index1, index2) // 后缀名、
    return suffix
}

export function ossUploadFile({ fileName, fileInfo }) {
  return new Promise((resolve, reject) => {
    const clientPut = client => {
      
      try {
        let suffix=getFileSuffix(fileInfo);
        client
          .put(fileFolder+'/'+fileName+suffix, fileInfo, { mime: "application/octet-stream" })
          .then(res => {
            resolve(res);
          })
          .catch(res => {
            reject(res);
          });
      } catch (e) {
        reject(e);
      }
    };
    let nowTime = new Date().getTime();
    if (client && nowTime - createClientTime < 700 * 1000) {
      clientPut(client);
    } else {
      updateClient(clientPut, reject);
    }
  });
}
