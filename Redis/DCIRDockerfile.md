```dockerfile
FROM centos
# 配置 yum镜像
WORKDIR /etc/yum.repos.d/ # 进入路径
# 备份
RUN mkdir centos.back
RUN mv  *.repo  centos.back
# 下载国内源文件
wget http://mirrors.aliyun.com/repo/Centos-8.repo #阿里源
# 清空缓存和生成缓存
RUN yum clean all 
RUN yum makecache  
# docker cp f:/redis/redis-6.0.8.tar.gz centos01:/opt/redis/
ADD redis-6.0.8.tar.gz /opt/redis
WORKDIR /opt/redis/redis-6.0.8
RUN yum -y install gcc gcc-c++ autoconf automake make vim
RUN make
RUN make install
# 默认的安装路径 /usr/local/bin
WORKDIR /usr/local/bin
RUN mkdir rconfig
RUN cp /opt/redis/redis-6.0.8/redis.conf rconfig



RUN yum -y install zlib zlib-devel openssl openssl-devel pcre pcre-devel

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

