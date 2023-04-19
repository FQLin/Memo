Windows Containers 的 Settings 是没有 FILE SHARING(shared drivers)的

[CLI 文档](https://docs.docker.com/engine/reference/commandline/docker/)
[端口问题](https://github.com/docker/for-win/issues/3171)

> 重启 docker
> systemctl restart docker

> bash 进入容器内部
> docker exec -it mysql1 bash

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
## Docker 容器中运行Docker
在Docker中实现Docker的三种方法

> 1.通过挂载docker.sock（DooD方法）运行docker<br/>
> 2.dind 方法<br/>
> 3.Docker in Docker (DinD) / 使用Nestybox sysbox Docker运行时
### `DooD`

把`host`的`docker.socks`映射到容器内，这样容器内就可以直接使用`host`的`docker`服务。容器内看到的镜像和容器都是`host`上的。
#### windows docker 的`docker.socks`
- [How /var/run/docker.sock works for windows Docker?](https://stackoverflow.com/questions/56065185/how-var-run-docker-sock-works-for-windows-docker)
``` yml
volumes:
  - "/var/run/docker.sock:/var/run/docker.sock"
```
配置同样适用于`windows`，因为在 `Docker for Mac` 和 `Windows for Linux`会在虚拟机中创建Linux容器，`/var/run/docker.sock`使用的是虚拟机的卷。
## 修改已经存在的容器的配置
### 添加挂载
#### Windows
- [windows10下docker：给已存在的容器添加端口映射、目录映射的方法](https://blog.csdn.net/hhq163/article/details/123431061)

1. 容器配置文件位置：
``` powershell
# 容器的配置文件目录在
# \\wsl$\docker-desktop-data\version-pack-data\community\docker\containers
# 进入容器存放目录
cd \\wsl$\docker-desktop-data\version-pack-data\community\docker\containers
#唤起 Windows 资源管理器，从当前目录打开
explorer.exe .
```
2. 修改 `config.v2.json`

编辑 MountPoints 添加挂载
``` json
{
    "MountPoints": {
        "/var/run/docker.sock": {
            "Source": "/var/run/docker.sock",
            "Destination": "/var/run/docker.sock",
            "RW": true,
            "Name": "",
            "Driver": "",
            "Type": "bind",
            "Propagation": "rprivate",
            "Spec": {
                "Type": "bind",
                "Source": "/var/run/docker.sock",
                "Target": "/var/run/docker.sock"
            },
            "SkipMountpointCreation": false
        }
    }
}
```
3. 修改容器的`hostconfig.json`配置文件
编辑`Binds`数组，增加映射：
``` json
{
    "Binds": ["/var/run/docker.sock:/var/run/docker.sock"]
}
```
4. 重启整个Docker
> 需要重启Docker，而不是修改的容器。
如果只是重启容器上面的配置会被还原