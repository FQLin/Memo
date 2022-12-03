清华 源
https://mirror.tuna.tsinghua.edu.cn/help/ubuntu/
ubuntu 论坛
https://forum.ubuntu.org.cn/index.php?sid=dcfef1b2f565d970199220d96b96f8c3
linxu 迅雷
https://www.7uos.com/uos-9yue.html

列出安装的软件
dpkg --list

Ubuntu grub 引导界面美化 
https://www.dazhuanlan.com/2019/12/17/5df8255522c48/
GRUB
https://www.gnome-look.org/browse/cat/109/ord/latest/
打开 grub
sudo gedit /etc/default/grub
史上最良心的 Ubuntu desktop 美化优化指导(1)
https://zhuanlan.zhihu.com/p/63584709
Ubuntu 20.04 桌面美化
https://zhuanlan.zhihu.com/p/176977192
typora
https://www.typora.io/#linux

fanqinglin@fanqinglin-All-Series:~/Downloads$ chmod a+x Shadowsocks-Qt5-3.0.1-x86_64.AppImage 
fanqinglin@fanqinglin-All-Series:~/Downloads$ ./Shadowsocks-Qt5-3.0.1-x86_64.AppImage

https://www.smplayer.info/en/downloads

```bash
sudo add-apt-repository ppa:rvm/smplayer 
sudo apt-get update 
sudo apt-get install smplayer smplayer-themes smplayer-skins
```

微信

https://www.ubuntukylin.com/applications/24-cn.html

挂载硬盘

https://www.bilibili.com/video/BV1m54y1k776?from=search&seid=1161699472201353418

```bash
# 查看可以挂载的硬盘，需要先点一下
df -kh
# 解绑
sudo umount /dev/sdc1
# 硬盘信息
sudo blkid /dev/sdc1
# 编辑挂载文件
sudo gedit /etc/fstab
# 自动挂载
sudo mount -a
# 修改权限
sudo chmod 777 /home/fanqinglin/i
```

UUID=8EA2DAF93E7C61D0    /home/fanqinglin/i    ntfs    defaults    0    2

https://extensions.gnome.org/

sources.list 在 /etc/apt/