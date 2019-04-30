```c#
    class Program
    {
        static void Main(string[] args)
        {
            InitIPDatum.Init();

            Console.ReadKey();

            long IpToInt(string ip)
            {
                char[] separator = new char[] { '.' };
                string[] items = ip.Split(separator);
                return long.Parse(items[0]) << 24
                       | long.Parse(items[1]) << 16
                       | long.Parse(items[2]) << 8
                       | long.Parse(items[3]);
            }

            //string sqlPath = Console.ReadLine();
            //if(string.IsNullOrWhiteSpace(sqlPath))
            //    throw new ArgumentNullException(nameof(sqlPath));

            //FileInfo sqlFile=new FileInfo(sqlPath);


            //(?:(?:(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d)\\.){3}(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d))
            FileInfo sqlFile = new FileInfo("../../../Dump20170921.sql");
            //FileInfo sqlFile = new FileInfo("../../../part01.txt");
            //匹配 左括号（(）数字 逗号（,） 数字 逗号（,） 单引号（'） ip地址
            //单引号（'） 逗号（,） 数字 逗号（,）
            //单引号（'） ip地址 
            //单引号（'） 逗号（,） 单引号（'） 长度不限的所有字符 单引号（'） 逗号（,） 单引号（'）
            //长度不限的所有字符 单引号（'） 右括号（)）
            //Regex reg = new Regex(@"\(\d+\,\d+\,\'.*
            //\'\,\d+\,
            //\'.*
            //\'\,\'.*\'\,\'
            //.*\'\)");
            //Regex reg = new Regex(@"(\(\d+[,]\d+[,']{2}[^']+[,']{2}\d+[,']{2}[^']+[,']{2}[^']+[,']{2}[^']+\'\))");
            //string ip = @"(?:(?:(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d)\\.){3}(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d))";
            Regex reg = new Regex(@"(\(\d+\,\d*\,\'[^']+\'\,\d*\,\'[^']+\'\,\'[^']*\'\,\'[^']*\'\))");
            List<IP_Address> addresses=new List<IP_Address>();
            using (StreamReader file = new StreamReader(sqlFile.FullName, Encoding.Default))
            {
                string filecontent = file.ReadToEnd();
                //List<string> matches = Match(new List<string>(), filecontent);
                MatchCollection matches = reg.Matches(filecontent);
                //Parallel.ForEach(matches, (m, loopState) =>
                //{
                //    string modeltxt = m.Value.Substring(1, m.Value.Length - 2);
                //    string[] modelpro = modeltxt.Split(',');
                //    addresses.Add(new IP_Address()
                //    {
                //        Id = Convert.ToInt64(modelpro[0]),
                //        Number = Convert.ToInt64(modelpro[1]),
                //        StartIp = IpToInt(modelpro[2].Replace("'", string.Empty)),
                //        Number2 = Convert.ToInt64(modelpro[3]),
                //        EndIp = IpToInt(modelpro[4].Replace("'", string.Empty)),
                //        Country = modelpro[5].Replace("'", string.Empty),
                //        Org = modelpro[6].Replace("'", string.Empty)
                //    });
                //});

                //var q = addresses.Where(a => a.Number != a.StartIp || a.Number2 != a.EndIp).ToList();

                foreach (Match m in matches)
                {
                    string modeltxt = m.Value.Substring(1, m.Value.Length - 2);
                    string[] modelpro = modeltxt.Split(',');
                    addresses.Add(new IP_Address()
                    {
                        Id = Convert.ToInt64(modelpro[0]),
                        Number = Convert.ToInt64(modelpro[1]),
                        //StartIp = modelpro[2].Replace("'", string.Empty),
                        Number2 = Convert.ToInt64(modelpro[3]),
                        //EndIp = modelpro[4].Replace("'", string.Empty),
                        Country = modelpro[5].Replace("'", string.Empty),
                        Org = modelpro[6].Replace("'", string.Empty)
                    });

                    //Console.WriteLine(m.Value);
                }
            }

            //var query = addresses.Max(a => a.Id);

            SqlSugarClient client=new SqlSugarClient(new ConnectionConfig()
            {
                ConnectionString = "Data Source=.;Initial Catalog=IP_Adress;User Id=sa;Password=123456",
                DbType = DbType.SqlServer,
                IsAutoCloseConnection = true
            });
            Stopwatch stopwatch=new Stopwatch();
            stopwatch.Start();
            int result = client.Insertable(addresses).ExecuteCommand();
            stopwatch.Stop();

            Console.Write($"插入{result}条{stopwatch.ElapsedMilliseconds}");
            Console.ReadKey();
        }
    }
```

```c#
        public static void Init()
        {

            //FileInfo sqlFile = new FileInfo("../../../part01.txt");
            FileInfo sqlFile = new FileInfo("../../../Dump20170921.sql");
            Regex reg = new Regex(@"(\(\d+\,\d*\,\'[^']+\'\,\d*\,\'[^']+\'\,\'[^']*\'\,\'[^']*\'\))");
            List<IP_Datum> addresses = new List<IP_Datum>();
            using (StreamReader file = new StreamReader(sqlFile.FullName, Encoding.Default))
            {
                string filecontent = file.ReadToEnd();
                //List<string> matches = Match(new List<string>(), filecontent);
                MatchCollection matches = reg.Matches(filecontent);

                //Parallel.ForEach(matches, (m, loopState) =>
                //{
                //    string modeltxt = m.Value.Substring(1, m.Value.Length - 2);
                //    string[] modelpro = modeltxt.Split(',');
                //    addresses.Add(new IP_Datum()
                //    {
                //        StartIPId = Convert.ToInt64(modelpro[1]),
                //        StartIP = modelpro[2].Replace("'", string.Empty),
                //        EndIPId = Convert.ToInt64(modelpro[3]),
                //        EndIP = modelpro[4].Replace("'", string.Empty),
                //        Area = modelpro[5].Replace("'", string.Empty),
                //        Org = modelpro[6].Replace("'", string.Empty)
                //    });
                //});

                foreach (Match m in matches)
                {
                    string modeltxt = m.Value.Substring(1, m.Value.Length - 2);
                    string[] modelpro = modeltxt.Split(',');
                    addresses.Add(new IP_Datum()
                    {
                        StartIPId = Convert.ToInt64(modelpro[1]),
                        StartIP = modelpro[2].Replace("'", string.Empty),
                        EndIPId = Convert.ToInt64(modelpro[3]),
                        EndIP = modelpro[4].Replace("'", string.Empty),
                        Area = modelpro[5].Replace("'", string.Empty),
                        Org = modelpro[6].Replace("'", string.Empty)
                    });
                }
            }

            
            SqlSugarClient client = new SqlSugarClient(new ConnectionConfig()
            {
                ConnectionString = "Data Source=10.1.2.12;Initial Catalog=JC_GlobalSite;User Id=sa;Password=123456",
                DbType = DbType.SqlServer,
                IsAutoCloseConnection = true
            });
            int result = client.Insertable(addresses).ExecuteCommand();

            Console.Write($"插入{result}条");
            Console.ReadKey();
        }
```
