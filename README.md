# Gengar

## 一 Mysql 设置

### 1. 创建角色 & 给予权限

```
create user 'satoshi'@'localhost' identified by '150386';
grant all on *.* to 'satoshi'@'localhost';
```

### 2. 创建数据库

```
CREATE DATABASE IF NOT EXISTS gengar DEFAULT CHARSET utf8 COLLATE utf8_general_ci;
```

### 3. 创建数据表

```
 drop table if exists users;

    CREATE TABLE IF NOT EXISTS `users`(
   `id` INT UNSIGNED AUTO_INCREMENT,
   `name` VARCHAR(30) NOT NULL,
   `password` VARCHAR(60) NOT NULL,
   `salt` VARCHAR(20) NOT NULL,
   `status` TINYINT NOT NULL DEFAULT 0,
   PRIMARY KEY ( `id` )
)ENGINE=InnoDB DEFAULT CHARSET=utf8;
```

## 二 内容

- Jwt 登陆验证
- 链接 Mysql 的 DAO 层
- 用户 CRUD 
- 中间件拦截 request
- 拦截器拦截 response
- 拦截器规范化返回值结构
- 过滤器处理全局错误
- 日志记录系统
- Axios 请求
- Swagger UI 


## 三 杂七杂八

### 1. windows 版代码运行时登陆失败的解决方式

以管理员权限启动 cmd.exe，进入 mysql 中运行以下命令：

```
alter user 'satoshi'@'localhost' identified with mysql_native_password by '150386';

flush privileges;
```

> 去你妹的 windows


## 四 参考 & 致谢

- [Nestjs 官方](https://nestjs.com/)
- [Nestjs 中文](https://docs.nestjs.cn/)
- [Nest.js 从零到壹系列](https://juejin.cn/post/6844904096017678343)，作者：[布拉德特皮](https://juejin.cn/user/2313028194292925)。
- [Advanced NestJS techniques](https://itnext.io/advanced-nestjs-techniques-part-1-custom-decorators-aa6d7f85c5b6)，作者：[Matthieu Balmes](https://medium.com/@paztek)
- [Nestjs 连接 mysql 数据库](https://blog.csdn.net/lxy869718069/article/details/103408695)，作者：[墨水白云](https://blog.csdn.net/lxy869718069)