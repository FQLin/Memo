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