# SQL 语句知识点

将一个结果集放入变量中，变量的类型要声明为 `table`，例如：
```sql
declare @CourseIds table(Id varchar(32))

--一、修改字段默认值

alter table 表名 drop constraint 约束名字   ------说明：删除表的字段的原有约束

alter table 表名 add constraint 约束名字 DEFAULT 默认值 for 字段名称 -------说明：添加一个表的字段的约束并指定默认值

--二、修改字段名：

alter table 表名 rename column A to B

--三、修改字段类型：

alter table 表名 alter column UnitPrice decimal(18, 4) not null 

--四、修改增加字段：

alter table 表名 ADD 字段 类型 NOT NULL Default 0
```

参考：https://www.cnblogs.com/zhyue93/p/sql_1.html
