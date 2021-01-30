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

