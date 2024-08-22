FROM centos:7

# 使用变量接受参数
ARG KUBE_VERSION=v1.23.6
ARG HOST_NAME

# 关闭防火墙
RUN systemctl stop firewalld && systemctl disable firewalld

# 关闭selinux
RUN sed -i 's/SELINUX=enforcing/SELINUX=disabled/' /etc/selinux/config

