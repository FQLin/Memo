# [`Linux On SQL Server`](https://docs.microsoft.com/zh-cn/sql/linux/sql-server-linux-configure-mssql-conf?view=sql-server-linux-ver15)

[默认的 数据库文件目录位置](https://docs.microsoft.com/zh-cn/sql/linux/sql-server-linux-configure-mssql-conf?view=sql-server-linux-ver15#masterdatabasedir):`/var/opt/mssql/data`

```bash
# pull image
docker pull registry.cn-hangzhou.aliyuncs.com/newbe36524/server:2019-latest
# 创建容器
docker run --name mssql -e "ACCEPT_EULA=Y" -e "SA_PASSWORD=Abc123456." -p 11433:1433 --rm -d registry.cn-hangzhou.aliyuncs.com/newbe36524/server:2019-latest

docker exec -it mssql bash

docker-compose -f clustermssqldocker-compose.yaml up -d
```



```yaml
version: "3.8"
services:
  mssql01:
    restart: always
    image: registry.cn-hangzhou.aliyuncs.com/newbe36524/server:2019-latest
    container_name: SQLServer01
    ports:
      - "11430:1433"
    environment:
      ACCEPT_EULA: "Y"
      SA_PASSWORD: "Abc123456."
      MSSQL_PID: "Developer"
    volumes:
      - "/f/docker-compose/mssql01/data:/var/opt/mssql/data"
  mssql02:
    restart: always
    image: registry.cn-hangzhou.aliyuncs.com/newbe36524/server:2019-latest
    container_name: SQLServer02
    ports:
      - "11431:1433"
    environment:
      ACCEPT_EULA: "Y"
      SA_PASSWORD: "Abc123456."
      MSSQL_PID: "Developer"
    volumes:
      - "/f/docker-compose/mssql02/data:/var/opt/mssql/data"
  mssql03:
    restart: always
    image: registry.cn-hangzhou.aliyuncs.com/newbe36524/server:2019-latest
    container_name: SQLServer03
    ports:
      - "11432:1433"
    environment:
      ACCEPT_EULA: "Y"
      SA_PASSWORD: "Abc123456."
      MSSQL_PID: "Developer"
    volumes:
      - "/f/docker-compose/mssql03/data:/var/opt/mssql/data" 
```

