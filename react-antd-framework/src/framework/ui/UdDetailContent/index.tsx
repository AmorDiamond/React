import React, { Component, ReactNode } from "react";
import { Row, Col, Form, Input } from "antd";
import { IUdDetailItemOption } from "./type";
import { getDetailFormItemOption, getDetailFormItem } from "./method";
import { WrappedFormUtils } from "antd/lib/form/Form";
import "./index.less";

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 }
  }
};
interface IProps {
  listItems: IUdDetailItemOption[];
  values: any;
  loading: boolean;
  form?: WrappedFormUtils;
  layoutType?: "flex" | "normal";
  columnNum?: 1 | 2 | 3 | 4;
  rightSpace?: number;
}
const defaultGutter = { xs: 8, sm: 16, md: 24, lg: 32 };
class DetailComponent extends Component<IProps, { FormItems: ReactNode[] }> {
  state = { FormItems: [] };
  componentDidMount() {
    let { listItems, values, form, columnNum: num } = this.props;
    let spanCol: number = num ? Math.floor(24 / num) : 8;
    this.setState({ FormItems: getDetailFormItemOption(listItems, form, spanCol, values) });
  }
  render() {
    let { FormItems } = this.state;
    let { form, layoutType, rightSpace = 10 } = this.props;
    return (
      <Form className='detail-component' {...formItemLayout}>
        <Row style={{ paddingRight: rightSpace }} type={layoutType == "normal" ? undefined : "flex"} gutter={defaultGutter}>
          {getDetailFormItem(FormItems, form)}
        </Row>
      </Form>
    );
  }
}

export default DetailComponent;
