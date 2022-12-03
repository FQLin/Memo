##### [`shadowsocks-libev`](https://github.com/shadowsocks/shadowsocks-libev)

> Bug-fix-only libev port of shadowsocks. Future development moved to shadowsocks-rust

alpine [编译安装](https://github.com/shadowsocks/shadowsocks-libev#linux)参考 [`dockerfile`](https://github.com/teddysun/shadowsocks_install/blob/master/docker/shadowsocks-libev/Dockerfile.architecture),

```shell
# 测试命令
# 配置 non-root user ，不用每次都sudo
# remote 启动vscode的docker扩展，需要把remote机器上的.vscode进程全部kill才会生效
```

git build-base c-ares-dev autoconf automake libev-dev libtool libsodium-dev linux-headers mbedtls-dev pcre-dev

- autotools (autoconf, automake, libtool)
- gettext
- pkg-config
- libmbedtls
- libsodium
- libpcre3 (old pcre library)
- libev
- libc-ares
- asciidoc (for documentation only)
- xmlto (for documentation only)

git autoconf automake libtool gettext ~~`pkg-config`~~ ~~libmbedtls~~ libsodium ~~libpcre3~~ libev ~~libc-ares~~ asciidoc xmlto

```shell
mkdir -p /root/shadowsocks-libev
/ # cd /root/shadowsocks-libev/
## Arch
apk add --no-cache --virtual .build-deps git autoconf automake make asciidoc xmlto c-ares libev mbedtls
```

```shell
# pull shadowsocks-libev image
docker pull shadowsocks/shadowsocks-libev
# run 
docker run --name "shadowsocks-libev" -e PASSWORD="1qaz2wsx#" TZ="Asia/Shanghai" -p 8000:8388 -p 8000/udp:8388/udp -d shadowsocks/shadowsocks-libev
docker run --name "shadowsocks-libev" -e PASSWORD="1qaz2wsx#" -e TZ="Asia/Shanghai" -p 8000:8388 -d shadowsocks/shadowsocks-libev:latest
docker run --name "shadowsocks-libev" -e PASSWORD="!1qaz@2wsx" -p 8000:8388 -d shadowsocks/shadowsocks-libev:latest
```


