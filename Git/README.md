### [中文文档](https://git-scm.com/book/zh/v2)

```bash
# 添加remote
$ git remote add origin ssh://xxx
# 拉取 Upstream
git fetch upstream
# 合并
git merge upstream/master
# push 到github
git push origin master
git fetch
```

[安装 gitlab](https://about.gitlab.com/install/)

#### `ssh-keygen` 生成`key`

http://man.linuxde.net/ssh-add
https://www.cnblogs.com/lxwphp/p/7884700.html
http://www.cnblogs.com/Security-Darren/p/4106328.html

``` powershell
# 启动 ssh-agent
eval `ssh-agent -s`

# 添加 key
ssh-add ~/.ssh/id_rsa

# 测试连接
ssh -T git@github.com

# git checkout [<options>] [<branch>] -- <file>...
# git checkout  ee25a1a3f9465 SQL/README.md
```

[git 回退](https://blog.csdn.net/zhezhebie/article/details/79420752)
[git 代理](https://www.cnblogs.com/cscshi/p/15705045.html)
.ssh/config
Host git.host.com[sample]
  User git
  ProxyCommand connect -H account:password@proxy地址:端口号 %h %p

