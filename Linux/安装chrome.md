下载chrome ：https://www.google.cn/chrome/

https://pkgs.org/安装包参考地址

使用rpm命令安装：rpm -ivh google-chrome-stable_current_x86_64.rpm
可能会需要三个依赖
/usr/bin/lsb_release;
安装命令：yum -y install redhat-lsb
libXss.so.1()(64bit)
安装命令：yum install libXScrnSaver
libappindicator3.so.1()(64bit)
安装命令：yum install libappindicator-gtk3
建议按照顺序安装，我在先安装 libappindicator3.so.1 的时候出错，不知道是顺序的问题还是我手打的命令出错了
