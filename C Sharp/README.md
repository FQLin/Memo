### 相对路径、绝对路径

1.Request.ApplicationPath->当前应用的目录 
Jsp中, ApplicationPath指的是当前的application(应用程序)的目录,ASP.NET中也是这个意思。 
对应的--例如我的服务器上有两个web应用域名都是mockte.com 一个映射到目录mockte.com/1/ 另一个影射到 http://mockte.com/2/ 
那么mockte.com/1/就是第一个应用的ApplicationPath 同理 mockte.com/2/就是第二个应用的ApplicationPath 

2.Request.FilePath->对应于iis的虚拟目录 
如 URL http://mockte.com/1/index.html/pathinfo 
FilePath = /1/index.html 

3.Request.Path->当前请求的虚拟路径 
Path 是 FilePath 和 PathInfo 尾部的串联。例如 URL http://mockte.com/1/index.html/pathinfo 
那么Path = /1/index.html/pathinfo 

4.Request.MapPath(string url)->将url映射为iis上的虚拟目录 
这个目录都是相对于application的根目录的 
于Server.MapPath相比,不会包含类似c:/这样的路径 
可以理解为是相对路径(对比的Server.MapPath就是绝对路径) 

5.Server.MapPath(string url)->将url映射为服务器上的物理路径 
例如 http://mockte.com/1/index.html 假设你的应用程序在c:/iis/MySite中 
那么就是 c:/iis/MySite/1/index.html

https://blog.csdn.net/devillyd/article/details/5896819

### 缓存

缓存失效的回调不是立刻执行的，而是在进行缓存操作的时候才对缓存进行检查，如果失效的话执行失效回调。
可以在`MemoryCacheOptions`中配置缓存失效扫描间隔，但会有性能损耗