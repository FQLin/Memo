### [文档](https://code.visualstudio.com/docs)

#### [Debugging](https://code.visualstudio.com/docs/editor/debugging)

#### launch configuration:

```  json
{
    "configuratins":[
        {
            //mandatory 必须
            "type":"node", //debugger 类型
            "request":"launch",//launch / attach
            "name":"Launch Program",
            //optional 可选
            "presentation":{
                "hidden": false,
                "group": "",
                "order": 1
            },
            "preLaunchTask": "",//debug开始时启动的任务，可以指定.vscode文件夹中的tasks.json中的task名称
            //https://code.visualstudio.com/docs/editor/tasks
            //${defaultBuildTask} to use your default build task
            "preLaunchTask": {
                "task": "",
                "type": ""
            },
            "postDebugTask": "",//debug结束时启动的任务，参数同上
            "postDebugTask": {
                "task": "",
                "type": ""
            },
            "internalConsoleOptions": "",//visibility of the Debug Console panel during a debugging session
            //neverOpen/openOnFirstSessionStart/openOnSessionStart
            "debugServer": 4711,// for debug extension authors only
            "serverReadyAction":{
                "action": "openExternally"
            },//Automatically open a URI when debugging a server program
            //support 大部分调试器支持的属性
            "program": "${workspaceFolder}\\app.js",//启动调试指定可执行的文件
            "args": [],//调试传递的参数
            "env": {},//环境变量
            "envFile": "${workspaceFolder}/.env",//环境变量文件地址
            "cwd": "${workspaceFolder}",//查找依赖和文件的当前目录
            "port": 9229,//附加到进程的端口号
            "stopOnEntry": true,//进程启动时立刻断开
            "console": "externalTerminal",//console的种类，internalConsole, integratedTerminal, or externalTerminal
            //系统平台特有配置，不能把 type 放在特有配置中
            "windows": {},
            "linux": {},
            "osx": {},
            //自动打开URL
            "serverReadyAction":{
                "action": "openExternally",
                "pattern": "listening on port ([0-9]+)",//正则表达式，获取端口
                "uriFormat": "http://localhost:%s"//正则表达式，获取地址
            }
        }
    ],
    //符合启动配置
    "compounds": [
        {
            "name": "Server/Client",
            "configurations": ["Server","Client"],
            "preLaunchTask": "",
            "presentation": {
                "hidden": false,
                "group": "",
                "order": 1
            },
            "stopAll": false
        }
    ]
}
```

#### [预设变量](https://code.visualstudio.com/docs/editor/variables-reference)

