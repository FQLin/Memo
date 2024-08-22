[安装kubeadm 官方文档](https://kubernetes.io/zh-cn/docs/setup/production-environment/tools/kubeadm/install-kubeadm/)


CentOS 初始操作
================
```bash
# 拉取 centos7 镜像
docker pull centos:7
# 运行并进入容器
# --hostname=k8s-master 指定容器主机名为 k8s-master,无法在容器内部使用 hostnamectl set-hostname k8s-master 指定主机名，因为 hostnamectl 依赖 D-Bus 进行通信，而 D-Bus 默认是不启用的，所以需要先启用 D-Bus
docker run -it --name centos7 --hostname=k8s-master centos:7 /bin/bash
# 安装常用工具

# 查看hosts内容
cat /etc/hosts
# 关闭防火墙
systemctl stop firewalld # 停止 firewalld
systemctl disable firewalld # 禁止 firewalld 开机启动
# 关闭 SELinux
setenforce 0 # 临时关闭
sed -i 's/^SELINUX=.*/SELINUX=disabled/' /etc/selinux/config # 永久关闭
# 关闭 swap
swapoff -a # 临时关闭
sed -i '/ swap / s/^\(.*\)$/#\1/g' /etc/fstab # 永久关闭

```
