1.首先要找到wnvhtmlconvert.dll这个文件，并引入项目中。

2.Server.Execute("pos.aspx?id=" + ids); 执行相应的aspx网页

3.pos.aspx网页中有这样的一个方法，此方法用来生成html页面

``` C#
protected override void Render(HtmlTextWriter writer)
{
    string htmlname = "POSDemo";
    string fileName = string.Empty;


    string content = string.Empty;
    System.IO.StringWriter stringWriter = new System.IO.StringWriter();
    HtmlTextWriter htmlWriter = new HtmlTextWriter(stringWriter);
    System.IO.StreamWriter sw = null;
    try
    {
        // 将当前页面的内容呈现到临时的 HtmlTextWriter 对象中 
        base.Render(htmlWriter);
        htmlWriter.Close();
        // 得到当前页面的全部内容 
        content = stringWriter.ToString();
        fileName = htmlname + ".html";
        //sw = new StreamWriter(Server.MapPath("htm/") + fileName, false, code);
        //sw.Write(str);
        //sw.Flush();
        //System.IO.StringWriter creaObj = new System.IO.StringWriter(Server.MapPath("html/") + fileName, false, content);

        string path = HttpContext.Current.Server.MapPath("../Upload/");

        System.Text.Encoding code = System.Text.Encoding.GetEncoding("utf-8");
        sw = new System.IO.StreamWriter(path + fileName, false, code);
        //sw = new System.IO.StreamWriter(fileName, false, code);
        sw.Write(content);
        sw.Flush();
        string website = "http://" + HttpContext.Current.Request.Url.Authority;

        Response.Write(content);
    }
    catch { }
    finally
    {
        sw.Dispose();
        stringWriter.Dispose();
        htmlWriter.Close();
        htmlWriter.Dispose();
    }

}
```

4.运用下面的类来生成pdf字节

```C#
public class MyPDFGenerator
{
    public static byte[] Create(string sUrl)
    {
        try
        {
            PdfConverter pdfConverter = new PdfConverter();
            // set the license key - required
            //pdfConverter.LicenseKey = "P38cBx6AWW7b9c81TjEGxnrazP+J7rOjs+9omJ3TUycauK+cLWdrITM5T59hdW5r";//test key, add by tieli

            pdfConverter.LicenseKey = "oYqQgZCBlpeBlY+RgZKQj5CTj5iYmJg=";
            // set the converter options - optional
            pdfConverter.PdfDocumentOptions.PdfPageSize = PdfPageSize.A4;
            pdfConverter.PdfDocumentOptions.PdfCompressionLevel = PdfCompressionLevel.NoCompression;
            pdfConverter.PdfDocumentOptions.PdfPageOrientation = PDFPageOrientation.Portrait;
            pdfConverter.PdfDocumentOptions.ShowHeader = false;
            pdfConverter.PdfDocumentOptions.ShowFooter = false;
            pdfConverter.PdfDocumentOptions.AutoSizePdfPage = true;
            // set to generate selectable pdf or a pdf with embedded image - optional
            pdfConverter.PdfDocumentOptions.GenerateSelectablePdf = true;
            // set the embedded fonts option - optional, by default is false
            pdfConverter.PdfDocumentOptions.EmbedFonts = false;
            // enable the live HTTP links option - optional, by default is true
            pdfConverter.PdfDocumentOptions.LiveUrlsEnabled = true;
            // enable the support for right to left languages , by default false
            pdfConverter.RightToLeftEnabled = false;


            pdfConverter.PdfDocumentInfo.AuthorName = "Telamon Global, Inc.";

            // add HTML header
            //if (cbAddHeader.Checked)
            // AddHeader(pdfConverter);
            //// add HTML footer
            //if (cbAddFooter.Checked)
            // AddFooter(pdfConverter);

            // Performs the conversion and get the pdf document bytes that you can further 
            // save to a file or send as a browser response
            byte[] pdfBytes = pdfConverter.GetPdfFromUrlBytes(sUrl);
            //byte[] pdfBytes = pdfConverter.GetPdfBytesFromHtmlFile(@"D:\Peter\Projects\TGSAPSystem\Code\HKOMS\Web Site\Quotes\aaaa.html");
            //byte[] pdfBytes = pdfConverter.GetPdfBytesFromHtmlString(html);


            // get the html string for the report
            //StringWriter htmlStringWriter = new StringWriter();
            //Server.Execute("InvoiceTemplate.aspx", htmlStringWriter);
            //string htmlCodeToConvert = htmlStringWriter.GetStringBuilder().ToString();
            //htmlStringWriter.Close();

            //string baseUrl = GetAbsoluteUrl(url);

            //SplendidError.SystemError(new StackTrace(true).GetFrame(0), baseUrl);
            // get the pdf bytes from html string
            //byte[] pdfBytes = pdfConverter.GetPdfBytesFromHtmlString(url);

            return pdfBytes;
        }
        catch 
        {
        	return null;
        }
    }
}
```



5.调用方法

``` C#
byte[] bytes = MyPDFGenerator.Create(Server.MapPath("../Upload/POSDemo.html"));
```

6.最后导出pdf

 ``` C#
System.Web.HttpResponse response = System.Web.HttpContext.Current.Response;
response.Clear();
response.AddHeader("Content-Type", "binary/octet-stream");
response.AddHeader("Content-Disposition",
"attachment; filename=" + fileName + ".pdf; size=" + bytes.Length.ToString());
response.Flush();
response.BinaryWrite(bytes);
response.Flush();
response.End();
 ```


http://www.cnblogs.com/linxianfeng/p/4710241.html
