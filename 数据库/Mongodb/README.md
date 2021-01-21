```BASH
# Ubuntu安装Mongodb
# 下载link：https://fastdl.mongodb.org/linux/mongodb-linux-x86_64-ubuntu2004-4.4.3.tgz
#  copy file
docker cp .\mongodb-linux-x86_64-ubuntu2004-4.4.3.tgz ubuntu:/opt/
# 备份源
# mv sources.list sources.list.backup
# 更新源
docker cp .\sources.list ubuntu:/etc/apt/
apt update
apt upgrade -y
apt-get -y install libcurl4 openssl liblzma5
# 解压
tar -zxvf mongodb-linux-x86_64-ubuntu2004-4.4.3.tgz
# 安装
copy mongodb-linux-x86_64-ubuntu2004-4.4.3/bin/* /usr/local/bin
mkdir -p /var/lib/mongo /var/log/mongodb
# 启动
mongod --dbpath=/var/lib/mongo --logpath=/var/log/mongodb/mongodb.log --logappend --port=27017 --directoryperdb --fork

```

[mongod 配置参数](https://docs.mongodb.com/manual/reference/program/mongod/)

[文档地址](https://docs.mongodb.com/manual/installation/)

#### Docker mongodb

```bash

sudo docker run --name mongodb -d mongo #:4.4.3-bionic

sudo docker exec -it mongodb /bin/bash
```

```sh
show databases



use test1

show collections

db.createCollection("c1")

db.c1.drop()

db.dropDatabase()

db.[collection name].insert(json)

db.[collection name].find()

db.[collection name].update()
```

```javascript
for (let i = 1; i <= 10; i++) {
  db.c3.insert({ uname: `fan_${i}`, age: i });
}
```

use test3

```javascript
for (let i = 1; i <= 10000; i++) {
  let uname = [];

  let age;

  for (let j = 0; j < 4; j++) {
    age = Math.ceil(Math.random() * 25);

    uname.push(String.fromCharCode(65 + age));
  }

  db.c1.insert({ uname: uname.join(""), age: age });
}
```

```sh
db.c1.find().sort({age:1})

db.c1.find().sort().skip().limit()

db.c2.createIndex({name:1[,age:-1]},{name:"indexName"})

db.c2.dropIndex(name)

db.c2.createIndex(colName,{unique:colName})

db.createUser({
"user":"",
"pwd":"",
"roles":[
{role:"",db:""}
]
})

mongo IP:PORT/admin -u admin -p password
```
