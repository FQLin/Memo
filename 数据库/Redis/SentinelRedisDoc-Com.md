### 哨兵模式

``` cmd
docker-compose -f sentinel-redis-docker-compose.yaml up -d
```

##### master容器

``` yaml
# master_sentinel_redis_dockerfile
FROM redis
COPY ./config/master-redis.conf /opt/redis/redis.conf
# 注意 conf 中的 daemonize 不能再守护进程模式下运行
CMD [ "redis-server", "/opt/redis/redis.conf" ]
```

##### slave 容器

```yaml
# slave_sentinel_redis_dockerfile
# replicaof 172.21.0.2 6379
FROM redis
COPY ./config/slave-redis.conf /opt/redis/redis.conf
# 注意 conf 中的 daemonize 不能再守护进程模式下运行
CMD [ "redis-server", "/opt/redis/redis.conf" ]
```

##### sentinel 容器

```yaml
# sentinel_redis_dockerfile
FROM redis
COPY ./config/master-sentinel.conf /opt/redis/sentinel.conf
CMD ["redis-sentinel","/opt/redis/sentinel.conf"]
```



```yaml
# sentinel-redis-docker-compose.yaml
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
      dockerfile: slave_redis_dockerfile
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
      dockerfile: slave_redis_dockerfile
    restart: unless-stopped
    container_name: "redisSlaves03"
    ports:
      - "6671:6379"
    networks:
      cluster_redis:
        ipv4_address: 172.21.0.5
        aliases:
          - "redisSlaves03"
  sentinel01:
    build:
      context: .
      dockerfile: sentinel_redis_dockerfile
    restart: unless-stopped
    container_name: "redisSentinel01"
    ports:
      - "26668:26379"
    networks:
      cluster_redis:
        ipv4_address: 172.21.0.6
        aliases:
          - "redisSentinel01"
  sentinel02:
    build:
      context: .
      dockerfile: sentinel_redis_dockerfile
    restart: unless-stopped
    container_name: "redisSentinel02"
    ports:
      - "26669:26379"
    networks:
      cluster_redis:
        ipv4_address: 172.21.0.7
        aliases:
          - "redisSentinel02"
  sentinel03:
    build:
      context: .
      dockerfile: sentinel_redis_dockerfile
    restart: unless-stopped
    container_name: "redisSentinel03"
    ports:
      - "26670:26379"
    networks:
      cluster_redis:
        ipv4_address: 172.21.0.8
        aliases:
          - "redisSentinel03"          
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

