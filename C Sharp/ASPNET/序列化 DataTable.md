  ```C#
  List<Dictionary<string, object>> result = new List<Dictionary<string, object>>();
  foreach (DataRow dr in dt.Rows)
  {
      Dictionary<string, object> a = new Dictionary<string, object>();
      foreach (DataColumn dc in dt.Columns)
      {
          a.Add(dc.ColumnName, dr[dc]);
      }
      result.Add(a);
  }
  
  JsonConvert.SerializeObject(result)
  ```
  
  >使用NewtonSoft.Json进行序列化，当内容很多的时候 Jil 会出错
