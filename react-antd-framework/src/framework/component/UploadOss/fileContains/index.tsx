import React, { Component } from "react";
import { Modal, Icon } from "antd";

import { classNames } from "../../../../utils";
import { pageGet, downLoadFile } from "../../../../api/ajaxExtend";
import { getFileExt } from "../method";

import appStore from "../../../../utils/appStore";
import ImgPre from "./ImgPre";


interface IProps {
  fileInfo: any;
  direction?: string;
  deleteFile?: (key: string) => void;
}



class FileContain extends Component<IProps, { showImg: string; visible: boolean }> {
  public state = {
    showImg: "",
    visible: false
  };
  

  public clickFile = fileName => {};

  public closeImg = () => {
    this.setState({ showImg: "", visible: false });
  };
  /** 删除文件*/
  public deleteFile = (fileKey: string) => {
    const { deleteFile } = this.props;
    if (deleteFile) {
      const url = "/oss/delete";
      const successMessage = "删除成功";
      const params = { fileName: fileKey };
      const callback = () => {
        deleteFile(fileKey);
      };
      pageGet({ url, successMessage, params, callback });
    }
  };

  //最多可上传5个附件，每个附件大小不得超过8M。附件支持的格式有:'jpg', 'png','gif','txt','rar','zip','doc','docx','pdf', 'xlsx', 'xls'
  render() {
    const { fileInfo = [], direction = "vertical", deleteFile } = this.props;
    const { showImg, visible } = this.state;

    return (
      <div className={classNames(["file-browse-warpper", direction == "vertical" && "vertical"])}>
        {fileInfo &&
          fileInfo.map(url => (
            <div className='file' key={url}>
              {/* <a className='file-info' onClick={() => this.clickFile(url)}>
                {url}
              </a> */}
              <ImgPre url={url} />
              {deleteFile && (
                <a className='file-op' onClick={() => this.deleteFile(url)}>
                  <Icon type='delete' />
                </a>
              )}
            </div>
          ))}
      </div>
    );
  }
}

export default FileContain;
