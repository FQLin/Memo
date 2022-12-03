[`Package management - Alpine Linux`](https://wiki.alpinelinux.org/wiki/Package_management)

[`alpine` 官方镜像](https://hub.docker.com/_/alpine)

```powershell
# pull docker image
docker pull alpine
# run alpine image
# 因为alpine镜像没有主进程，需要使用交互方式运行，否则会自动停止
docker run --name alpine-apk-test -it alpine
# 为改为国内源 http://mirrors.ustc.edu.cn/alpine/latest-stable/main
# /etc/apk/repositories
# 更新源
apk update
# 使用 apk 软件包管理
# 查看文档
apk --help
# 查看 add 文档
apk add --help
--no-cache            Do not use any local cache path
-t, --virtual NAME    Create virtual package NAME with given dependencies
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

mkdir -p /root/shadowsocks-libev
/ # cd /root/shadowsocks-libev/
