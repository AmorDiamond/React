import React, { Component } from "react";
import { Icon } from "antd";
import { classNames } from "../../../../utils";
import Zmage from "react-zmage";

interface IProps {
  url: string;
  direction?: string;
  deleteFile?: (key: string) => void;
  deleteImg?: (key: string) => void;
  editImg?: (key: string) => void;
  canPreviewImg?: boolean;
}

class ImgPre extends Component<IProps, any> {
  public imgRef;
  constructor(props) {
    super(props);
    this.imgRef = React.createRef();
  }
  public previewImg = () => {
    this.imgRef.current.setState({ browsing: true });
  };

  //最多可上传5个附件，每个附件大小不得超过8M。附件支持的格式有:'jpg', 'png','gif','txt','rar','zip','doc','docx','pdf', 'xlsx', 'xls'
  render() {
    const { url = "", deleteImg, editImg, canPreviewImg } = this.props;

    return (
      <div className='img-con'>
        <Zmage ref={this.imgRef} src={url} />
        <div className='img-cover'>
          <div className='img-action'>
            {canPreviewImg && <Icon type='eye' onClick={this.previewImg} title='预览图片' />}
            {deleteImg && <Icon type='delete' onClick={() => deleteImg(url)} title='删除图片' />}
            {editImg && <Icon type='edit' onClick={() => editImg(url)} title='替换图片' />}
          </div>
        </div>
      </div>
    );
  }
}

export default ImgPre;
