import React from "react";
import { Spin } from "antd";

function PageLoding(props) {
  return (
    <div>
      {props.init ? (
        <div style={{ textAlign: "center", marginTop: "44vh" }}>
          <Spin size='large' />
        </div>
      ) : (
        props.children
      )}
    </div>
  );
}

export default PageLoding;
