# [`Linux On SQL Server`](https://docs.microsoft.com/zh-cn/sql/linux/sql-server-linux-configure-mssql-conf?view=sql-server-linux-ver15)

[默认的 数据库文件目录位置](https://docs.microsoft.com/zh-cn/sql/linux/sql-server-linux-configure-mssql-conf?view=sql-server-linux-ver15#masterdatabasedir):`/var/opt/mssql/data`

```bash
# pull image
docker pull registry.cn-hangzhou.aliyuncs.com/newbe36524/server:2019-latest
# 创建容器
docker run --name mssql -e "ACCEPT_EULA=Y" -e "SA_PASSWORD=Abc123456." -p 11433:1433 --rm -d registry.cn-hangzhou.aliyuncs.com/newbe36524/server:2019-latest

docker exec -it mssql bash


```



