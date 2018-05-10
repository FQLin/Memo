引用自:[https://github.com/ziyasal/Autofac.Extras.NLog](https://github.com/ziyasal/Autofac.Extras.NLog)

因为 Autofac.Extras.NLog 重新定义了ILogger接口，使用的不是 NLogger 提供的接口。

要在 Data 层使用 Logger 的话需要安装 Autofac.Extras.NLog，而我只想安装一个 NLogger，所以在这个项目中重写 LoggerAdapter
继承 NLogger 的 ILogger 接口。

鉴于参考自 Autofac.Extras.NLog，独立创建了一个项目。

感谢强大的 ReSharper 自动帮我实现了 LoggerAdapter。至于为什么不在 NLogModule 中直接使用 LogManager.GetLogger，纯属是为了和 Autofac.Extras.NLog 保持一样。
