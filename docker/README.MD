Windows Containers的Settings是没有FILE SHARING(shared drivers)的

[CLI文档](https://docs.docker.com/engine/reference/commandline/docker/)

> 重启docker
systemctl restart docker

> bash进入容器内部
docker exec -it mysql1 bash 



```bash
docker volume ls

docker rm -f $(docker ps -q)

docker image rm -f $(docker images --filter "since=nginx" -q)

docker cp mynginx:/var/log/nginx f:\docker\var\log\nginx

# veth-pair 一对的虚拟设备接口，都是成对出现，一段连着协议，一段彼此相连

# 查看网络信息
docker network inspect bridge
# docker默认使用 bridge --net bridge
```

### `Win10`路由表

```cmd
#
route print
```

### `Link`

```cmd
# 通过link可以让tomcat03连通tomcat02，但是tomcat02无法连通Tomcat03
PS C:\Users\fanqi> docker run -d -P --name tomcat03 --link tomcat02 tomcat
# 其实就是hosts配置操作
```

### 自定义网络

```cmd
PS C:\Users\fanqi> docker network create --driver bridge --subnet 192.168.0.0/16 --gateway 192.168.0.1 netlearn
PS C:\Users\fanqi> docker network ls
NETWORK ID          NAME                     DRIVER              SCOPE
...
52415fa869ea        netlearn                 bridge              local
...
# 创建测试容器
PS C:\Users\fanqi> docker run -d -P --name tomcat-net-01 --net netlearn tomcat
cafc6626e98cf9159a67923b38dbb491aaf143fad70c2e494b7ecf33003fea53
PS C:\Users\fanqi> docker run -d -P --name tomcat-net-02 --net netlearn tomcat
e1d0dfba38ade9e30ab3737c59779b42504a4a3ee600534495ceda73465f433a
# 可以相互连通
PS C:\Users\fanqi> docker exec -it tomcat-net-01 ping 192.168.0.3
PING 192.168.0.3 (192.168.0.3) 56(84) bytes of data.
...

PS C:\Users\fanqi> docker exec -it tomcat-net-01 ping tomcat-net-02
PING tomcat-net-02 (192.168.0.3) 56(84) bytes of data.
...

# 打通 bridge 到 netlearn 一个容器，两个IP
PS C:\Users\fanqi> docker network connect netlearn tomcat01
```

