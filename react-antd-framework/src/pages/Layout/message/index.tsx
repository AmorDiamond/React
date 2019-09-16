import React, { Component, Suspense } from "react";
// import Ws from "../../../utils/websocket";
import { Icon, Badge, List, Avatar } from "antd";

import "./index.less";

const data = [
  {
    title: "Ant Design Title 1"
  },
  {
    title: "Ant Design Title 2"
  },
  {
    title: "Ant Design Title 3"
  },
  {
    title: "Ant Design Title 4"
  }
];

class Main extends Component<any, any> {
  public emosWs;
  constructor(props: any) {
    super(props);
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  render() {
    return (
      <div className='order-message-warpper'>
        <Badge count={1000} overflowCount={999}>
          <div className='order-message-title'>
            <Icon type='bell' />
          </div>
        </Badge>

        <div className='order-message-content'>
          <List
            itemLayout='horizontal'
            dataSource={data}
            pagination={{
              onChange: (page) => {
                // console.log(page);
              },
              pageSize: 10,
            }}
            renderItem={item => (
              <List.Item>
                <List.Item.Meta
                  avatar={<div className="msg-logo"><Icon type="folder" /></div>}
                  title={<a href='https://ant.design'>{item.title}</a>}
                  description='Ant Design, a design language for background applications, is refined by Ant UED Team'
                />
              </List.Item>
            )}
          />
        </div>
      </div>
    );
  }
}

export default Main;
