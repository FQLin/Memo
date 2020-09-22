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
RUN mkdir config
RUN cp /opt/redis/redis-6.0.8/redis.conf config

```

