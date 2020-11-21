安装 deepin-wine-ubuntu

https://github.com/wszqkzqk/deepin-wine-ubuntu

git clone https://github.com/wszqkzqk/deepin-wine-ubuntu.git

微信乱码问题：

https://github.com/wszqkzqk/deepin-wine-ubuntu/issues/136#issuecomment-650871812



下载微软雅黑字体,`msyh.ttc`

```
#1.添加字体
cp msyh.ttc ~/.deepinwine/Deepin-WeChat/drive_c/windows/Fonts

#2.修改系统注册表
gedit ~/.deepinwine/Deepin-WeChat/system.reg
#修改以下两行
"MS Shell Dlg"="msyh"
"MS Shell Dlg 2"="msyh"

#3.字体注册
gedit msyh_config.reg
#内容添加
REGEDIT4
[HKEY_LOCAL_MACHINE\Software\Microsoft\Windows NT\CurrentVersion\FontLink\SystemLink]
"Lucida Sans Unicode"="msyh.ttc"
"Microsoft Sans Serif"="msyh.ttc"
"MS Sans Serif"="msyh.ttc"
"Tahoma"="msyh.ttc"
"Tahoma Bold"="msyhbd.ttc"
"msyh"="msyh.ttc"
"Arial"="msyh.ttc"
"Arial Black"="msyh.ttc"
#注册
WINEPREFIX=~/.deepinwine/Deepin-WeChat deepin-wine regedit msyh_config.reg

#4.reboot
```

QQ 乱码

安装中文字体

```bash
sudo apt install fonts-wqy-microhei fonts-wqy-zenhei
```

安装wineHQ

https://wiki.winehq.org/Ubuntu_zhcn