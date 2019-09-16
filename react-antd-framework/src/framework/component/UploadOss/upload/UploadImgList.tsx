import React, { Component } from "react";
import { Button, Spin, Icon } from "antd";
import { checkedSize, checkedType } from "../method";

import { classNames } from "../../../../utils";
import { ossUploadFile } from "../method/upload";
import ImgPre from "../fileContains/ImgPre";
import "../index.less";
import "./index.less";

interface IObj {
  [key: string]: string;
}
interface IProps {
  value?: any;
  onChange?: (value) => void;
  limitFileType?: any;
  placeholder?: string;
  buttonText?: string;
  maxCount?: number;
  hiddenUpload?:boolean;
}

class UploadImgList extends Component<IProps, { isUpdate: boolean }> {
  public UploadTag;
  constructor(props) {
    super(props);
    this.UploadTag = React.createRef();
    this.state = {
      isUpdate: false
    };
  }
  /**添加文件 */
  public addImg = imgValue => {
    const { value = [], onChange } = this.props;
    value.push(imgValue);
    onChange && onChange(value);
  };
  /**删除文件 */
  public deleteImg = imgUrl => {
    const { value = [], onChange } = this.props;
    let index = value.findIndex(url => url == imgUrl);
    value.splice(index, 1);
    onChange && onChange(value);
  };
  /**上传文件 */
  public changeSelect = e => {
    const { limitFileType } = this.props;
    e.preventDefault();
    const file = e.target;

    if (file.files[0]) {
      const fileInfo: File = file.files[0];
      let validate = checkedSize(fileInfo) && checkedType(fileInfo, limitFileType);

      if (validate) {
        this.setState({ isUpdate: true });

        const fileName =
          new Date().getTime() +
          Math.random()
            .toString(36)
            .substr(3, 4);

        ossUploadFile({ fileInfo, fileName })
          .then((res: any) => {
            this.addImg(res.url);
          })
          .finally(() => {
            this.setState({ isUpdate: false });
            file.value = "";
          });
      }
    }
  };
  public selectFile = () => {
    if (!this.state.isUpdate) {
      this.UploadTag.current.click();
    }
  };

  render() {
    const { value = [], placeholder = "",hiddenUpload: hiddenSubmit, buttonText = "上传文件", limitFileType = "", maxCount = 0 } = this.props;

    const isNotInLimitNum = maxCount == 0 ? true : value.length < maxCount;
    const { isUpdate } = this.state;

    // console.log('value', value);

    return (
      <div className='plus-img-warpper preview-img-warpper'>
        {value &&
          value.map(url => (
            <div className='img-warpper' key={url}>
              <ImgPre url={url} canPreviewImg={true} deleteImg={this.deleteImg} />
            </div>
          ))}

        {!hiddenSubmit&&isNotInLimitNum && (
          <div className='upload-img-warpper'>
            <Icon onClick={this.selectFile} type={isUpdate ? "loading" : "plus"} />
          </div>
        )}

        <div className='tip-msg'>{placeholder}</div>
        <input
          ref={this.UploadTag}
          style={{ display: "none" }}
          type='file'
          accept={limitFileType}
          onChange={e => {
            this.changeSelect(e);
          }}
        />
      </div>
    );
  }
}

export default UploadImgList;
