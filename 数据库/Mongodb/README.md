``` BASH
# 进入 mongodb
/usr/local/mongodb/bin/mongo
```

https://docs.mongodb.com/manual/installation/

``` bash
sudo docker run --name mongodb -d mongo



sudo docker exec -it mongodb /bin/bash
```

``` sh
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

``` javascript
for(let i=1;i<=10;i++){

     db.c3.insert({uname:`fan_${i}`,age:i});

}
```



use test3

``` javascript
for(let i=1;i<=10000;i++){

     let uname=[];

     let age

     for(let j=0;j<4;j++){

         age = Math.ceil(Math.random() * 25);

         uname.push(String.fromCharCode(65+age));

     }

     db.c1.insert({uname:uname.join(''),age:age});

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

