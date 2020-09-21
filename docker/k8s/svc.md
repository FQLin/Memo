### 开启`ipvs`

```bash
# 加载内核模快
lsmod|grep ip_vs
 
modprobe -- ip_vs
modprobe -- ip_vs_rr
modprobe -- ip_vs_wrr
modprobe -- ip_vs_sh
modprobe -- nf_conntrack_ipv4
 
yum install ipvsadm ipset -y

# 修改kube-proxy配置

kubectl edit configmap kube-proxy -n kube-system
---
   minSyncPeriod: 0s
      scheduler: ""
      syncPeriod: 30s
    kind: KubeProxyConfiguration
    metricsBindAddress: 127.0.0.1:10249
    mode: "ipvs"                          # 修改此处
    nodePortAddresses: null
 ---
 # 查看所有proxy代理的pod
 kubectl get pod -n kube-system
 # 删除
 kubectl delete pod kube-proxy-wr2nk -n kube-system
```

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: myapp-deploy
  namespace: default
spec:
  replicas: 3
  selector:
    matchLabels:
      app: myapp
      release: stabel
  template:
    metadata:
      labels:
        app: myapp
        release: stabel
        env: test
    spec:
      containers:
        - name: myapp
          image: nginx
          imagePullPolicy: IfNotPresent
          ports:
            - name: http
              containerPort: 80
```

```yaml
apiVersion: v1
kind: Service
metadata:
  name: myapp
  namespace: default
spec:
  type: ClusterIP
  selector:
    app: myapp
    release: stabel
  ports:
    - name: http
      port: 80
      targetPort: 80
```

```bash
kubectl apply -f svc01.yaml
```

### Headless Service

```yaml
apiVersion: v1
kind: Service
metadata:
  name: myapp-headless
  namespace: default
spec:
  selector:
    app: myapp
  clusterIP: "None"
  ports:
    - port: 80
      targetPort: 80
```

##### 安装dig命令

svc名称.命名空间.集群域名.@IP地址

```bash
yum -y install bind-utils
dig -t A myapp-headless.default.svc.cluster.local. @10.244.0.9
```

### `NodePort`

```yaml
apiVersion: v1
kind: Service
metadata:
  name: nodeport
  namespace: default
spec:
  type: NodePort
  selector:
    app: myapp
    release: stabel
  ports:
    - name: http
      port: 80
      targetPort: 80
```

### `ExternalName`

```yaml
apiVersion: v1
kind: Service
metadata:
  name: external-svc
  namespace: default
spec:
  type: ExternalName
  externalName: hub.fanqinglin.com
```

### [`Ingress-Nginx`](https://kubernetes.io/zh/docs/concepts/services-networking/ingress/) [`github`](https://github.com/kubernetes/ingress-nginx)

