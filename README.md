# slsdays_demo Serverless 全栈应用实践

操作场景

该demo 可以快速部署一个基于 node + eleventy + MySQL 的全栈 Serverless 应用。主 要包含以下组件：
Serverless RESTful API：通过云函数和 API 网关构建实现 RESTful API。
Serverless 静态网站：前端通过托管 eleventy 静态页面到 COS 对象存储中。
MySQL：通过引用 MySQL 为全栈网站提供数据库服务。

前提条件

已安装 Node.js（Node.js 版本需不低于 8.6，建议使用 Node.js10.0 及以上版本）

操作步骤

安装

通过 npm 全局安装 Serverless Framework：
$ npm install -g serverless
如果之前您已经安装过 Serverless Framework，可以通过下列命令升级到最新版：
$ npm update -g serverless
安装完毕后，通过运行 serverless -v 命令，查看 Serverless Framework 的版本信息， 确保版本信息不低于以下版本：
$ serverless –v
Framework Core: 1.67.3
Plugin: 3.6.6
SDK: 2.3.0
Components: 2.30.1

配置

1.新建一个本地文件夹，使用create --template-url命令，下载相关 template。

serverless create --template-url https://github.com/canmengfly/slsdays_demo

2.在项目模板中找到.env.example 文件，修改名称为.env，并在其中配置对应的腾讯云 SecretId 和 SecretKey 信息、地域可用区及子网等信息。
.env
TENCENT_SECRET_ID=xxx  // 您账号的SecretId
TENCENT_SECRET_KEY=xxx // 您账号的SecretKey
地域可用区配置
REGION=ap-beijing //资源部署区，该项目中指云函数与静态页面部署区
说明：
如果没有腾讯云账号，请先 注册新账号。
如果已有腾讯云账号，请保证您的账号已经授权了 AdministratorAccess 权限。 您可以 在 API 密钥管理 中获取 SecretId 和 SecretKey。

部署

1.执行以下命令进行部署.
$ sls deploy --all
serverless ⚡ framework

fullstack-frontend: 
  region:        ap-guangzhou
  website:       https://fullstack-serverless-slsdays-1251746107.cos-website.ap-guangzhou.myqcloud.com
  vendorMessage: null

fullstack-serverless-slsdays: 
  FunctionName:  fullstack-serverless-slsdays
  Description:   Created by serverless component
  Namespace:     default
  Runtime:       Nodejs10.15
  Handler:       index.main_handler
  MemorySize:    128
  triggers: 
    apigw: 
      - https://service-l1sf15ya-1251746107.gz.apigw.tencentcs.com/release/
  vendorMessage: null
12s › slsdays › Success

部署成功后，您可以使用浏览器访问项目产生的 website 链接，就可以看到生成的网站了 。

