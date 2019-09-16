import React, { Component } from "react";
import { Button, Spin, Icon } from "antd";
import { checkedSize, checkedType } from "./method";
import FileContain from "./fileContains";
import "./javaUploadFile.less";
import { classNames } from "../../../utils";
import { ossUploadFile } from "./method/upload";
import Zmage from "react-zmage";

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
}

class JavaUpload extends Component<IProps, { fileObj: IObj; isUpdate: boolean }> {
  public Upload;
  constructor(props) {
    super(props);
    this.Upload = React.createRef();
    this.state = {
      isUpdate: false,
      fileObj: {
        // "20190309/20190309-1552117617928.jpg": "http://pt-test-1.oss-cn-beijing.aliyuncs.com/20190309/20190309-1552117481105.jpg",
        // "120190309/20190309-1552117617928.zip": "https://1919-emos-test.oss-cn-beijing.aliyuncs.com/20190309/20190309-1552121909100.zip"
      }
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
  public deleteFile = imgkey => {
    const { value = {}, onChange } = this.props;
    delete value[imgkey];
    onChange && onChange(value);
    // this.setState({ fileObj });
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
          .then(res => {
            // console.info(res);
          })
          .finally(() => {
            this.setState({ isUpdate: false });
            file.value = "";
          });
      }
    }
  };

  render() {
    const { value = [], placeholder = "", buttonText = "上传文件", limitFileType = "", maxCount = 0 } = this.props;
    const isNotInLimitNum = maxCount == 0 ? true : Object.keys(value).length < maxCount;
    const { isUpdate } = this.state;

    return (
      <div className='jave-flie-upload'>
        <div>
          <label className={classNames(["upload-label", !isNotInLimitNum && "disabeld-upload"])}>
            <span>
              <Icon type={isUpdate ? "loading" : "upload"} />
              {buttonText}
            </span>

            {!isUpdate && isNotInLimitNum && (
              <input
                style={{ display: "none" }}
                type='file'
                accept={limitFileType}
                onChange={e => {
                  this.changeSelect(e);
                }}
              />
            )}
          </label>
        </div>
        <div className='tip-msg'>{placeholder}</div>

        <div>
          <FileContain fileInfo={value} deleteFile={this.deleteFile} />
        </div>
      </div>
    );
  }
}

export default JavaUpload;
