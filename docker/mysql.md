官方文档：https://dev.mysql.com/doc/refman/8.0/en/docker-mysql-getting-started.html#docker-download-image
下载mysql 镜像 docker pull mysql/mysql-server:tag 
tag默认为latest

启动，连接 mysql 进入mysql 容器内
docker exec -it mysql1 mysql -uroot -p
bash进入容器内部
docker exec -it mysql1 bash 

docker run -p 3306:3306 \
 --privileged=true --restart always --name mymysql \
 -e MYSQL_USER=fanqinglin \
 -e MYSQL_PASSWORD=fanqinglin123456 \
 -e MYSQL_ROOT_PASSWORD=fanqinglin123456 \
 --mount type=bind,src=/data/mysql/.config/my.cnf,dst=/etc/my.cnf \
 --mount type=bind,src=/data/mysql/data,dst=/var/lib/mysql \
 mysql/mysql-server

绑定 mount
docker run --name=mysql1 \
--mount type=bind,src=/path-on-host-machine/my.cnf,dst=/etc/my.cnf \
--mount type=bind,src=/path-on-host-machine/datadir,dst=/var/lib/mysql \
-d mysql/mysql-server:tag

执行初始化sql
--mount type=bind,src=/path-on-host-machine/scripts/,dst=/docker-entrypoint-initdb.d/ \

docker 命令行文档
https://docs.docker-cn.com/engine/reference/run/
-d 后台执行参数
