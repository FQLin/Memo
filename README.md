# Memo

备忘杂记

整理一下保存在书签里的知识点，书签太多，把部分内容放在 GitHub 上。

### 暂存

https://www.cnblogs.com/Brambling/p/6725859.html
http://www.80iter.com/blog/1439271735822124
https://www.cnblogs.com/xbf321/archive/2009/06/16/view_in_sqlserver.html
https://docs.microsoft.com/en-us/sql/t-sql/statements/create-view-transact-sql?view=sql-server-2017
https://stackoverflow.com/questions/1272829/why-do-sql-server-views-needs-to-be-refreshed-every-once-in-a-while
https://www.cnblogs.com/xbf321/archive/2009/06/16/view_in_sqlserver.html
http://www.cnblogs.com/over140/archive/2009/01/15/1376318.html
https://bbs.csdn.net/topics/340174826
https://blog.csdn.net/czmao1985/article/details/6019142
http://www.cnblogs.com/over140/archive/2009/01/15/1376318.html
https://blog.csdn.net/cai15191466621/article/details/7493308
https://docs.microsoft.com/zh-cn/previous-versions/sql/sql-server-2005/ms175520(v%3dsql.90)
https://docs.microsoft.com/zh-cn/previous-versions/sql/sql-server-2005/ms189276(v=sql.90)
https://stackoverflow.com/questions/48681429/razor-function-what-is-the-difference-between-helper-and-functions
https://www.cnblogs.com/Brambling/p/6725859.html
http://www.80iter.com/blog/1439271735822124
https://www.cnblogs.com/xbf321/archive/2009/06/16/view_in_sqlserver.html
https://docs.microsoft.com/en-us/sql/t-sql/statements/create-view-transact-sql?view=sql-server-2017
https://stackoverflow.com/questions/1272829/why-do-sql-server-views-needs-to-be-refreshed-every-once-in-a-while
https://www.cnblogs.com/xbf321/archive/2009/06/16/view_in_sqlserver.html
https://blog.csdn.net/cai15191466621/article/details/7493308
https://social.msdn.microsoft.com/Forums/en-US/c27bf788-b81e-4997-bfc9-21d186a59b82/why-does-vs2017-open-a-new-chrome-window-instead-of-reusing-my-existing-one?forum=visualstudiogeneral
https://blogs.msdn.microsoft.com/webdev/2016/11/21/client-side-debugging-of-asp-net-projects-in-google-chrome/

netsh int ipv4 show excludedportrange protocol=tcp

netsh int ipv4 delete excludedportrange protocol=tcp startport=5527 numberofports=100

netsh int <ipv4|ipv6> Add excludedportrange [protocol=]tcp|udp [startport=]<integer> [numberofports=]<integer> [[store=]active|persistent]

netsh int <ipv4|ipv6> delete excludedportrange [protocol=]tcp|udp [startport=]<integer> [numberofports=]<integer> [[store=]active|persistent]

netsh int <ipv4|ipv6> show excludedportrange protocol=tcp|udp [[store=]active|persistent]

https://superuser.com/questions/1579346/many-excludedportranges-how-to-delete-hyper-v-is-disabled

the workaround worked for me, the steps are:

Disable hyper-v (which will required a couple of restarts)
dism.exe /Online /Disable-Feature:Microsoft-Hyper-V

When you finish all the required restarts, reserve the port you want so hyper-v doesn't reserve it back
netsh int ipv4 add excludedportrange protocol=tcp startport=50000 numberofports=100

Re-Enable hyper-V (which will require a couple of restart)
dism.exe /Online /Enable-Feature:Microsoft-Hyper-V /All

when your system is back, you will be able to bind to that port successfully.

https://docs.microsoft.com/zh-CN/troubleshoot/windows-server/networking/reserve-a-range-of-ephemeral-ports

https://itectec.com/superuser/many-excludedportranges-how-to-delete-hyper-v-is-disabled/
