https://www.codeproject.com/Articles/50544/Using-the-WebBrowser-Control-in-ASP-NET

```c#
    public class LooyuUserInfo
    {
        public void Send(string msg,string url)
        {
            LooyuService service=new LooyuService(msg,url);
            //service.Send(msg,url);
            return;
        }
    }


    internal class LooyuService : ApplicationContext
    {
        public LooyuService(string msg, string url)
        {
            var thrd = new Thread(new ThreadStart(
                delegate {
                    Send(msg,url);
                    Application.Run(this);
                }));
            // set thread to STA state before starting
            thrd.SetApartmentState(ApartmentState.STA);
            thrd.Start();
        }

        private void Send(string msg, string url)
        {
            WebBrowser webBrowser = new WebBrowser()
            {
                ScriptErrorsSuppressed = false,
                Url = new Uri("http://looyuoms7812.looyu.com/chat/chat/p.do?g=10080517&md=2&c=20003610&v=d206ca26ac4958081c145d5093a56fb163&u=b56f0f29a46c135213217ee59ae26720cc&f=10097883&site=0&p0=http%3A%2F%2Fm.oleoral.org%2F&ct=2&refer=&loc=http%3A%2F%2Fm.oleoral.org%2F&_d=1532600697874&command=forceChat"),
                ScrollBarsEnabled = false
            };

            webBrowser.DocumentCompleted += new WebBrowserDocumentCompletedEventHandler((sender, e) =>
            {
                HtmlElement script = webBrowser.Document?.CreateElement("script");
                script?.SetAttribute("type", "text/javascript");
                script?.SetAttribute("text", "function _func(){document.getElementById(\"message\").value=\"123456\";}");
                HtmlElement head = webBrowser.Document?.Body?.AppendChild(script);
                webBrowser.Document?.InvokeScript("_func");
                webBrowser.Document?.InvokeScript("sendMessage");
            });
        }
    }
    
```
