Windows Containers的Settings是没有FILE SHARING(shared drivers)的

[CLI文档](https://docs.docker.com/engine/reference/commandline/docker/)

> 重启docker
systemctl restart docker

> bash进入容器内部
docker exec -it mysql1 bash 

docker volume ls

docker rm -f $(docker ps -q)

docker image rm -f $(docker images --filter "since=nginx" -q)