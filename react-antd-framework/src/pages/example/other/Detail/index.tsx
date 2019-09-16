import React, { Component } from "react";
import { RouteComponentProps } from "react-router";
import DetailComponent from "@/framework/ui/UdDetailContent";
import { FilterFields } from "./index.options";
import { Form, Button } from "antd";
import { WrappedFormUtils } from "antd/lib/form/Form";
interface IProps extends RouteComponentProps {
  form: WrappedFormUtils;
}

class Detail extends Component<IProps, {}> {
  public submit = () => {
    this.props.form.validateFieldsAndScroll((error, values) => {
      if (!error) {
      }
    });
  };
  render() {
    let values = {
      input:
        "这是一个很长的字段这是一个很长的字段这是一个很长的字段这是一个很长的字段这是一个很长的字段这是一个很长的字段这是一个很长的字段这是一个很长的字段这是一个很长的字段这是一个很长的字段这是一个很长的字段这是一个很长的字段这是一个很长的字段这是一个很长的字段这是一个很长的字段这是一个很长的字段这是一个很长的字段这是一个很长的字段这是一个很长的字段这是一个很长的字段这是一个很长的字段这是一个很长的字段这是一个很长的字段这是一个很长的字段这是一个很长的字段这是一个很长的字段这是一个很长的字段这是一个很长的字段这是一个很长的字段这是一个很长的字段这是一个很长的字段这是一个很长的字段这是一个很长的字段这是一个很长的字段这是一个很长的字段这是一个很长的字段这是一个很长的字段这是一个很长的字段这是一个很长的字段这是一个很长的字段这是一个很长的字段这是一个很长的字段这是一个很长的字段这是一个很长的字段这是一个很长的字段",
      start: "2019-06-12 00:00:00",
      end: "2019-07-22 23:59:59"
    };
    return (
      <div className='page'>
        <div className='page-title'>标题</div>
        <div className='page-panel'>
          <DetailComponent rightSpace={91} listItems={FilterFields} values={values} form={this.props.form} loading={true} />
        </div>
        <div>
          <Button onClick={this.submit}>提交</Button>
        </div>
      </div>
    );
  }
}

export default Form.create()(Detail);
