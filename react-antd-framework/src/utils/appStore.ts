import { RoutePowerObject } from "../routes/routes";

//let systemInfo:any= { menus: menusInfo, menusTreeLinkObject: menusTreeLinkObject, pageAuthKeyObject: RoutePowerObject };
//系统信息
//let systemOption: any = {};

//修改系统信息
// export function setSystemInfo(newInfo) {
//   newInfo.systemInfo.pageAuthKeyObject = RoutePowerObject;
//   systemOption = newInfo;
// }

// export function getSystemInfo() {
//   return systemOption;
// }

//menus

//perimissions 权限

//service: IService
interface IAuthorization {
  accessToken: string;
  accessTokenExpireTime: string;
  refreshToken: string;
  refreshTokenExpireTime: string;
}
interface IService {
  [name: string]: string;
}
interface IUserInfo {
  department?: string;
  id?: string;
  jobNumber?: string;
  name?: string;
  otherInformation?: string;
  phone?: string;
  title?: string;
  username?: string;
}
export interface IAppStore {
  /** 菜单 */
  menus?: any;

  /** 用户按钮权限集合 */
  perimissions?: IService;

  /** 用户信息 */
  userInfo?: IUserInfo;

  /** 路由与菜单管联集合 */
  routePerimissionsMap?: IService;

  /** 菜单权限集合 */
  menuPerimissions?: IService;

  /** 用户认证信息 */
  authorization?: IAuthorization;

  /** 后端服务器地址集合 */
  service?: IService;
}

class AppStores implements IAppStore {
  public menus: any;

  public perimissions: IService;

  public userInfo: IUserInfo;

  public routePerimissionsMap: IService = RoutePowerObject;

  public menuPerimissions: IService;

  public authorization: IAuthorization;

  public service: IService;

  public init = (item: IAppStore) => {
    const self = this;
    Object.keys(item).forEach(key => {
      self[key] = item[key];
    });
  };
}

// class AppStore {
//   public systemOptions: any = { Authorization: {} };
//   public setSystemInfo = newInfo => {
//     newInfo.systemInfo.pageAuthKeyObject = RoutePowerObject;
//     this.systemOptions = newInfo;
//   };
// }

const appStore = new AppStores();

export default appStore;
