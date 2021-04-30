
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
   `pwd` VARCHAR(60) DEFAULT '',
   `status` TINYINT NOT NULL DEFAULT 0,
   PRIMARY KEY ( `id` )
)ENGINE=InnoDB DEFAULT CHARSET=utf8;
```