# [`Linux On SQL Server`](https://docs.microsoft.com/zh-cn/sql/linux/sql-server-linux-configure-mssql-conf?view=sql-server-linux-ver15)

[默认的 数据库文件目录位置](https://docs.microsoft.com/zh-cn/sql/linux/sql-server-linux-configure-mssql-conf?view=sql-server-linux-ver15#masterdatabasedir):`/var/opt/mssql/data`

[在线安装](https://docs.microsoft.com/zh-cn/sql/linux/quickstart-install-connect-red-hat?view=sql-server-linux-ver15)

[脱机安装](https://docs.microsoft.com/zh-cn/sql/linux/sql-server-linux-setup?view=sql-server-linux-ver15)

```bash
# 配置文件
/var/opt/mssql/mssql.conf
# pull image
docker pull registry.cn-hangzhou.aliyuncs.com/newbe36524/server:2019-latest
# 创建容器
docker run --name mssql -e "ACCEPT_EULA=Y" -e "SA_PASSWORD=Abc123456." -p 11433:1433 --rm -d registry.cn-hangzhou.aliyuncs.com/newbe36524/server:2019-latest

docker exec -it mssql bash

# 离线安装
https://packages.microsoft.com/rhel/8/mssql-server-2019/mssql-server-15.0.4053.23-2.x86_64.rpm

yum install -y python38 compat-openssl10 sudo
sudo alternatives --config python
sudo yum -y localinstall mssql-server-15.0.4053.23-2.x86_64.rpm
/opt/mssql/bin/mssql-conf setup

/opt/mssql/bin/sqlservr 
```

相关文档：https://github.com/microsoft/mssql-docker

https://www.redhat.com/en/blog/installing-microsoft-sql-server-red-hat-enterprise-linux-8-beta

https://docs.microsoft.com/zh-cn/sql/linux/sql-server-linux-troubleshooting-guide?view=sql-server-ver15

ccr.ccs.tencentyun.com/mcr_newbe36524/windows:1809_amd64

```powershell
$USER_AT_HOST="fanqinglin@119.28.53.243"
$PUBKEYPATH="$HOME\.ssh\id_rsa.pub"

$pubKey=(Get-Content "$PUBKEYPATH" | Out-String); ssh "$USER_AT_HOST" "mkdir -p ~/.ssh && chmod 700 ~/.ssh && echo '${pubKey}' >> ~/.ssh/authorized_keys && chmod 600 ~/.ssh/authorized_keys"

```