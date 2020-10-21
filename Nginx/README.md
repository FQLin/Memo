下载：
> http://nginx.org/en/download.html

----------

- mainline version：开发版本
- stable version：稳定版本

    ```cmd
    docker run ^
    --name mynginx ^
    -d ^
    --rm ^
    -p 5050:80 ^
    nginx

    md f:\docker\etc\nginx
    
    docker cp mynginx:/etc/nginx/conf.d f:\docker\etc\nginx\conf.d
    docker cp mynginx:/etc/nginx/nginx.conf f:\docker\etc\nginx\
    docker cp mynginx:/etc/nginx/mime.types f:\docker\etc\nginx\

    md f:\docker\var\log

    docker cp mynginx:/var/log/nginx f:\docker\var\log\nginx
    
    docker run ^
    --name mynginx2 ^
    -d ^
    --rm ^
    -p 5051:80 ^
    -v /f/docker/nginx/etc/nginx/conf.d:/etc/nginx/conf.d ^
    -v /f/docker/nginx/etc/nginx/nginx.conf:/etc/nginx/nginx.conf ^
    -v /f/docker/nginx/etc/nginx/mime.types:/etc/nginx/mime.types ^
    nginx
    ```

 查看安装目录
 rpm -ql nginx

安装目录：

|路径|类型|作用|
|:-------|:-------|:-------|
|/etc/logrotate.d/nginx|配置文件|Nginx日志轮转，用于logrotate服务的日志切割|
|/etc/nginx<br>/etc/nginx/config.d|目录、配置文件|nginx主配置文件|
|/etc/nginx/fastcgi_params<br>/etc/nginx/uwsgi_params|配置文件|cgi配置先关，fastcgi配置|
|/etc/nginx/koi-utf|配置文件|编码转换映射转换文件|
|/etc/nginx/mime.types|配置文件|设置http协议的content-type与扩展名对应关系|
|/usr/lib/systemd/system/nginx-debug.service<br>/etc/sysconfig/nginx-debug|配置文件|系统守护进程管理方式|
|/usr/lib64/nginx/modules<br>/etc/nginx/modules|目录|Nginx模块|
|/usr/sbin/nginx[-debug]|命令|Nginx服务的启动管理的终端命令|
|/usr/share/man|文件、目录|Nginx的手册和帮助文件|
|/var/cache/nginx|目录|Nginx的缓存目录|
|/var/log/nginx|目录|日志的目录|

> 安装编译参数：nginx -V

>重启Nginx服务：systemctl restart nginx.service
systemctl reload nginx.service

>停止服务：nginx -s stop -c /etc/nginx/nginx.conf

>启动服务：nginx -c /etc/nginx/nginx.conf

>检查配置语法：nginx -tc /etc/nginx/nginx.conf

## `expires`
### 添加`Cache-Control、Expires`头
``` conf
Syntax：expires [modified] time;
expires epoch | max |off;
Default:expires off;
Context:http,server,location,if in location;
```
``` conf
Syntax:add_header name value [always];
Default:-
Context:http,server,location,if in location
```
``` conf
http_refer
Syntax:valid_referers none | blocked | server_names |string ...;
Default:-
Context:server,location
```
``` conf
Syntax:proxy_pass URL;
Default:-
Context:location,if in location,limit_except
```
``` conf
Syntax:fastcgi_pass address;
Default:-
Context:location,if in location

fastcgi_pass unix:/tmp/fastcgi.socket
```
``` conf
Syntax:fastcgi_index name;
Default:-
Context:http,server,location
```
``` conf
Syntax:fastcgi_param parameter value [if_not_empty];
Default:-
Context:http,server,location
```
``` conf
Syntax:fastcgi_cache_path path [levels=levels] keys_zone-name:size [inactive=time] [max_size=size]...;
Default:-
Context:http
```
``` conf
Syntax:fastcgi_cache_key string;
Default:-
Context:http,server,location
```
``` conf
Syntax:fastcgi_cache zone |off;
Default:fastcgi_cache off;
Context:http,server,location
```
``` conf
Syntax:fastcgi_cache_valid [code...] time;
Default:-
Context:http,server,location
```
``` conf
Syntax:upstream name {...}
Default:-
Context:http
```
|||
|:-----|:-----|
|`down`|当前的`server`暂时不参与负载均衡|
|`backup`|预留的备份服务器|
|`max_fails`|允许请求失败的次数|
|`fail_timeout`|经过`max_fails`失败后，服务暂停的时间|
|`max_conns`|限制最大的接受的连接数|

## 调度算法
|||
|:-----|:-----|
|轮询|按时间顺序注意分配到不同的后端服务器|
|加权轮询|`weight`值越大，分配到的访问几率越大|
|`ip_hash`|每个请求按访问`IP`的`hash`结果分配，这样来自同一个`IP`的固定访问一个后端服务器|
|`url_hash`|按照访问的`URL`的`hash`结果来分配请求，是每个`URL`定向到一个后端服务器|
|`least_conn`|最少连接数，那个机器连接数少就分发|
|`hash`关键数值|`hash`自定义的`key`|
### `url_hash`
``` conf
Syntax:hash key [consistent];
Default:-
Context:upstream
This directive appeared in version 1.7.2
```
``` conf
Syntax:rewrite regex replacement [flag];
Default:-
Context:server,location,if
```
### `flag`
|||
|:-----|:-----|
|`last`|停止`rewrite`检测（类似重新发送请求，但不是重定向）|
|`break`|停止`rewrite`检测|
|`redirect`|返回302临时重定向，地址栏会显示跳转后的地址|
|`permanent`|返回301永久重定向，地址栏会显示跳转后的地址|
## `secure_link_module`配置语法
``` conf
Syntax:secure_link expression;
Default:-
Context:http,server,location
```
``` conf
Syntax:secure_link_md5 expression;
Default:-
Context:http,server,location
```
## IP地域信息
``` conf
yum install nginx-module-geoip
```
## `https`语法配置
``` conf
Syntax:ssl on | off;
Default:ssl off;
Context:http,server
```
``` conf
Syntax:ssl_certificate file;
Default:-
Context:http,server
```
``` conf
Syntax:ssl_certificate_key file;
Default:-
Context:http,server
```
上传文件限制：client_max_body_size