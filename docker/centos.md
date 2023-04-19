``` shell
docker pull centos

docker run --name centos01 --rm -p 10022:22 -itd centos /bin/bash

docker run --name centos01 --rm --ip=192.168.6.1 -itd centos /bin/bash
docker run --name centos02 --rm -itd --privileged=true centos /bin/bash

docker exec -it centos01 bash

yum install net-tools

docker inspect --format='{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' centos01
```
docker run --name centos01 --rm -p 8021:22 -itd centos /bin/bash
docker run --name centos02 --rm -p 8022:22 -itd centos /bin/
bash
docker run --name centos03 --rm -p 8023:22 -itd --network host centos /bin/bash

docker run -d --name tomcat01 -p 8081:8080 tomcat
docker run -d --name tomcat02 -p 8082:8080 tomcat


docker run --name nginx01 --rm -d -p 8081:8080 nginx
docker run --name nginx02 -d -p 8082:8080 nginx
docker exec -it nginx01 bash ip addr

docker network inspect bridge

docker exec -it centos01 ping 172.17.0.1

docker exec -it centos01 curl -I http://www.baidu.com

docker run --name centos03 --rm -p 8023:22 -itd --network host centos /bin/bash

docker network create custem

docker run --name centos04 --rm -p 8024:22 -itd --network custem centos /bin/bash

docker network connect custem centos01



# volume test
```dockerfile
FROM centos
VOLUME ["/dataVolumeContainer1","/dataVolumeContainer2"]
CMD echo "finished,-----success"
CMD /bin/bash
```

```dockerfile
FROM CentOS
MAINTAINER fanqinglin<fanqinglin@qq.com>
ENV mypath /tmp
WORKDIR $mypath
RUN yum -y install vim
RUN yun -y install net-tools

EXPOSE 80

CMD echo $mypath
CMD echo "success---------ok"
CMD /bin/bash
```
docker build -f .\Dockerfile01 -t mycentos:0.1 .

docker run -it mycentos:0.1
```dockerfile
FROM  centos
RUN yum install -y curl
#CMD ["curl","-s","http://ip.cn"]
ENTRYPOINT ["curl","-s","http://ip.cn"]
```
```dockerfile
FROM centos
ADD nginx-1.19.2.tar.gz /opt/nginx
WORKDIR /opt/nginx/nginx-1.19.2
RUN yum -y install zlib zlib-devel openssl openssl-devel pcre pcre-devel
RUN yum -y install gcc gcc-c++ autoconf automake make
RUN ./configure --prefix=/etc/nginx --sbin-path=/usr/sbin/nginx --modules-path=/usr/lib/nginx/modules --conf-path=/etc/nginx/nginx.conf --error-log-path=/var/log/nginx/error.log --http-log-path=/var/log/nginx/access.log --pid-path=/var/run/nginx.pid --lock-path=/var/run/nginx.lock --http-client-body-temp-path=/var/cache/nginx/client_temp --http-proxy-temp-path=/var/cache/nginx/proxy_temp --http-fastcgi-temp-path=/var/cache/nginx/fastcgi_temp --http-uwsgi-temp-path=/var/cache/nginx/uwsgi_temp --http-scgi-temp-path=/var/cache/nginx/scgi_temp --user=nginx --group=nginx --with-compat --with-file-aio --with-threads --with-http_addition_module --with-http_auth_request_module --with-http_dav_module --with-http_flv_module --with-http_gunzip_module --with-http_gzip_static_module --with-http_mp4_module --with-http_random_index_module --with-http_realip_module --with-http_secure_link_module --with-http_slice_module --with-http_ssl_module --with-http_stub_status_module --with-http_sub_module --with-http_v2_module --with-mail --with-mail_ssl_module --with-stream --with-stream_realip_module --with-stream_ssl_module --with-stream_ssl_preread_module --with-cc-opt='-g -O2 -fdebug-prefix-map=/data/builder/debuild/nginx-1.19.2/debian/debuild-base/nginx-1.19.2=. -fstack-protector-strong -Wformat -Werror=format-security -Wp,-D_FORTIFY_SOURCE=2 -fPIC' --with-ld-opt='-Wl,-z,relro -Wl,-z,now -Wl,--as-needed -pie'
RUN make
RUN make install  
RUN useradd -s /sbin/nologin -M nginx
RUN mkdir -p  /var/cache/nginx/client_temp
RUN yum -y install initscripts
WORKDIR /etc/nginx

#EXPOSE 80
#CMD nginx -c ./nginx.conf.default
CMD /bin/bash
```

### 使用国内 yum 源

```shell
yum install -y wget
cd /etc/yum.repos.d/ # 进入路径
# 备份
mkdir centos.back
mv  *.repo  centos.back
# 下载国内源文件
wget http://mirrors.aliyun.com/repo/Centos-8.repo #阿里源
# wget http://mirrors.163.com/.help/CentOS8-Base-163.repo  #163源
# 清空缓存和生成缓存
yum clean all 
yum makecache  
```



