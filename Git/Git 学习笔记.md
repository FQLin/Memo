中文文档地址：https://git-scm.com/book/zh/v2

添加remote
$ git remote add origin ssh://xxx
拉取 Upstream
git fetch upstream
合并
git merge upstream/master
push 到github
git push origin master

安装 gitlab
https://about.gitlab.com/install/

ssh-keygen 生成key

http://man.linuxde.net/ssh-add
https://www.cnblogs.com/lxwphp/p/7884700.html
http://www.cnblogs.com/Security-Darren/p/4106328.html

git fetch

启动 ssh-agent
eval `ssh-agent -s`

添加 key 可以不用每次都输入password
ssh-add ~/.ssh/id_rsa

测试连接
ssh -T git@github.com

git 回退
https://blog.csdn.net/zhezhebie/article/details/79420752

git checkout [<options>] [<branch>] -- <file>...

git checkout  ee25a1a3f9465 SQL/README.md
