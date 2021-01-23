use admin
show table
use config
show tables
db.createUser({
    "user":"root","pwd":"root","roles":[{"role":"root","db":"admin"}],
    "customData":{"information":"this is custom data"}
    });
show users
show tables;
db.system.users.find();
db.auth("root","root");
db.updateUser("bjsxt",{"pwd":"123",
"roles":[{"role":"readWriteAnyDatabase","db":"admin"}]});
db.changeUserPassword("guest","guest");
db.dropUser("guest");
# 查看数据库
show dbs
show databases
# create
use newDB
db.dropDatabase()
db.test.insert("field":"value")
db.createCollection("collectionName",{"capped#容量":false,"size":"20000kb","max#集合个数":"100","autoindexid":true})
show tables
show collections
db.newCollection.insert({"field":"value"})
