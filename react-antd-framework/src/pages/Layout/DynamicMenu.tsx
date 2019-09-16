import React from "react";

import { Menu, Icon } from "antd";

import Menus, { RoutePowerObject } from "../../routes/routes";

import appStore from "../../utils/appStore";
import { Link } from "react-router-dom";
import { getSelectMenusByRouter } from "../../utils/router";

// const  systemInfo  = getSystemInfo().systemInfo;

const SubMenu = Menu.SubMenu;

class DynamicMenu extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      openKeys: [],
      options: { navTitle: "text", key: "customId", icon: "icon" },
      selectSystem: appStore.menus.childrenKeys[0],
      selectKey: ""
      // showMenuKey: window.systemInfo.menus.childrenKeys[0],
    };
  }
  //keyListObject = systemInfo.pageKeyObject;
  componentDidMount() {
    this.setMenuSelectByUrl(this.props);
  }
  setMenuSelectByUrl = props => {
    let openKeys = getSelectMenusByRouter(props.location.pathname);
    let selectSystem, selectKey;
    if (openKeys.length > 0) {
      //匹配到菜单
      selectSystem = openKeys.shift();
      selectKey = openKeys[openKeys.length - 1];
    }
    this.setState({ selectSystem, openKeys, selectKey });
  };
  componentWillReceiveProps(nextProps) {
    if (this.props.location.pathname !== nextProps.location.pathname) {
      this.setMenuSelectByUrl(nextProps);
    }
  }

  public goPage = model => {
    let { options } = this.state;

    let url = Menus[model[options.key]] && Menus[model[options.key]].path;

    if (url !== this.props.location.pathname) {
      this.props.history.push({ pathname: url, state: { refresh: true } });
    } else {
      let state = this.props.location.state;
      let count = state && state.count ? ++state.count : 1;
      this.props.history.replace({ pathname: url, state: { refresh: true, count } });
    }
  };

  getCategoryMenu = (menuInfo, key, level) => {
    const { options } = this.state;
    const hasChildren = menuInfo.childrenKeys && menuInfo.childrenKeys.length > 0;
    let tag;
    let icon = menuInfo[options.icon];

    if (hasChildren) {
      let attr = {
        key,
        title: (
          <span>
            {icon && icon !== "" && level < 1 && <Icon type={icon} />}
            <span>{menuInfo[options.navTitle]}</span>
          </span>
        )
      };
      tag = <SubMenu {...attr}>{menuInfo.childrenKeys.map(childrenKey => this.getCategoryMenu(menuInfo[childrenKey], childrenKey, ++level))}</SubMenu>;
    } else {
      tag = (
        <Menu.Item key={key}>
          <div onClick={() => this.goPage(menuInfo)}>
            <span className='nav-text'>{menuInfo[options.navTitle]}</span>
          </div>
        </Menu.Item>
      );
    }

    return tag;
  };
  onOpenChange = openKeys => {
    let menusTreeLinkObject = appStore.menuPerimissions;
    let lastKey = openKeys[openKeys.length - 1];
    let lastKeyParentKey = menusTreeLinkObject[lastKey];
    if (openKeys.indexOf(lastKeyParentKey) === -1) {
      openKeys = [lastKey];
    }
    this.setState({
      openKeys
    });
  };
  public goOtherPage = (e, url) => {
    e.stopPropagation();
    this.props.history.push(url);
  };

  render() {
    let menus = appStore.menus;
    let { selectSystem, selectKey, openKeys, options } = this.state;

    return (
      <div className='menu'>
        <div className='category-menu'>
          {menus.childrenKeys.map(key => (
            <div key={key} className={key === selectSystem ? "" : "hidden"}>
              <div className='category-title'>{menus[key][options.navTitle]}</div>
              <div className='category-tree'>
                <Menu selectedKeys={[selectKey]} openKeys={openKeys} mode='inline' onOpenChange={this.onOpenChange}>
                  {menus[key].childrenKeys.map(categoryKey => this.getCategoryMenu(menus[key][categoryKey], categoryKey, 0))}
                </Menu>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default DynamicMenu;
