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

```
``` conf

```
``` conf

```
``` conf

```
``` conf

```
``` conf

```
``` conf

```
``` conf

```
``` conf

```


``` conf

```