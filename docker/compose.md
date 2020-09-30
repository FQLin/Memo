[docker-compose文档](https://docs.docker.com/compose/compose-file/)
[docker-compose CLI](https://docs.docker.com/compose/reference/overview/)

```yml
version: "3.8"
services:
  mysql:
    restart: always
    image: mysql
    container_name: mysql
    ports:
      - "3306:3306"
    environment:
      MYSQL_ROOT_PASSWORD: root
      TZ: Asia/Shanghai
    volumes:
      - "/f/docker-compose/mysql/data:/var/lib/mysql"
  nginx:
    restart: always
    image: nginx
    container_name: nginx
    ports:
      - "8080:80"
    volumes:
      - "/f/docker-compose/nginx/html:/etc/nginx/html"
```

docker-compose up -d

```yml
version: "3.8"
  services:
    centosnginx:
      restart: always
      build:
        context: ../
        dockerfile: dockerfile03
      image: centosnginx
      container_name: cn
      ports:
        - "8080:80"
        - "8022:22"
```

version: "3.8"
services:
  nginx:
    restart: unless-stopped
    image: nginx
    container_name: nginx
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - "/docker-volumes/nginx/etc/nginx/conf.d:/etc/nginx/conf.d"
      - "/docker-volumes/nginx/etc/nginx/nginx.conf:/etc/nginx/nginx.conf"
      - "/docker-volumes/nginx/etc/nginx/mime.types:/etc/nginx/mime.types"
      - "/docker-volumes/nginx/var/log/nginx:/var/log/nginx"
  code-server:
    restart: unless-stopeed
    image: linuxserver/code-server
    container_name: code-server
    ports:
      - "6660:8443"
      - "6661:80"
    environment:
      - "PUID=1000"
      - "PGID=1000"
      - "TZ=Asia/Shanghai"
      - "PASSWORD=password #optional"
      - "SUDO_PASSWORD=password #optional"
      - "PROXY_DOMAIN=code-server.my.domain #optional"
