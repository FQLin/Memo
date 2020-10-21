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
        }
    ]
}
```

