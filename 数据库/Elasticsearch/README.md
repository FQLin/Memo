[文档](https://www.elastic.co/guide/index.html)

[Kibana 文档](https://www.elastic.co/guide/en/kibana/index.html)

[IK 分词](https://github.com/medcl/elasticsearch-analysis-ik)

[elasticsearch head](https://github.com/mobz/elasticsearch-head) 是可视化管理工具

[elasticsearch安装文档](https://www.elastic.co/guide/en/elasticsearch/reference/7.10/targz.html#install-linux)

```bash
apt-get install wget

sudo docker-compose -f 01.docker-compose.yml up -d

docker cp .\sources.list elasticsearch:/etc/apt/

docker cp elasticsearch:/opt/elasticsearch-7.10.2-amd64.deb.sha512 .

docker cp .\elasticsearch-7.10.2-amd64.deb elasticsearch:/opt/

shasum -a 512 -c elasticsearch-7.10.2-amd64.deb.sha512

dpkg -i elasticsearch-7.10.2-amd64.deb
```

```bash
bin/elasticsearch-plugin install ....zip
```



```bash
# docker 安装 elasticsearch 有效步骤
docker run --name elasticsearch-dev -p 19202:9200 -p 19102:9100 -it ubuntu

# 容器内
groupadd elasticsearch
useradd elasticsearch -g elasticsearch -p elasticsearch
mkdir /home/elasticsearch

# 容器外
docker cp .\elasticsearch-7.10.2-linux-x86_64.tar.gz esiu:/home/elasticsearch
docker cp .\elasticsearch.yml esiu:/home/elasticsearch/elasticsearch-7.11.2/config/
docker cp .\sysctl.conf esiu:/etc/
docker cp .\jvm.options esiu:/home/elasticsearch/elasticsearch-7.11.2/config/

# 启动 es
tar -xzvf elasticsearch-7.11.2-linux-x86_64.tar.gz
chown -R elasticsearch:elasticsearch /home/elasticsearch
runuser -l elasticsearch -c '/home/elasticsearch/elasticsearch-7.11.2/bin/elasticsearch'
```

```bash
# 退出Ubuntu容器 Ctrl+P+Q
# 辅助 cmd

docker cp esiu:/home/elasticsearch/elasticsearch-7.11.2/config/ .\config\
docker cp esiu:/home/elasticsearch/elasticsearch-7.11.2/logs/ .\logs\
docker cp esiu:/etc/sysctl.conf .\

docker cp .\elasticsearch-head-master.zip elasticsearch-dev:/opt/



docker cp elasticsearch-dev:/opt/elasticsearch-7.10.2/bin/elasticsearch .\bin\
docker exec -it esiu /bin/bash
# compose 容器安装IK分词
docker exec -it elasticsearch /bin/bash
# 修改config
docker cp elasticsearch:/usr/share/elasticsearch/plugins/ik/plugin-descriptor.properties .\config\
docker cp .\elasticsearch-analysis-ik-7.12.0.zip elasticsearch:/usr/share/elasticsearch/plugins/
docker cp .\ik\ elasticsearch:/usr/share/elasticsearch/plugins/ik/
docker cp .\config\plugin-descriptor.properties elasticsearch:/usr/share/elasticsearch/plugins/ik/

# sysctl 生效
/sbin/sysctl -p
sysctl -w vm.max_map_count=262144

# https://www.elastic.co/guide/en/elasticsearch/reference/7.10/modules-discovery-settings.html 启动
# discovery.type: single-node
# To run Elasticsearch as a daemon, specify -d on the command line
./bin/elasticsearch -d -p pid
```

> GET
>
> /index ：query index
>
> /index/type/doc_id
>
> POST
>
> /index/type/_search ：query doc
>
> /index/type/doc_id/_update ： alter doc
>
> PUT
>
> /index  ：create index 
>
> /index/type/_mappings：create index
>
> DELETE
>
> /index
>
> /index/type/doc_id



[net-api](https://www.elastic.co/guide/en/elasticsearch/client/net-api/current/introduction.html)

[聚合查询](https://www.elastic.co/guide/en/elasticsearch/reference/master/search-aggregations.html)

