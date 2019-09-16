import React from "react";
import { TreeSelect } from "antd";
import { TreeNode } from "antd/lib/tree-select";
import { pageGet } from "@/api/ajaxExtend";

const TreeData: TreeNode[] = [
  {
    title: "parent 1",
    label: "parent 1",
    value: "parent 1",
    key: "1",
    children: [
      {
        title: "parent 1-1",
        label: "parent 1-1",
        value: "parent 1-1",
        key: "11",
        children: [
          {
            title: "children 1-1-1",
            label: "children 1-2",
            value: "children 1-1-1",
            key: "111"
          }
        ]
      },
      {
        title: "parent 1-2",
        label: "parent 1-2",
        value: "parent 1-2",
        key: "12",
        children: [
          {
            title: "children 1-2-1",
            label: "children 1-3-1",
            value: "children 1-3-1",
            key: "121"
          }
        ]
      }
    ]
  }
];

function getNodeData(arr: any[]): TreeNode[] {
  let newArr: TreeNode[] = [];
  arr.forEach(item => {
    let { id, code, name, children } = item;
    let node: TreeNode = { title: name, label: code + name, value: id, key: code };
    if (children.length > 0) {
      node.children = getNodeData(children);
    }
    newArr.push(node);
  });
  return newArr;
}

class UdTreeSelect extends React.Component<any, { treeData: TreeNode[] }> {
  state = {
    treeData: [{ title: "加载中", value: "leaf1", key: "random" }]
  };
  componentDidMount() {
    let url = "/category/tree";
    let Self = this;
    const callback = ({ isSuccess, data }) => {
      if (isSuccess) {
        let TreeData: TreeNode[] = getNodeData(data);
        Self.setState({
          treeData: TreeData
        });
      }
    };
    pageGet({ url, callback });
  }

  onChange = (value, label, extra) => {
   
    this.props.onChange(value);
    this.props.setCode(label);
    // this.setState({ value });
  };
  filterTreeNode = (inputValue: string, treeNode: any) => {
    let label: string = treeNode.props.label || "";
    return label.indexOf(inputValue) > -1;
  };

  render() {
    let { treeData } = this.state;
    return (
      <TreeSelect
        showSearch
        value={this.props.value}
        filterTreeNode={this.filterTreeNode}
        dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
        placeholder='请选择分类'
        showCheckedStrategy={TreeSelect.SHOW_ALL}
        treeData={treeData}
        allowClear
        treeDefaultExpandAll
        onChange={this.onChange}
      >
        <TreeSelect.TreeNode value='leaf1' title='加载中' key='random' />
      </TreeSelect>
    );
  }
}

export default UdTreeSelect;
