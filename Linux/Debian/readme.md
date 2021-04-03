debian ssh 开启root远程登录
```shell
vi /etc/ssh/sshd_config
# PermitRootLogin yes
service sshd restart
```