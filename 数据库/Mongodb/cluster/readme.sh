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