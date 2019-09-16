import React from "react";
import { Button, Row, Form, Input, notification, Icon } from "antd";
import ajaxData from "../../utils/http";
// import { RoutePowerObject } from "../../routes/routes";
import "./Login.less";
import { example } from "@/utils/menusTest";
import { loginInfo, Authorization } from "@/utils/login";

const getSystemMenu = (arr, parentKey) => {
  let pageKeyObject = {};
  let menus = { childrenKeys: [] }; //菜单变量加上子项键的数组
  let btnlist = {}; //接口
  let btnType = ["RESOURCE_INNER_LINK", "RESOURCE_BLANK_LINK"];
  arr.forEach(ele => {
    if (btnType.indexOf(ele.type) > -1) {
      let { text, type, customId } = ele;
      btnlist[customId] = { text, type };
    } else {
      let { type, text, customId, url, icon, items } = ele;
      let item = { type, text, customId, url, icon };
      let key = customId;
      if (items && items.length > 0) {
        let obj = getSystemMenu(items, key);
        pageKeyObject = { ...pageKeyObject, ...obj.pageKeyObject };
        if (obj.menus.childrenKeys.length > 0) {
          Object.assign(item, obj.menus);
        }
        if (Object.keys(obj.btnlist).length > 0) {
          Object.assign(btnlist, obj.btnlist);
        }
      }
      pageKeyObject[key] = parentKey;
      menus.childrenKeys.push(key);
      menus[key] = item;
    }
  });
  return { menus, pageKeyObject, btnlist };
};

const FormItem = Form.Item;
let prefix = "";

//开发环境
// prefix = "http://10.10.10.133:25102";
//测试环境
prefix = "https://uaa-test.1919.cn:5443";

//生产环境
//prefix = "https://manage.1919.cn:5443";

class Login extends React.Component {
  state = {
    times: 0,
    errorMes: "",
    verifyCode: {}
  };
  UNSAFE_componentWillMount() {
    this.verifyCodeFn();
  }

  //获取验证码
  verifyCodeFn = () => {
    ajaxData.get(prefix + "/api/uaa/uaa/sso/ssoCode").then(data => {
      this.setState({ verifyCode: data });
    });
  };

  getAuth = ({ Authorization }) => {
    ajaxData
      .post(
        prefix + "/my/info",
        {},
        { headers: { Authorization: Authorization.accessToken } }
      )
      .then(authInfo => {
        authInfo.generalMenus = [example];
        let { profile, generalMenus, authorities, urls } = authInfo;
        if (generalMenus == null || generalMenus.length === 0) {
          notification["error"]({
            message: `系统消息`,
            description: "账号暂无角色，请联系管理员添加角色！"
          });
        } else {
          let { menus, pageKeyObject, btnlist } = getSystemMenu(
            generalMenus,
            ""
          );

          if (menus.childrenKeys.length === 0) {
            notification["error"]({
              message: `系统消息`,
              description: "账号拥有角色暂无权限，请联系管理员添加权限！"
            });
          } else {
            sessionStorage.setItem(
              "Authorization",
              JSON.stringify(Authorization)
            );
            sessionStorage.setItem(
              "originSystemInfo",
              JSON.stringify(authInfo)
            );
            sessionStorage.setItem("systemSelectKey", menus.childrenKeys[0]);
            sessionStorage.setItem(
              "systemInfo",
              JSON.stringify({
                menus,
                pageKeyObject,
                userInfo: profile,
                btnlist,
                authorities
              })
            );
            sessionStorage.setItem("urls", JSON.stringify(urls));
            window.location.reload();
          }
        }
      });
  };

  forgetPassword = () => {
    notification["warning"]({
      message: `系统消息`,
      description: "请联系管理员重置密码!"
    });
  };

  handleOk = () => {
    let _this = this;
    // this.props.form.validateFieldsAndScroll((errors, values) => {
    //   if (!errors) {
    //     let { ...user } = values;
    //     let { verifyCode } = _this.state;
    //     user.uuid = verifyCode && verifyCode.uuid;
    //     _this.setState({ errorMes: "" });
    //     ajaxData.post(prefix + "/api/uaa/uaa/sso/ssoLogin", user).then(data => {
    //       _this.accessTokenFn(data.ticket);
    //     });
    //   }
    // });
    let authInfo = loginInfo;
    let { profile, generalMenus, authorities, urls } = loginInfo;

    if (generalMenus == null || generalMenus.length === 0) {
      notification["error"]({
        message: `系统消息`,
        description: "账号暂无角色，请联系管理员添加角色！"
      });
    } else {
      let { menus, pageKeyObject, btnlist } = getSystemMenu(generalMenus, "");

      if (menus.childrenKeys.length === 0) {
        notification["error"]({
          message: `系统消息`,
          description: "账号拥有角色暂无权限，请联系管理员添加权限！"
        });
      } else {
        sessionStorage.setItem("Authorization", JSON.stringify(Authorization));
        sessionStorage.setItem("originSystemInfo", JSON.stringify(authInfo));
        sessionStorage.setItem("systemSelectKey", menus.childrenKeys[0]);
        sessionStorage.setItem(
          "systemInfo",
          JSON.stringify({
            menus,
            pageKeyObject,
            userInfo: profile,
            btnlist,
            authorities
          })
        );
        sessionStorage.setItem("urls", JSON.stringify(urls));
        window.location.reload();
      }
    }
  };

  //更新accessToken
  accessTokenFn = ticket => {
    ajaxData.get(prefix + `/login?ticket=${ticket}`).then(data => {
      window.Authorization = data;
      this.getAuth({ Authorization: data });
    });
  };

  render() {
    let {
      form: { getFieldDecorator }
    } = this.props;
    let { verifyCode } = this.state;

    return (
      <div className='login-page'>
        <header className='page-header'>
          <div className='header-left'>
            <div className='header-logo' />
            <div className='line' />
            <div className='system-name'>1919管理平台</div>
          </div>
        </header>
        <div className='login-content'>
          <div className='login-warp'>
            <div className='warp-title'>
              <span>欢迎使用1919管理平台</span>
            </div>

            <div className='error-mess'>{this.state.errorMes}</div>

            <form>
              <FormItem hasFeedback>
                {getFieldDecorator("username", {
                  initialValue: "web",
                  rules: [
                    {
                      required: true,
                      message: "用户名不能为空"
                    }
                  ]
                })(
                  <Input
                    prefix={<Icon type='user' />}
                    onPressEnter={() => {
                      this.handleOk();
                    }}
                    placeholder='请输入用户名'
                  />
                )}
              </FormItem>
              <FormItem hasFeedback>
                {getFieldDecorator("password", {
                  initialValue: "Web123456",
                  rules: [
                    {
                      required: true,
                      message: "请输入登录密码"
                    }
                  ]
                })(
                  <Input
                    type='password'
                    prefix={<Icon type='lock' />}
                    onPressEnter={() => {
                      this.handleOk();
                    }}
                    placeholder='请输入登录密码'
                  />
                )}
              </FormItem>
              <FormItem hasFeedback={false}>
                {getFieldDecorator("vercode", {
                  initialValue: "isdfjjsdfdd",
                  rules: [
                    {
                      required: true,
                      message: "请输入验证码"
                    }
                  ]
                })(
                  <div className={"verify"}>
                    <Input
                      onPressEnter={() => {
                        this.handleOk();
                      }}
                      placeholder='请输入验证码'
                    />
                    <img
                      alt='加载中'
                      onClick={() => this.verifyCodeFn()}
                      src={(verifyCode && verifyCode.srcBase64) || null}
                    />
                  </div>
                )}
              </FormItem>

              <Row>
                <Button
                  type='primary'
                  onClick={() => {
                    this.handleOk();
                  }}
                >
                  登 录
                </Button>
              </Row>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Form.create()(Login);
