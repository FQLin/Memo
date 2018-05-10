  ```C#
  public static class ModelStateExtension
  {
      /// <summary>  
      /// 获取模型绑定中的ErrMsg  
      /// </summary>  
      /// <param name="msDictionary"></param>  
      /// <returns></returns>  
      public static string GetErrorMessage(this ModelStateDictionary msDictionary)
      {
          if (msDictionary.IsValid || !msDictionary.Any()) return "";
          foreach (string key in msDictionary.Keys)
          {
              ModelState tempModelState = msDictionary[key];
              if (tempModelState.Errors.Any())
              {
                  var firstOrDefault = tempModelState.Errors.FirstOrDefault();
                  if (firstOrDefault != null)
                      return firstOrDefault.ErrorMessage;
              }
          }
          return "";
      }
  }
```
