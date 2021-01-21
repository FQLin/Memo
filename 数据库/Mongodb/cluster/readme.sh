mongo
use admin
# 创建复制集集群
rs.initiate({
    "_id":"replicationSet",
    "members":[
        {"_id":0,"host":"172.21.0.2:27017","priority":3},
        {"_id":1,"host":"172.21.0.3:27017","priority":1},
        {"_id":2,"host":"172.21.0.4:27017","priority":1},
        {"_id":3,"host":"172.21.0.5:27017","arbiterOnly":true}
    ]
});
db.test.insert({"name":"zhangsan","age":20});
db.test.find();

rs.isMaster();
# 从节点开启权限
use admin
# 主节点优先
db.getMongo().setReadPref("primaryPreferred");
# 最近的节点优先
db.getMongo().setReadPref("nearest");

rs.initiate({
    "_id":"replicationSetChunk01",
    "members":[
        {"_id":0,"host":"172.22.0.2:27018","priority":3},
        {"_id":1,"host":"172.22.0.3:27018","priority":1},
        {"_id":2,"host":"172.22.0.4:27018","priority":1},
        {"_id":3,"host":"172.22.0.5:27018","arbiterOnly":true}
    ]
})

rs.initiate({
    "_id":"replicationSetChunk02",
    "members":[
        {"_id":0,"host":"172.22.0.6:27018","priority":3},
        {"_id":1,"host":"172.22.0.7:27018","priority":1},
        {"_id":2,"host":"172.22.0.8:27018","priority":1},
        {"_id":3,"host":"172.22.0.9:27018","arbiterOnly":true}
    ]
})

rs.initiate({
    "_id":"replicationSetConfig",
    "members":[
        {"_id":0,"host":"172.22.0.10:27019","priority":3},
        {"_id":1,"host":"172.22.0.11:27019","priority":1},
        {"_id":2,"host":"172.22.0.12:27019","priority":1}
    ]
})

mongos

db.runCommand({
    "addShard":"replicationSetChunk01/172.22.0.2:27017,172.22.0.3:27017,172.22.0.4:27017,172.22.0.5:27017"
    });
db.runCommand({
    "addShard":"replicationSetChunk02/172.22.0.6:27017,172.22.0.7:27017,172.22.0.8:27017,172.22.0.9:27017"
    });

show tables
use config
show tables
db.shards.find()
use test
# 开启分片在admin中执行
use admin
db.runCommand({"enablesharding":"test"})

use test
db.createCollection("users")
show tables
db.users.ensureIndex({"name":1})

use admin
db.runCommand({"shardcollection":"test.users","key":{"name":"hashed"}})

use config
show tables
db.chunks.find()
sh.status()