import moment, { Moment } from "moment";
import storeApp from "./appStore";
import { log } from "util";

/**比较两个object是否相等 */
export function compareObject(origin: any, target: any) {
  if (typeof target === "object" && target != null) {
    if (origin.constructor !== target.constructor) {
      return false;
    }
    if (origin.constructor === Array && origin.length != target.length) {
      return false;
    }

    if (
      origin.constructor === Object &&
      Object.keys(target).join(",") != Object.keys(origin).join(",")
    ) {
      return false;
    }
    let res = true;
    for (let key in target) {
      if (res && !compareObject(origin[key], target[key])) {
        res = false;
        return;
      }
    }
    return res;
  } else {
    return origin === target;
  }
}

/**获取momenttime */
export function getMomentTimeByString(
  value: string,
  format: string = "YYYY-MM-DD HH:mm"
): Moment | undefined {
  const time =
    value === "" || value == null ? undefined : moment(value, format);
  return time;
}

/**用于将数组class，条件筛选后输出class string */
export function classNames(arr: any[]): string {
  const classNames = arr.filter(Boolean);
  return classNames.join(" ");
}

/**用于页面按钮过滤*/
export function fileterButtonByPower(arr: any[]): any[] {
  const btnList = storeApp.perimissions;
  return arr.filter(btn => {
    return !btn.authCode || !btnList || btnList[btn.authCode];
  });
}

/**用于页面单个按钮控制显示或隐藏*/
export function fileterSignButton(authCode: string) {
  const btnList = storeApp.perimissions;
  return btnList[authCode] ? true : false;
}

/**获取当前系统的菜单信息 */
export function getSystemMenu(arr, parentKey) {
  let menuPerimissions = {};
  let menus: any = { childrenKeys: [] }; //菜单变量加上子项键的数组
  let perimissions = {}; //接口
  let btnType = ["RESOURCE_INNER_LINK", "RESOURCE_BLANK_LINK"];
  arr.forEach(ele => {
    if (btnType.indexOf(ele.type) > -1) {
      let { text, type, customId } = ele;
      perimissions[customId] = { text, type };
    } else {
      let { type, text, customId, url, icon, items } = ele;
      let item = { type, text, customId, url, icon };
      let key: any = customId;
      if (items && items.length > 0) {
        let obj = getSystemMenu(items, key);
        menuPerimissions = { ...menuPerimissions, ...obj.menuPerimissions };
        if (obj.menus.childrenKeys.length > 0) {
          Object.assign(item, obj.menus);
        }
        if (Object.keys(obj.perimissions).length > 0) {
          Object.assign(perimissions, obj.perimissions);
        }
      }
      menuPerimissions[key] = parentKey;
      menus.childrenKeys.push(key);
      menus[key] = item;
    }
  });
  return { menus, menuPerimissions, perimissions };
}
/**初始化树形结构菜单数据 */
export function initTreePageData<T>(
  arr: T[],
  key: string,
  option: { id: string } = { id: "id" }
) {
  let newArr: T[] = [];
  let expandArr: T[] = [];
  arr.forEach((item: any) => {
    if (item.isExpand) {
      expandArr.push(item[option.id]);
    }
    if (item[key].length == 0) {
      delete item[key];
      newArr.push(item);
    } else {
      let data: any = initTreePageData<T>(item[key], key);
      item[key] = data.newArr;
      expandArr = expandArr.concat(data.expandArr);
      newArr.push(item);
    }
  });
  return { newArr, expandArr };
}

/**数组根据索引交互元素位置*/
export function arrExchangeIndex(list: any[], startIndex, endIndex): any[] {
  const result: any[] = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
}
