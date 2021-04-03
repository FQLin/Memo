docker hub :https://hub.docker.com/_/registry
registry:https://docs.docker.com/registry/

``` powershell
 docker pull registry
 # 配置 insecure
 # "insecure-registries" : ["myregistrydomain.com:5000"]
 # insecure registry
 # https://docs.docker.com/registry/insecure/
 docker run -d -p 5000:5000 --name registry --rm registry
 # 测试是否启动成功：
 # http://localhost:5000/v2/_catalog
 # 172.17.0.2 localhost:5000
 # 测试私有仓库
 docker tag nginx localhost:5000/reg-nginx
 docker push localhost:5000/reg-nginx
 
 docker pull localhost:5000/reg-nginx
```

