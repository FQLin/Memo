# SQL SERVER 缓存依赖
---

参考：<br/>
https://blog.csdn.net/cai15191466621/article/details/7493308<br/>
http://www.cnblogs.com/over140/archive/2009/01/15/1376318.html<br/>
https://blog.csdn.net/czmao1985/article/details/6019142<br/>
(我突然发现不用所有内容都搬上来，只要我用到的时候能找到这个地址就行了)

## SQL server数据缓存依赖有两种实现模式，轮询模式，通知模式。
### 1.  轮询模式实现步骤

> 此模式需要SQL SERVER 7.0/2000/2005版本以上版本都支持

#### 主要包含以下几步：

#### 1.1 使用aspnet_regsql命令行或SqlCacheDependencyAdmin来配置连接数据库

```sql
ALTER DATABASE <DatabaseName> SET ENABLE_BROKER;  //启用 ServiceBroker，需要在数据库中执行，或者在数据库右键属性，选项中修改ENABLE BROKER为true

//注意修改时，需要关闭所有和此数据库关联的窗口，否则修改不成功。

报如下错误：                      
Alter failed for Database 'pu'.  (Microsoft.SqlServer.Smo)         
An exception occurred while executing a Transact-SQL statement or batch. (Microsoft.SqlServer.ConnectionInfo)             
Database state cannot be changed while other users are using the database 'pu'
ALTER DATABASE statement failed. (Microsoft SQL Server, Error: 5070)
```
```sql
aspnet_regsql -S <server> -U sa -P sa -d <database> -ed     启动数据库的数据缓存依赖功能

aspnet_regsql -S <server> -U sa -P sa -d <database> -t <table> -et     启动数据表的数据缓存依赖功能
```

> 注意：系统默认不能识别aspnet_regsql，.net 4.0中aspnet_regsql的默认路径为
C:\Windows\Microsoft.NET\Framework\v4.0.30319，需要首先把当前目录修改为
C:\Windows\Microsoft.NET\Framework\v4.0.30319，才可以执行此命令。

#### 1.2  配置文件 

```xml
<?xmlversion="1.0"?> 
<configuration> 
    <connectionStrings> 
    <add name="PubsConnectionString"connectionString="Data Source=10.32.153.165; Initial Catalog=pubs;uid=sa;pwd=q1w2e31@;"providerName="System.Data.SqlClient"/> 
    </connectionStrings> 
    <system.web> 
    <compilationdebug="true"targetFramework="4.0"/> 
    <caching> 
        <sqlCacheDependencyenabled ="true"pollTime ="1000"> 
        <databases> 
            
            <!--name:必需的 String 属性。 要添加到配置集合中的 SqlCacheDependencyDatabase 对象的名称。 
                此名称用作 @ OutputCache 指令上 SqlDependency 属性的一部分。 
            pollTime:设置 SqlCacheDependency 轮询数据库表以查看是否发生更改的频率（以毫秒计算）。这儿是一个测试,所以设为10秒,请加大此值 
            connectionStringName 必选的 String 特性。为数据库设置连接字符串名称。 在 connectionStrings 元素（ASP.NET 设置架构） 配置节中引用连接字符串。--> 
            
            <addname="Pubs"connectionStringName = "PubsConnectionString"/> 
        </databases> 
        </sqlCacheDependency> 
    </caching>  
    </system.web> 
</configuration> 
```

```xml
<?xml version="1.0"?>  
<configuration>  
    <connectionStrings>  
    <add name="PubsConnectionString" connectionString="Data Source=10.32.153.165; Initial Catalog=pubs;uid=sa;pwd=q1w2e31@;" providerName="System.Data.SqlClient" />  
    </connectionStrings>  
    <system.web>  
    <compilation debug="true" targetFramework="4.0" />  
    <caching>  
        <sqlCacheDependency enabled = "true" pollTime = "1000" >  
        <databases>  
            
            <!--name:必需的 String 属性。 要添加到配置集合中的 SqlCacheDependencyDatabase 对象的名称。  
                此名称用作 @ OutputCache 指令上 SqlDependency 属性的一部分。  
            pollTime:设置 SqlCacheDependency 轮询数据库表以查看是否发生更改的频率（以毫秒计算）。这儿是一个测试,所以设为10秒,请加大此值  
            connectionStringName 必选的 String 特性。为数据库设置连接字符串名称。 在 connectionStrings 元素（ASP.NET 设置架构） 配置节中引用连接字符串。-->  
            
            <add name="Pubs" connectionStringName = "PubsConnectionString" />  
        </databases>  
        </sqlCacheDependency>  
    </caching>   
    </system.web>  
</configuration>  
```

>注意：connectionStrings，和caching两节的关系，caching节的connectionStringName需要和connectionStrings中的name对应的。

#### 1.3   SqlCacheDependencyAdmin使用

```C#
    using System; 
    using System.Collections.Generic; 
    using System.Linq; 
    using System.Web; 
    using System.Web.UI; 
    using System.Web.UI.WebControls; 
    using System.Web.Caching; 
    using System.Configuration; 
    using System.Data.SqlClient; 
    namespace TestWebSqlCacheDependency 
    { 
        public partial class _Default : System.Web.UI.Page 
        { 
            string key = "model_type"; 
            protected void Page_Load(object sender, EventArgs e) 
            {          
                TextBox1.Text = test();// test(); 
            }  
            private string test() 
            { 
                //从缓存中取值 
                string model = null; 
                if (HttpRuntime.Cache[key] !=null) 
                { 
                    model = HttpRuntime.Cache[key].ToString(); 
                } 
                if (model ==null) 
                { 
                    //取数据 
                    model = getDBValue(); 
                    //启用更改通知 
                    SqlCacheDependencyAdmin.EnableNotifications( 
        ConfigurationManager.ConnectionStrings["PubsConnectionString"].ConnectionString); 
                    //连接到 SQL Server 数据库并为 SqlCacheDependency 更改通知准备数据库表 
                    SqlCacheDependencyAdmin.EnableTableForNotifications( 
        ConfigurationManager.ConnectionStrings["PubsConnectionString"].ConnectionString,"TableTest");//第二个参数是要监控的表名称 
     
                    //制定缓存策略 
                    SqlCacheDependency scd = new SqlCacheDependency("Pubs","TableTest"); 
                  //注意此处的Pubs需要要配置文件的caching节下的databases节下的name对应，而不是随便写的，目前个人测试的结论就是这样。第二个参数是要监控的表名称 
                    //插入缓存 
                    HttpRuntime.Cache.Insert(key, model, scd); 
                } 
                return model; 
            } 
            private string getDBValue() 
            { 
                SqlConnection cn = new SqlConnection(ConfigurationManager.ConnectionStrings["PubsConnectionString"].ConnectionString); 
                cn.Open(); 
                SqlCommand cd = cn.CreateCommand(); 
                cd.CommandText = " select top 1 TableTest.col2 from TableTest "; 
                object o = cd.ExecuteScalar(); 
                cn.Close(); 
                if (o != null) 
                { 
                    return o.ToString(); 
                } 
                return null; 
            } 
        } 
    }  
```

```C#
    using System;  
    using System.Collections.Generic;  
    using System.Linq;  
    using System.Web;  
    using System.Web.UI;  
    using System.Web.UI.WebControls;  
    using System.Web.Caching;  
    using System.Configuration;  
    using System.Data.SqlClient;  
    namespace TestWebSqlCacheDependency  
    {  
        public partial class _Default : System.Web.UI.Page  
        {  
            string key = "model_type";  
            protected void Page_Load(object sender, EventArgs e)  
            {           
                TextBox1.Text = test();// test();  
            }   
            private string test()  
            {  
                //从缓存中取值  
                string model = null;  
                if (HttpRuntime.Cache[key] != null)  
                {  
                    model = HttpRuntime.Cache[key].ToString();  
                }  
                if (model == null)  
                {  
                    //取数据  
                    model = getDBValue();  
                    //启用更改通知  
                    SqlCacheDependencyAdmin.EnableNotifications(  
        ConfigurationManager.ConnectionStrings["PubsConnectionString"].ConnectionString);  
                    //连接到 SQL Server 数据库并为 SqlCacheDependency 更改通知准备数据库表  
                    SqlCacheDependencyAdmin.EnableTableForNotifications(  
        ConfigurationManager.ConnectionStrings["PubsConnectionString"].ConnectionString, "TableTest");//第二个参数是要监控的表名称  
      
                    //制定缓存策略  
                    SqlCacheDependency scd = new SqlCacheDependency("Pubs", "TableTest");  
                  //注意此处的Pubs需要要配置文件的caching节下的databases节下的name对应，而不是随便写的，目前个人测试的结论就是这样。第二个参数是要监控的表名称  
                    //插入缓存  
                    HttpRuntime.Cache.Insert(key, model, scd);  
                }  
                return model;  
            }  
            private string getDBValue()  
            {  
                SqlConnection cn = new SqlConnection(ConfigurationManager.ConnectionStrings["PubsConnectionString"].ConnectionString);  
                cn.Open();  
                SqlCommand cd = cn.CreateCommand();  
                cd.CommandText = " select top 1 TableTest.col2 from TableTest ";  
                object o = cd.ExecuteScalar();  
                cn.Close();  
                if (o != null)  
                {  
                    return o.ToString();  
                }  
                return null;  
            }  
        }  
    } 

```

轮询模式的实质，就是在数据库中多了一个表AspNet_SqlCacheTablesForChangeNotification，在需要监视改变的表也多了一个Trigger，触发器名称为：表名_AspNet_SqlCacheNotification_Trigger，在每次表中有数据时，会触发此触发器，向AspNet_SqlCacheTablesForChangeNotification表中插入数据，系统会隔一段时间查询一次，发现有改变时，就会清空相对应的cache,caching节的pollTime其实就是查询间隔，也就是说，如果此时间设置的很长，数据库中的数据修改后，需要很长时间，才能清空对应的cache，最长延时可到达pollTime对应的时间，性能并不是很好。

