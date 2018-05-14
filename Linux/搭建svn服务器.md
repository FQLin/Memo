# 搭建svn服务器

`Linux`

---

### 1.安装 SVN 服务端


安装 Subversion

Subversion 是一个版本控制系统，相对于的 RCS 、 CVS ，采用了分支管理系统，它的设计目标就是取代 CVS 。
```c++
yum install -y subversion
```
测试安装是否成功：
```c++
$ svnserve --version
```
### 2.创建 SVN 版本库
创建svn数据目录 subversion 默认是把 /var/svn 作为数据根目录的，开机启动默认也是从这里
```c++
 mkdir -p /data/svn/myproject
```
创建项目版本库
```c++
 svnadmin create /data/svn/myproject
```
删除项目版本库
```c++
 rm -rf /data/svn/myproject
```

### 3.配置 SVN 信息

每个版本库创建之后都会生成svnserve.conf主要配置文件

配置文件简介

版本库中的配置目录 conf 有三个文件:

> * authz 是权限控制文件
> * passwd 是帐号密码文件
> * svnserve.conf 是SVN服务综合配置文件

配置权限配置文件 authz

现在请 编辑 authz ，内容参考如下：
**示例代码：/data/svn/myproject/conf/authz**
```java
[groups]
#用户组
admin = admin,root,test #admin为用户组,等号之后的admin为用户
#用户组所对应的用户
[/] #表示根目录
#库目录权限
@admin = rw         
#用户组权限
*=r               
#非用户组权限
```
配置账号密码文件 passwd

现在请 编辑 passwd ，内容参考如下：
**示例代码：/data/svn/myproject/conf/passwd**
```c++
[users]
# harry = harryssecret
# sally = sallyssecret
admin = 123456
root = 123456
test = 123456
```
配置 SVN 服务综合配置文件 svnserve.conf

现在请 编辑 svnserve.conf ，内容参考如下：
**示例代码：/data/svn/myproject/conf/svnserve.conf**
```c++
[general]
# force-username-case = none
# 匿名访问的权限 可以是read、write，none，默认为read
anon-access = none
#使授权用户有写权限
auth-access = write
#密码数据库的路径
password-db = passwd
#访问控制文件
authz-db = authz
#认证命名空间，SVN会在认证提示里显示，并且作为凭证缓存的关键字
realm = /data/svn/myproject

[sasl]
```
### 4.启动 SVN 服务


启动 SVN
```c++
# -d : 守护进程  -r : svn数据根目录
svnserve -d -r /data/svn
```
查看svn服务
```c++
ps aux |grep svnserve #默认端口号为：3690
```
设置开机启动
```c++
systemctl enable svnserve.service #注意：根目录必须是/var/svn 这样才能设置成功！！
```
开启、停止服务
```c++
$ sudo systemctl start svnserve.service
$ sudo systemctl stop svnserve.service
```
checkout SVN项目
```c++
mkdir -p /data/workspace/myproject
svn co svn://127.0.0.1/myproject /data/workspace/myproject --username root --password 123456 --force --no-auth-cache
```
提交文件到 SVN 服务器

从本地提交文件到 SVN 服务器，其中 `root` 密码为 `/data/svn/myproject/conf/passwd` 文件存储的密码
```c++
cd /data/workspace/myproject
echo test >> test.txt
svn add test.txt
svn commit test.txt -m 'test'
```
提交成功后可以通过如下命令从本地项目删除文件
```c++
cd /data/workspace/myproject
rm -rf test.txt
```
删除后可以通过 SVN 服务器恢复
```c++
cd /data/workspace/myproject
svn update
```

[参考](https://cloud.tencent.com/developer/labs/lab/10192)
