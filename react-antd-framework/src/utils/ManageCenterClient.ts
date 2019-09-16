import _ from "lodash";
import ajaxData from "./http";
import appStore from "./appStore";


export enum MessageTypes {
  RefreshToken = "ReFreshAuth",
  GetLoginInfo = "LoginInfo",
  GetOriginLoginInfo = "OriginLoginInfo",
  LoginOut = "LoginOut"
}

export interface IMessage {
  type: MessageTypes;
}

function getUrl() {
  let baseURL = "https://web-test.1919.cn";
  switch (process.env.REACT_APP_ENV) {
    // case "local":
    //   baseURL = "http://192.168.0.10";
    //   break;
    case "dev":
      baseURL = "http://web-test.1919.cn";
      break;
    case "test":
      baseURL = "https://web-test.1919.cn";
      break;
    case "prod":
      baseURL = "https://manage.1919.cn";
      break;
  }
  return baseURL;
}
//正式或模拟正式环境使用
class ManageCenterClient {
  private listens = {};

  //public centerUrl: string = "";
  //本地
  //public centerUrl: string = "http://localhost:3200";
  //开发环境
  public centerUrl: string = getUrl();
  //测试环境
  // public centerUrl: string = 'https://web-test.1919.cn';
  //生产环境
  // public centerUrl: string = 'https://manage.1919.cn';

  constructor() {
    //this.centerUrl = centerUrl;
    window.addEventListener("message", this.messageHandler);
    window.onhashchange = e => {
      const hash = window.location.hash;
      if (hash !== "#/") {
        const message = { type: "ChangeUrl", data: window.location.href };
        this.sendMessageToCenter(message);
      }
    };
  }

  public sendMessage(message: IMessage, callback): void {
    if (!_.isFunction(callback)) {
      throw new Error("callback 必须是一个方法");
    }
    this.listens[message.type] = callback;
    this.sendMessageToCenter(message);
  }

  private messageHandler = event => {
    const message = event.data;
    const origin = event.origin || event.originalEvent.origin;
    if (origin !== this.centerUrl) {
      return false;
    }
    if (this.listens[message.type]) {
      this.listens[message.type](message.data);
      delete this.listens[message.type];
    }
  };

  private sendMessageToCenter(message) {
    window.parent.postMessage(message, this.centerUrl);
  }
}

//本地开发使用
class devManageCenterClient {
  private listens = {};
  public centerUrl: string = "";

  public sendMessage(message: IMessage, callback): void {
    if (!_.isFunction(callback)) {
      throw new Error("callback 必须是一个方法");
    }
    this[message.type](callback);
  }

  public LoginInfo = callback => {
    const object: any = {};
    if (sessionStorage.getItem("systemInfo")) {
      object.urls = JSON.parse(sessionStorage.getItem("urls") || "");
      object.Authorization = JSON.parse(sessionStorage.getItem("Authorization") || "");
      object.systemInfo = JSON.parse(sessionStorage.getItem("systemInfo") || "");
      //object.systemInfo.deliver = menusInfo;
    }
    callback(object);
  };

  public OriginLoginInfo = callback => {
    const object: any = {};
    if (sessionStorage.getItem("systemInfo")) {
      object.urls = JSON.parse(sessionStorage.getItem("urls") || "");
      object.Authorization = JSON.parse(sessionStorage.getItem("Authorization") || "");
      object.systemInfo = JSON.parse(sessionStorage.getItem("originSystemInfo") || "");
      //object.systemInfo.generalMenus.push(deliver);
    }
    callback(object);
  };

  public LoginOut = callback => {
    sessionStorage.clear();
    window.location.reload();
  };

  public ReFreshAuth = callback => {
    const prefix = "http://10.10.10.133:25102";
    ajaxData.post(prefix + "/token/refresh", appStore.authorization).then(res => {
      callback(res);
    });
  };
}

export default (process.env.NODE_ENV == "development" && !process.env.REACT_APP_TYPE ? new devManageCenterClient() : new ManageCenterClient());
