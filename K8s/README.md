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

#### 安装`docker`

```bash
yum install -y yum-utils

yum-config-manager \
 --add-repo \
 http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
 
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

