debian ssh 开启root远程登录

```shell
vi /etc/ssh/sshd_config
# PermitRootLogin yes
service sshd restart
```

[static ip](https://www.cnblogs.com/liuyi778/p/12771084.html)
[debian 11 国内源](https://www.cnblogs.com/liuguanglin/p/debian11_repo.html)
更新源之后会出现会出现`The certificate is NOT trusted`错误，[解决办法](https://blog.csdn.net/Chaowanq/article/details/121559709)


``` shell
# 查看 Debian 版本号
 cat os-release
# 更新 apt 源
# https://www.cnblogs.com/liuguanglin/p/debian11_repo.html

```