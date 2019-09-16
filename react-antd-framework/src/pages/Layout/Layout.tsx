import React, { Component, Suspense } from "react";
import { Layout, Menu, Icon } from "antd";
import classNames from 'classnames'
import DynamicMenu from "./DynamicMenu";
import "./Layout.less";

import { NavLink } from "react-router-dom";

const { Sider, Content } = Layout;
const SubMenu = Menu.SubMenu;

class Main extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = { collapsed: false, visible: false };
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  render() {
    return (
      <Layout className='system'>
        <Sider className="system-sider" trigger={null} width={this.state.collapsed ? '0' : '210'}>
          <DynamicMenu
            history={this.props.history}
            location={this.props.location}
          />
          <div className={classNames('siderbar-collapse', { 'collapse': this.state.collapsed })}>
            <div className="siderbar-collapse-bg" onClick={this.toggle}>
              <Icon type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} className="icon" />
            </div>
          </div>
        </Sider>

        <Layout className='system-main'>
          <Content id='system-main-content' className='system-main-content'>
            {this.props.children || null}
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default Main;
