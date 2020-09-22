## 薪火相传 主从复制模式

``` yaml
# pf01slave_redis_dockerfile
# 第二层依然是从节点，无法写入
FROM redis
COPY ./config/pf01slave-redis.conf /opt/redis/redis.conf
# 注意 conf 中的 daemonize 不能再守护进程模式下运行
CMD [ "redis-server", "/opt/redis/redis.conf" ]
```

``` yaml
# pf01slave-redis-docker-compose.yaml
version: "3.8"
services:
  master:
    build:
      context: .
      dockerfile: master_redis_dockerfile
    restart: unless-stopped
    container_name: "redisMaster"
    ports:
      - "6668:6379"
    networks:
      cluster_redis:
        ipv4_address: 172.21.0.2
        aliases:
          - "redisMaster"
  slaves01:
    build:
      context: .
      dockerfile: slave_redis_dockerfile
    restart: unless-stopped
    container_name: "redisSlaves01"
    ports:
      - "6669:6379"
    networks:
      cluster_redis:
        ipv4_address: 172.21.0.3
        aliases:
          - "redisSlaves01"
  slaves02:
    build:
      context: .
      dockerfile: pf01slave_redis_dockerfile
    restart: unless-stopped
    container_name: "redisSlaves02"
    ports:
      - "6670:6379"
    networks:
      cluster_redis:
        ipv4_address: 172.21.0.4
        aliases:
          - "redisSlaves02"
  slaves03:
    build:
      context: .
      dockerfile: pf01slave_redis_dockerfile
    restart: unless-stopped
    container_name: "redisSlaves03"
    ports:
      - "6671:6379"
    networks:
      cluster_redis:
        ipv4_address: 172.21.0.5
        aliases:
          - "redisSlaves03"
networks:
  cluster_redis:
    driver: "bridge"
    ipam:
      driver: default
      config:
        - subnet: "172.21.0.0/16"
          gateway: "172.21.0.1"
    name: "cluster_redis"
```

