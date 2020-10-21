``` powershell
 docker pull registry
 docker run -d -p 5000:5000 --name registry --rm registry
 # 172.17.0.2 localhost:5000
 docker tag nginx localhost:5000/reg-nginx
 docker push localhost:5000/reg-nginx
 # http://localhost:5000/v2/_catalog
 docker pull localhost:5000/reg-nginx
```

