#安装

```
使用nodejs安装npm

npm install gulp --save-dev  

--save-dev 添加到项目开发的依赖

npm init

or 添加 gulp

  "devDependencies": {
    "gulp": "^3.9.1"
  }

 then 
 npm install 


```
项目是利用docker容器与daocloud部署在阿里云的云服务器ECS
上线方式：通过git hook，检测github的tag版本变化，自动更新部署新的代码。
项目架构：淘宝的sui框架 gulp bower

* 介绍10个JavaScript的开发技巧
* 分享一下someet目前架构
* 想通过，项目环境搭建，自动部署，版本控制，结合gulp，包管理bower，让大家感受一下开发流。
* 工作流程介绍，介绍一些工作协同软件teambition 瀑布 quip
* 实战项目是移动端无线滚动 ，点击进入详情页面 ，点击返回可以记录之前的浏览位置。
* 分享几个自己总结的观念