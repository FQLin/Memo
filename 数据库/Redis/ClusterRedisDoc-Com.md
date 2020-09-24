#### 集群（不测试搭建）

```yaml
#cluster_redis_dockerfile
FROM redis
COPY ./config/cluster-redis.conf /opt/redis/redis.conf
# 注意 conf 中的 daemonize 不能再守护进程模式下运行
CMD [ "redis-server", "/opt/redis/redis.conf" ]
```

```yaml
# cluster-redis-docker-compose.yaml
version: "3.8"
services:
  redis01:
    build:
      context: .
      dockerfile: cluster_redis_dockerfile
    restart: unless-stopped
    container_name: "redis01"
    environment:
      - TZ=Asia/Shanghai
    ports:
      - "6666:6379"
      - "7661:17001"
    networks:
      cluster_redis:
        ipv4_address: 172.21.0.2
        aliases:
          - "redis01"
  redis02:
    build:
      context: .
      dockerfile: cluster_redis_dockerfile
    restart: unless-stopped
    container_name: "redis02"
    environment:
      - TZ=Asia/Shanghai
    ports:
      - "6667:6379"
      - "7662:17001"
    networks:
      cluster_redis:
        ipv4_address: 172.21.0.3
        aliases:
          - "redis02"
  redis03:
    build:
      context: .
      dockerfile: cluster_redis_dockerfile
    restart: unless-stopped
    container_name: "redis03"
    environment:
      - TZ=Asia/Shanghai
    ports:
      - "6668:6379"
      - "7663:17001"
    networks:
      cluster_redis:
        ipv4_address: 172.21.0.4
        aliases:
          - "redis03"
  redis04:
    build:
      context: .
      dockerfile: cluster_redis_dockerfile
    restart: unless-stopped
    container_name: "redis04"
    environment:
      - TZ=Asia/Shanghai
    ports:
      - "6669:6379"
      - "7664:17001"
    networks:
      cluster_redis:
        ipv4_address: 172.21.0.5
        aliases:
          - "redis04"   
  redis05:
    build:
      context: .
      dockerfile: cluster_redis_dockerfile
    restart: unless-stopped
    container_name: "redis05"
    environment:
      - TZ=Asia/Shanghai
    ports:
      - "6670:6379"
      - "7665:17001"
    networks:
      cluster_redis:
        ipv4_address: 172.21.0.6
        aliases:
          - "redis05"
  redis06:
    build:
      context: .
      dockerfile: cluster_redis_dockerfile
    restart: unless-stopped
    container_name: "redis06"
    environment:
      - TZ=Asia/Shanghai
    ports:
      - "6671:6379"
      - "7666:17001"
    networks:
      cluster_redis:
        ipv4_address: 172.21.0.7
        aliases:
          - "redis06"   
networks:
  cluster_redis:
    driver: "bridge"
    ipam:
      driver: default
      config:
        - subnet: 172.38.0.0/16
    name: "cluster_redis"
```

