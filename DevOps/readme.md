[Jenkins 官网](https://www.jenkins.io/)

推荐使用过国内的插件镜像 https://mirrors.tuna.tsinghua.edu.cn/

```bash
# 安装配置 java sdk，可以使用 sh 脚本来进行设置
# 可以把插件下载之后放在 /var/lib/jenkins/plugins 路径，Jenkins进行初始化时离线安装
# 国内镜像设置地址
/var/lib/jenkins/hudson.model.UpdateCentoer.xml

```

直接替换 https://mirrors.tuna.tsinghua.edu.cn/jenkins/updates/update-center.json 文件是否可行？

修改 hosts，把插件下载域名解析到 本机

使用nginx代理转发到其他插件地址

``` .conf
location /download/plugins {
	proxy_set_header Host mirrors.tuna.tsinghua.edu.cn;
	proxy_set_header X-Real-IP $remote_addr;
	proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
	rewite /download/plugins(.*) /jenkins/plugins/$1 bradk;
	proxy_pass http://mirrors.tuna.tsinghua.edu.cn
}
```





