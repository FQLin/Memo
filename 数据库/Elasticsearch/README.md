[文档](https://www.elastic.co/guide/index.html)

[Kibana 文档](https://www.elastic.co/guide/en/kibana/index.html)

[IK 分词](https://github.com/medcl/elasticsearch-analysis-ik)

[elasticsearch head](https://github.com/mobz/elasticsearch-head) 是可视化管理工具

[elasticsearch 安装文档](https://www.elastic.co/guide/en/elasticsearch/reference/7.10/targz.html#install-linux)

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

[net-api](https://www.elastic.co/guide/en/elasticsearch/client/net-api/current/introduction.html)

[聚合查询](https://www.elastic.co/guide/en/elasticsearch/reference/master/search-aggregations.html)

search_type=dfs_query_then_fetch,协调节点统一计算分数，不推荐使用

dis_max 实现 best fields 策略，使用 tie_breaker 参数优化，multi_match 简化

multi_match 还有 most_fields、corss_fields

match_phrase 短语搜索，条件不分词

```json
// 重计分
{
    "query":{},
    "rescore":{
        "window_size":50, //每个分片
        "query":{
            "rescore_query":{}
        }
    },
    "from":0,
    "size":20
}

// ngram
{
    "settings":{
        "analysis":{
            "filter":{
                "my_ngram_filter":{
                    "type":"edge_ngram",
                    "min_gram":1,
                    "max_gram":30
                }
            },
            "analyzer":{
                "my_analyzer":{
                    "type":"custom",
                    "tokenizer":"standard",
                    "filter":[
                        "lowercase",
                        "my_ngram_filter"
                    ]
                }
            }
        }
    },
    "mapping":{
        "test_t":{
            "properties":{
                "f":{
                    "type":"text",
                    "analyzer":"my_analyzer",
                    "fields":{
                        "keyword":{
                            "type":"keyword"
                        }
                    }
                }
            }
        }
    }
}

//聚合
{
    "size":0,
    "aggs":{
        "roup_by_color":{
            "terms":{
                "field":"color",
                "order":{
                    "avg_by_price":"asc"
                }
            }
        },
        "aggs":{
            "avg_by_price":{
                "avg":{
                    "field":"price"
                }
            }
        }
    }
}
```

一对多建模 [nested](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-nested-query.html#query-dsl-nested-query)

```json
{
    "mappings": {
        "users": {
            "properties": {
                "login_name": {
                    "type": "keyword"
                },
                "adress": {
                    "type": "nested",
                    "properties": {
                        "province": {
                            "type": "keyword"
                        }
                    }
                }
            }
        }
    }
}
```

父子关系

```json
// mapping 关系
{
    "mappings":{
        "ecommerce":{
            "properties":{
                "category_name":{
                    type:"text",
                    "analyzer":"ik_max_word",
                    "fields":{
                        "keyword":{
                            "type":"keyword"
                        }
                    }
                },
                "ecommerce_join_field":{
                    "type":"json",
                    "relations":{
                        "catetory":"product"
                    }
                }
            }
        }
    }
}

// 搜索 parent_type,parent_id,has_child,ecommerce_join_field#category
{
    "query":{
        "parent_id":{
            "type":"product",
            "id":1
        }
    }
}

{
    "query":{
        "has_child":{
            "type":"product",
            "query":{
                "range":{
                    "price":{
                        "gte":5000,
                        "lte":10000
                    }
                }
            }
        }
    }
}
```

祖孙三代关系模型

```json
{
    "mappings": {
        "structure": {
            "properties": {
                "country_name": {
                    "type": "keyword"
                },
                "department_name": {
                    "type": "keyword"
                },
                "employee_name": {
                    "type": "keyword"
                },
                "company_join_field": {
                    "type": "join",
                    "relations": {
                        "country": "department",
                        "department": "employee"
                    }
                }
            }
        }
    }
}
```

term vector

```json
{
    "settings":{
        "analysis":{
            "analyzer":{
                "fulltext_analyzer":{
                    "type":"custom",
                    "tokenizer":"whitespace",
                    "filter":[
                        "lowercase",
                        "type_as_payload"
                    ]
                }
            }
        }
    },
    "mappings":{
        my_type:{
            properties:{
                "text":{
                    "type":"text",
                    "term_vector":"with_positions_offsets_payloads",
                    "store":true,
                    "analyzer":"fulltext_analyzer"
                }
            }
        }
    }
}

// GET /my_index/my_type/1/_termvectors
{
    "fields":["text"],
    "offsets":true,
    "payloads":true,
    "positions":true,
    "term_statistics":true,
    "field_statistics":true
}

// 多个document进行探查
// GET /index/type/_mtermvectors
{
    "docs":[
        {
            "_id":1,
            "fields":[
                "text"
            ],
            "term_statistics":true
        },{
            "_id":"2"
        }
    ]
}

// template
// GET /cars/_search/template
{
    "source":"{\"query\":{\"match\": {{#toJson}}parameter{{/toJson}} }",
    "params":{
        "parameter":{
            "remark":"大众"
        }
    }
}

// default value {{end}}{{^end}}default value{{/end}}
```
