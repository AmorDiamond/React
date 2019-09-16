import React, { ReactNode } from "react";
import { Dropdown, Menu, Icon } from "antd";

//获取下拉操作
function getDropOperate(dropDownOp: any[]) {
  let menu = (
    <Menu className='public-table-btn'>
      {dropDownOp.map((item, index: number) => (
        <Menu.Item disabled={item.props.disabled} key={"dd" + index}>
          {(item.props.disabled && item.props.children) || item}
        </Menu.Item>
      ))}
    </Menu>
  );
  return menu;
}

export function getTableBtns(normalBtns: any[], dropDownBtns: any[] = []) {
  return (
    <span className='op-warpper'>
      {normalBtns.length > 0 && normalBtns.map(item => item)}
      {dropDownBtns.length > 0 && (
        <Dropdown overlay={getDropOperate(dropDownBtns)}>
          <a href='javascript:void(0);' className='ant-dropdown-link'>
            其他操作 <Icon type='down' />
          </a>
        </Dropdown>
      )}
    </span>
  );
}
