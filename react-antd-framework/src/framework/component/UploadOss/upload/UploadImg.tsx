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
  maxSize?: number;
  minSize?: number;
  notEdit?: boolean;
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
  public addImg = (imgkey, imgValue) => {
    const { value = {}, onChange } = this.props;
    value[imgkey] = imgValue;
    onChange && onChange(value);
    // this.setState({ fileObj });
  };
  /**删除文件 */
  public deleteImg = imgUrl => {
    const { onChange } = this.props;
    onChange && onChange("");
  };
  /**上传文件 */
  public changeSelect = e => {
    const { limitFileType, maxSize, minSize } = this.props;
    e.preventDefault();
    const file = e.target;

    if (file.files[0]) {
      const fileInfo: File = file.files[0];
      let validate = checkedSize(fileInfo, maxSize, minSize) && checkedType(fileInfo, limitFileType);

      if (validate) {
        this.setState({ isUpdate: true });

        const fileName =
          new Date().getTime() +
          Math.random()
            .toString(36)
            .substr(3, 4);

        ossUploadFile({ fileInfo, fileName })
          .then((res: any) => {
            this.props.onChange && this.props.onChange(res.url);
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
    const { value = "", placeholder = "", limitFileType = "", notEdit = false } = this.props;

    const { isUpdate } = this.state;

    return (
      <div className='plus-img-warpper preview-img-warpper'>
        <div className='upload-img-warpper img-warpper'>
          {value == "" || isUpdate ? (
            <Icon onClick={this.selectFile} type={isUpdate ? "loading" : "plus"} />
          ) : notEdit ? (
            <ImgPre url={value} canPreviewImg={true} />
          ) : (
            <ImgPre url={value} canPreviewImg={true}  deleteImg={this.deleteImg} editImg={this.selectFile} />
          )}
        </div>
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
