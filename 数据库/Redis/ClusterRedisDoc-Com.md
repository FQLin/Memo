```yaml
#RedisMasterDockerfile
FROM redis
COPY ./config/redis.conf /opt/redis/redis.conf
# 注意 conf 中的 daemonize 不能再守护进程模式下运行
CMD [ "redis-server", "/opt/redis/redis.conf" ]
```

```yaml
# cluster-redis-docker-compose.yaml
version: "3.8"
services:
  master01:
    build:
      context: .
      dockerfile: RedisDockerfile
    restart: unless-stopped
    container_name: "redisMaster01"
    ports:
      - "6768:6379"
    networks:
      - "cluster_redis"
  slaves01:
    build:
      context: .
      dockerfile: RedisDockerfile
    restart: unless-stopped
    container_name: "redisSlave01"
    ports:
      - "6669:6379"
    networks:
      aliases:
        - "redisSlave01"
      - "cluster_redis"
  slaves02:
    build:
      context: .
      dockerfile: RedisDockerfile
    restart: unless-stopped
    container_name: "redisSlaves02"
    ports:
      - "6670:6379"
    networks:
      - "cluster_redis"
  slaves03:
    build:
      context: .
      dockerfile: RedisDockerfile
    restart: unless-stopped
    container_name: "redisSlaves03"
    ports:
      - "6671:6379"
    networks:
      - "cluster_redis"
networks:
  cluster_redis:
    driver: "bridge"
    ipam:
      driver: default
      config:
        - subnet: 172.38.0.0/16
    name: "cluster_redis"
```

