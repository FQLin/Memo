一台 master，两台node，一台harbor，全部使用centos系统

一台koolshare

### KoolShare安装

- 进入winPE

- [下载koolshare](http://firmware.koolshare.cn/)

- [koolshare配置](https://www.cnblogs.com/rmxd/p/12016259.html#_label1_5)

  配置centos网络：/etc/sysconfig/network-scripts/ifcfg-ens33

  ```
  IPADDR=192.168.66.20
  NETMASK=255.255.255.0
  GETEWAY=192.168.66.1
  
  ```

  ### 指定主机名称
  
  > hostnamectl set-hostname k8s-master01
  
  修改hosts
  
  192.168.66.10 k8s-master01
  192.168.66.20 k8s-node01
  192.168.66.21 k8s-node02
  
  ### 安装工具
  
  ```bash
  yum install -y conntrack ipvsadm ipset jq iptables curl sysstat libseccomp wget vim net-tools git
  ```
  
  centos8不再支持ntp，改用[chrony](https://www.cnblogs.com/jhxxb/p/11526098.html)

### 设置防火墙为 iptables 清空

```bash
systemctl stop firewalld && systemctl disable firewalld
yum -y install iptables-services && systemctl start iptables && systemctl enable iptables && iptables -F && service iptables save
```

### [关闭](https://www.cnblogs.com/architectforest/p/12982886.html)虚拟内存

```bash
#/dev/mapper/cl-swap     swap

/etc/fstab
```

### [关闭](https://www.cnblogs.com/architectforest/p/12987499.html)SELINUX

```
vim /etc/selinux/config 
SELINUX=disabled
```

#### 基础配置

```bash
cat > kubernetes.conf << EOF
net.bridge.bridge-nf-call-iptables=1
net.bridge.bridge-nf-call-ip6tables=1
net.ipv4.ip_forward=1
# net.ipv4.tcp_tw_recycle=0 centos高版本内核已经废弃 tcp_tw_recycle
vm.swappiness=0 # 禁用swap
vm.overcommit_memory=1 # 不检查物理内存是否够用
vm.panic_on_oom=0 # 开启 OOM
fs.inotify.max_user_instances=8192
fs.inotify.max_user_watches=1048576
fs.file-max=52706963
fs.nr_open=52706963
net.ipv6.conf.all.disable_ipv6=1
net.netfilter.nf_conntrack_max=2310720
EOF

cp kubernetes.conf /etc/sysctl.d/kubernetes.conf
modprobe br_netfilter
sysctl -p /etc/sysctl.d/kubernetes.conf
```

#### 调整时区

```bash
timedatectl set-timezone Asia/Shanghai
```

#### 关闭不需要的服务

```bash
systemctl stop postfix && systemctl disable postfix
```

#### 设置`rsyslogd`和`systemd journald`

```bash
mkdir /var/log/journal #持久化保存日志的目录
mkdir /etc/systemd/journald.conf.d
cat > /etc/systemd/journald.conf.d/99-prophet.conf <<EOF
[Journal]
# 持久化保存到磁盘
Storage=persistent

# 压缩历史日志
Compress=yes

SyncIntervalSec=5m
RateLimitInterval=30s
RateLimitBurst=1000

# 最大占用空间
SystemMaxUser=10G

# 单日志文件最大 200M
SystemMaxFileSize=200M

# 日志保存时间 2 周
MaxRetentionSec=2week

# 不将日志转发到 syslog
ForwardToSyslog=no
EOF

systemctl restart systemd-journald
```

#### `kube-proxy`开启`ipvs`的前置条件

```bash
cat > /etc/sysconfig/modules/ipvs.modules <<EOF
#!/bin/bash
modprobe -- ip_vs
modprobe -- ip_vs_rr
modprobe -- ip_vs_wrr
modprobe -- ip_vs_sh
modprobe -- nf_conntrack_ipv4
EOF

chmod 755 /etc/sysconfig/modules/ipvs.modules && bash /etc/sysconfig/modules/ipvs.modules && lsmod | grep -e ip_vs -e nf_conntrack_ipv4
```

#### [安装](https://docs.docker.com/engine/install/centos/)`docker`

```bash
yum remove docker \
                  docker-client \
                  docker-client-latest \
                  docker-common \
                  docker-latest \
                  docker-latest-logrotate \
                  docker-logrotate \
                  docker-engine

yum install -y yum-utils

yum-config-manager \
 --add-repo \
 http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
 
 yum install docker-ce docker-ce-cli containerd.io
 
mkdir /etc/docker

# 配置daemon.json
cat > /etc/docker/daemon.json <<EOF
{
    "registry-mirrors": [
        "https://fj4ng3l2.mirror.aliyuncs.com",
        "http://f1361db2.m.daocloud.io",
        "https://docker.mirrors.ustc.edu.cn",
        "https://registry.docker-cn.com"
      ],
	"exec-opts": ["native.cgroupdriver=systemd"],
	"log-driver": "json-file",
	"log-opts": {
		"max-size": "100m"
	}
}
EOF

mkdir -p /etc/systemd/system/docker.service.d

#重启 docker 服务
systemctl daemon-reload && systemctl restart docker && systemctl enable docker
```

### 安装`Kubeadm`(主从配置)

```bash
cat <<EOF > /etc/yum.repos.d/kubernetes.repo
[kubernetes]
name=Kubernetes
baseurl=https://mirrors.aliyun.com/kubernetes/yum/repos/kubernetes-el7-x86_64/
enabled=1
gpgcheck=1    #开启gpg校验
repo_gpgcheck=1
gpgkey=https://mirrors.aliyun.com/kubernetes/yum/doc/yum-key.gpg https://mirrors.aliyun.com/kubernetes/yum/doc/rpm-package-key.gpg
EOF

yum install kubectl kubelet kubeadm
systemctl enable kubelet
kubectl version
```

#### 初始化`k8s`(1)

```shell
kubeadm init --kubernetes-version=1.19.0  \
--apiserver-advertise-address=192.168.66.10   \
--image-repository registry.aliyuncs.com/google_containers  \
--service-cidr=10.96.0.0/12 --pod-network-cidr=10.244.0.0/16 \
--node-name=k8s-master01 | tee kubeadm-init.log --feature-gates "SupportIPVSProxyMode=true"
```



#### 初始化`k8s`(2)

```shell
kubeadm config print init-defaults > kubeadm-config.yaml
---
localAPIEndpoint:
  advertiseAddress: 192.168.66.10 #当前地址
---
networking:
  ...
  podSubnet: "10.244.0.0/16" #虚拟插件Flannel网段
  ...
---
...
apiVersion: kubeproxy.config.k8s.io/v1alphal
kind: KubeproxyConfiguration
featureGates: 
  SupportIPVSProxyMode: true
mode: ipvs

kubeadm init --config=kubeadm-config.yaml --experimental-upload-certs | tee kubeadm-init.log
```

---

```shell
  mkdir -p $HOME/.kube
  sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
  sudo chown $(id -u):$(id -g) $HOME/.kube/config
  source <(kubectl completion bash)
  
  
Then you can join any number of worker nodes by running the following on each as root:

kubeadm join 192.168.66.10:6443 --token 3nw4sw.yrvoka8n261kbogj \
    --discovery-token-ca-cert-hash sha256:cb79c2464e0448d3ca9e304929e09007a3888a08cff35693b4fd3b274799ff9d
```

#### [Flannel](https://github.com/coreos/flannel)

```
kubectl apply -f https://raw.githubusercontent.com/coreos/flannel/master/Documentation/kube-flannel.yml
---
wget https://raw.githubusercontent.com/coreos/flannel/v0.12.0/Documentation/kube-flannel.yml
---
kubectl create -f kube-flannel.yml
```

```
kubectl get pod -n kube-system
kubectl get pod --all-namespaces
kubectl delete -f kube-flannel.yml
```

#### [`Flannel Image`](https://quay.io/repository/coreos/flannel?tab=tags)

```shell
docker save quay.io/coreos/flannel:v0.12.0-amd64 -o flannel.tar
docker pull quay.io/coreos/flannel:v0.12.0-amd64
```

### [Harbor](https://github.com/vmware/harbor)

```shell
# 生成证书
openssl genrsa -out ca.key 4096

openssl req -x509 -new -nodes -sha512 -days 3650 \
 -subj "/C=CN/ST=Shanghai/L=Shanghai/O=fanqinglin/OU=IT/CN=fanqinglin.com" \
 -key ca.key \
 -out ca.crt
 
 
openssl genrsa -out hub.fanqinglin.com.key 4096


openssl req -sha512 -new \
    -subj "/C=CN/ST=Shanghai/L=Shanghai/O=k8s-harbor/OU=Personal/CN=hub.fanqinglin.com" \
    -key hub.fanqinglin.com.key \
    -out hub.fanqinglin.com.csr
    
    
cat > v3.ext <<-EOF
authorityKeyIdentifier=keyid,issuer
basicConstraints=CA:FALSE
keyUsage = digitalSignature, nonRepudiation, keyEncipherment, dataEncipherment
extendedKeyUsage = serverAuth
subjectAltName = @alt_names

[alt_names]
DNS.1=hub.fanqinglin.com
DNS.2=hub.fanqinglin
DNS.3=hoarbor
EOF


openssl x509 -req -sha512 -days 3650 \
    -extfile v3.ext \
    -CA ca.crt -CAkey ca.key -CAcreateserial \
    -in hub.fanqinglin.com.csr \
    -out hub.fanqinglin.com.crt
    

openssl x509 -inform PEM -in hub.fanqinglin.com.crt -out hub.fanqinglin.com.cert

# 复制证书到指定目录

mkdir -p /data/cert
cp hub.fanqinglin.com.crt /data/cert
cp hub.fanqinglin.com.key /data/cert

mkdir -p /etc/docker/certs.d/hub.fanqinglin.com
cp hub.fanqinglin.com.cert /etc/docker/certs.d/hub.fanqinglin.com 
cp hub.fanqinglin.com.key /etc/docker/certs.d/hub.fanqinglin.com 
cp ca.crt /etc/docker/certs.d/hub.fanqinglin.com

systemctl restart docker

# 修改harbor配置文件
# vim /data/app/harbor/harbor.yml.tmpl

hostname: hub.fanqinglin.com
  certificate: /data/cert/hub.fanqinglin.com.crt 
  private_key: /data/cert/hub.fanqinglin.com.key
harbor_admin_password: Harbor12345

# 安装 Harbor
mv harbor.yml.tmpl harbor.yml
./prepare 
./install.sh 
```



#### [`docker-compose`](https://github.com/docker/compose)[安装](https://docs.docker.com/compose/install/)

```shell
sudo curl -L "https://github.com/docker/compose/releases/download/1.26.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

sudo chmod +x /usr/local/bin/docker-compose

docker-compose --version
```

#### 私有仓储

```shell
docker login -u admin -p Harbor12345 hub.fanqinglin.com
docker tag nginx:latest hub.fanqinglin.com/library/nginx:v1
docker push hub.fanqinglin.com/library/nginx:v1
```

`kubecrl` [`CLI`](https://kubernetes.io/zh/docs/reference/kubectl/overview/)

```shell
kubectl run nginx-deployment --image=hub.fanqinglin.com/library/nginx:v1 --port=80 --replicas=1

kubectl get pod -o wide

kubectl expose po nginx-deployment --port=8083 --target-port=80
kubectl edit svc nginx-deployment
# type 修改为 NodePort 所有节点都会暴漏
```

### 资源清单

##### 必须存在的属性

| 参数名                    | 字段类型 | 说明                                                  |
| ------------------------- | -------- | ----------------------------------------------------- |
| `version`                 | `String` | k8s api版本，基本是v1，kubectl api-versions命令可查询 |
| `kind`                    | `String` | yaml文件定义的资源类型和角色，比如：pod               |
| `metadata`                | `Object` | 元数据对象，固定值就写 metadata                       |
| `metadata.name`           | `String` | 元数据对象名称，比如命名pod的名字                     |
| `metadata.namespace`      | `String` | 元数据对象的命名空间                                  |
| `Spec`                    | `Object` | 详细定义对象 Spec                                     |
| `spec.containers[]`       | `list`   | 容器列表                                              |
| `spec.containers[].name`  | `String` | 容器名称                                              |
| `spec.containers[].image` | `String` | 容器镜像                                              |

##### 主要对象

| 参数名                                       | 字段类型 | 说明                                                         |
| -------------------------------------------- | -------- | ------------------------------------------------------------ |
| `spec.containers[].name`                     | `String` | 容器名称                                                     |
| `spec.containers[].image`                    | `String` | 容器镜像                                                     |
| `spec.containers[].imagePullPolicy`          | `String` | 镜像拉取策略 Always(默认，每次都尝试拉取)\|Never（只使用本地镜像）\|ifNotPresent（本地没有就拉取） |
| `spec.containers[].command[]`                | `List`   | 启动命令                                                     |
| `spec.containers[].args[]`                   | `List`   | 命令参数                                                     |
| `spec.containers[].workingDir`               | `String` | 工作目录                                                     |
| `spec.containers[].volumeMounts[]`           | `List`   | 容器存储卷配置                                               |
| `spec.containers[].volumeMounts[].name`      | `String` | 存储卷名称                                                   |
| `spec.containers[].volumeMounts[].mountPath` | `String` | 存储卷路径                                                   |
| `spec.containers[].volumeMounts[].readOnly`  | `String` | 存储卷读写模式，默认false                                    |
| `spec.containers[].ports[]`                  | `String` | 需要用到的端口列表                                           |
| `spec.containers[].ports[].name`             | `List`   | 端口名称                                                     |
| `spec.containers[].ports[].containerPort`    | `String` | 容器需要监听的端口                                           |
| `spec.containers[].ports[].hostPort`         | `String` | 宿主机监听的端口，默认和containerPort相同（注意端口冲突）    |
| `spec.containers[].ports[].protocol`         | `String` | 端口协议 TCP（默认）/UDP                                     |
| `spec.containers[].env[].name`               | `String`   | 环境变量名称                                                   |
| `spec.containers[].env[].value`              | `String`   | 环境变量变量值                                                  |
| `spec.containers[].resources`                | `Object`   | 资源限制，资源请求                                          |
| `spec.containers[].resources.limits`                         | `Object`   | 资源运行上限                                             |
| `spec.containers[].resources.limits.cpu`| `string`   | cpu限制，core数，docker run --cpu-shares参数                                                     |
| `spec.containers[].resources.limits.memory` | `string`   | 内存限制，MIB/GiB   |
| `spec.containers[].resources.requests`   | `Object`   | 启动、调度限制设置                                                     |
| `spec.containers[].resources.requests.cpu`   | `string`   | cpu 初始化可用数量                                                     |
| `spec.containers[].resources.requests.memory`      | `string`   | 内存初始化可用数量 |

##### 额外参数

| 参数名 | 字段类型 | 说明 |
| ------ | -------- | ---- |
| `spec.restartPolicy` | `String` |pod重启策略，Always\|OnFailure（非零退出终止 重启）\|Never|
| `spec.nodeSelector` | `Object` | Node的Label过滤标签 key：value |
| `spec.imagePullSecrets` | `Object` | pull镜像时 secret 名称，name：secretkey |
| `spec.hostNetwork` | `Boolean|false` | 主机模式 |

```shell
kubectl explain pod #命名详细信息
```

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: nginx-pod
  labels:
    app: nginx
    version: v1
spec:
  containers:
    - name: nginx01
      image: hub.fanqinglin.com/library/nginx:v1
```

```shell
kubectl create -f pod01.yaml
```

