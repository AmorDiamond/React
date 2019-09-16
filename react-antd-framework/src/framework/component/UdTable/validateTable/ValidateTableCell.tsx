import React from "react";
import { Form } from "antd";

export default function TableCell({ children, errorInfo = "" }) {
  let arr: any = errorInfo != "" && errorInfo != null ? { validateStatus: "error", help: errorInfo } : {};

  return <Form.Item {...arr}>{children}</Form.Item>;
}

