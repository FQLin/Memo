[rdp-files mocrosofr docs](https://learn.microsoft.com/zh-cn/windows-server/remote/remote-desktop-services/clients/rdp-files)  
[ns-winuser-windowpos](https://learn.microsoft.com/zh-cn/windows/win32/api/winuser/ns-winuser-windowpos)  
[remote-desktop-protocol-settings](https://docs.microsoft.com/zh-cn/troubleshoot/windows-server/remote/remote-desktop-protocol-settings)  
密码加密 
``` powershell
powershell >("password" | ConvertTo-SecureString -AsPlainText -Force) | ConvertFrom-SecureString  
```

RDP 文件配置详解
| key | value | description |
| :---: | :---: | :---: |
| username | `:s:` + username | 登陆用户名称 |
| password | `51:b:` + password | 通过powershell加密过后的密码 |
