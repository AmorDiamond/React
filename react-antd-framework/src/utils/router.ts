import appStore from "./appStore";



//根本页面路由获取页面的菜单键
export const getPageKeyByPath = (path, pageAuthKeyObject): string => {
  let arr = path.split("/");
  if (pageAuthKeyObject == null) {
    pageAuthKeyObject = appStore.routePerimissionsMap;
  }
  let pageKey = arr.join("_");
  let i = 0; //限制循环次数防止死循环
  //查找当前路由在页面权限路由对象中的键,如果未查找到返回路由的第一个关键字
  while (pageAuthKeyObject[pageKey] == null && arr.length > 1 && i < 100) {
    i++;
    if (arr[arr.length - 1] != "") {
      arr[arr.length - 1] = "";
    } else {
      arr.pop();
    }
    pageKey = arr.join("_");
  }
  return pageKey;
};
/**通过页面的键获取页面对应的菜单键 */
export const getPageMenuKeyByPageKey = (pageKey, pageAuthKeyObject) => {
  if (pageAuthKeyObject == null) {
    pageAuthKeyObject = appStore.routePerimissionsMap;
  }
  let i = 0; //限制循环次数防止死循环
  let pageAuthKey = pageKey;
  //查找当前路由对应的 菜单页键
  while (pageAuthKeyObject.hasOwnProperty(pageAuthKey) && i < 100) {
    i++;
    pageAuthKey = pageAuthKeyObject[pageAuthKey];
  }
  return pageAuthKey;
};
//通过页面对应菜单键获取当前页面在菜单中所有上级菜单的键
export const getMenuKeysByPageMenuKey = (pageMenuKey, menusTreeLinkObject): string[] => {
  if (menusTreeLinkObject == null) {
    menusTreeLinkObject = appStore.menuPerimissions;
  }
  let menus: string[] = [];
  let i = 0; //限制循环次数防止死循环
  let menuKey = pageMenuKey;
  //查找菜单页及菜单页对应的模块的键
  while (menusTreeLinkObject.hasOwnProperty(menuKey) && i < 100) {
    i++;
    menus.push(menuKey);
    menuKey = menusTreeLinkObject[menuKey];
  }
  menus.reverse();
  return menus;
};
//根据路由获取页面菜单选中项
export const getSelectMenusByRouter = path => {
  let pageAuthKeyObject = appStore.routePerimissionsMap;
  let menusTreeLinkObject = appStore.menuPerimissions;
  let pageKey = getPageKeyByPath(path, pageAuthKeyObject);
  //查找当前路由对应的 菜单页键
  let pageMenuKey = getPageMenuKeyByPageKey(pageKey, pageAuthKeyObject);
  //查找菜单页及菜单页对应的模块的键
  let menus = getMenuKeysByPageMenuKey(pageMenuKey, menusTreeLinkObject);
  return menus;
};
