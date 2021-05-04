
## 数据库

### 创建角色 & 给予权限

```
create user 'satoshi'@'localhost' identified by '150386';
grant all on *.* to 'satoshi'@'localhost';
```

### 创建数据库

```
CREATE DATABASE IF NOT EXISTS gengar DEFAULT CHARSET utf8 COLLATE utf8_general_ci;
```

### 创建数据表

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

### 增加 script

```
 "db": "rm -rf entities & npx typeorm-model-generator -h localhost -d testdabase -p 3306 -u root -x root -e mysql -o entities --noConfig true --ce pascal --cp camel"
```

#### windows 版本登陆失败的解决方式

以管理员权限启动 cmd.exe，进入 mysql 中运行以下命令：

```
create user 'satoshi'@'localhost' identified by '150386'

grant all on *.* to 'satoshi'@'localhost';

alter user 'satoshi'@'localhost' identified with mysql_native_password by '150386';

flush privileges;
```

> 去你妹的 windows
