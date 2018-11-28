ASP.NET MVC 输出缓存

``` c#
[OutputCache(Duration = 10,VaryByParam = "none")]
```
在这种url / 不会正常工作，必须像 /home/index 这样的url

Location 属性可以设置缓存的位置，默认情况下是 Any[,Client,downstream，Server，None，ServerAndClient]
VaryByParam 可以缓存非常相似内容的不同缓存版本

可以在web.config中配置输出缓存，<caching>节点必须和 <system.web> 节点一起出现在一个web配置文件中

```xml
<caching>
	<outputCacheSettings>
		<outputCacheProfiles>
			<add name="sample" duration="3600" varybyparam="none"/>
		</outputCacheProfiles>
	</outputCacheSettings>
</caching>
```
```c#
[outputcache(cacheProfile="sample")]
public ActionResult Action()
```