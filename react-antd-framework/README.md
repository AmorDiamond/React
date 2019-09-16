# 商品中心

## 项目相关

该项目为重构项目，产品并没有设计详细的原型图，具体功能需要参照已经上线的项目

### java 开发后台

[http://10.4.100.160:8080/swagger-ui.html#/](服务器开发地址)


### 原型图在线地址

[https://bgr33l.axshare.com/](密码: 1919)

## 项目结构

```
qrcode
├── README.md
├── .....
└── src
    ├── api
    ├── assets
    ├── framework      // 组件库
        ├── component  // 公用组件
        ├── ui         // 页面组成组件
    ├── pages          // 页面组件
    ├── routes         // 路由文件
        ├──routes.tsx  // 路由管理文件
    ├── stores         // 公用仓库
    ├── styles         // 公用样式
    ├── types          // 公用类型
        ├── components // 公用组件类型
    └── utils          // 工具类
        ├──menusTest.tsx   // 模拟菜单地址
```

## 目录名称

```
├── pages                //页面组件
    ├──GoodsManage       // 商品管理
   ├── example              //示例中心
       ├──Form                // 表单
         ├──Filter              // 检索表单 
         ├──AutoForm            // 普通表单 
         ├──SelfForm            // 自定义表单   
      ├──Table                // 表格
         ├──BaseTable           // 普通表格 
         ├──ButtonTable         // 带按钮列表
         ├──SelfColumnTable     // 自定义列表

```

## 路径别名检索

'@': src 目录,  
'@ul': src/framework/ui 目录,  
'@component': src/framework/component 目录,


