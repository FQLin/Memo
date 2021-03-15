[文档](https://www.elastic.co/guide/index.html)

[Kibana 文档](https://www.elastic.co/guide/en/kibana/index.html)

[IK 分词](https://github.com/medcl/elasticsearch-analysis-ik)

[elasticsearch head](https://github.com/mobz/elasticsearch-head)





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

[安装文档](https://www.elastic.co/guide/en/elasticsearch/reference/7.10/targz.html#install-linux)

``` bash
# install elasticsearch
docker run --name elasticsearch-dev -p 19202:9200 -p 19102:9100 -it ubuntu
# 退出容器 Ctrl+P+Q
docker cp .\elasticsearch-7.10.2-linux-x86_64.tar.gz elasticsearch-dev:/opt/
docker cp .\elasticsearch-head-master.zip elasticsearch-dev:/opt/
docker cp elasticsearch-dev:/opt/elasticsearch-7.10.2/config/ .\config\
docker cp elasticsearch-dev:/opt/elasticsearch-7.10.2/bin/elasticsearch .\bin\
docker exec -it elasticsearch-dev /bin/bash
groupadd elasticsearch
useradd elasticsearch -g elasticsearch -p elasticsearch
chown -R elasticsearch:elasticsearch /opt/elasticsearch-7.10.2
```

