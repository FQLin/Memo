查看 firewall 状态
firewall-cmd --state

开放端口：<br>
1):<br>
firewall-cmd --zone=public --add-port=8080/tcp --permanent
--zone=public：表示作用域为公共的；
--add-port=8080/tcp：添加tcp协议的端口8080；
--permanent：永久生效，如果没有此参数，则只能维持当前服务生命周期内，重新启动后失效；<br>
2):
重启防火墙<br>
systemctl restart firewalld.service<br>
3):<br>
重新载入配置<br>
firewall-cmd --reload

查看开放的端口
firewall-cmd --zone=public --list-ports

关闭防火墙
systemctl stop firewalld.service