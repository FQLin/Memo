**DOM结构：**
```html
<a href="javascript:;" class="a-upload">
    <input type="file" name="" id="">点击这里上传文件
</a>

<a href="javascript:;" class="file">选择文件
    <input type="file" name="" id="">
</a>
```
**CSS样式1：**
```css
/*a  upload */
.a-upload {
    padding: 4px 10px;
    height: 20px;
    line-height: 20px;
    position: relative;
    cursor: pointer;
    color: #888;
    background: #fafafa;
    border: 1px solid #ddd;
    border-radius: 4px;
    overflow: hidden;
    display: inline-block;
    *display: inline;
    *zoom: 1
}

.a-upload  input {
    position: absolute;
    /*font-size: 100px;*/
    font-size:0;/*设置了input 的宽度之后，cursor属性将不会起作用，需要将font-size设置为0才行*/
    right: 0;
    top: 0;
    opacity: 0;
    filter: alpha(opacity=0);
    cursor: pointer
    width:100%;
    heigth:100%;
}

.a-upload:hover {
    color: #444;
    background: #eee;
    border-color: #ccc;
    text-decoration: none
}
```

**样式2：**

```css
.file {
    position: relative;
    display: inline-block;
    background: #D0EEFF;
    border: 1px solid #99D3F5;
    border-radius: 4px;
    padding: 4px 12px;
    overflow: hidden;
    color: #1E88C7;
    text-decoration: none;
    text-indent: 0;
    line-height: 20px;
}
.file input {
    position: absolute;
    font-size: 100px;
    right: 0;
    top: 0;
    opacity: 0;
}
.file:hover {
    background: #AADFFD;
    border-color: #78C3F3;
    color: #004974;
    text-decoration: none;
}
```

```javascript
$(".a-upload").on("change","input[type='file']",function(){
    var filePath=$(this).val();
    if(filePath.indexOf("jpg")!=-1 || filePath.indexOf("png")!=-1){
        $(".fileerrorTip").html("").hide();
        var arr=filePath.split('\\');
        var fileName=arr[arr.length-1];
        $(".showFileName").html(fileName);
    }else{
        $(".showFileName").html("");
        $(".fileerrorTip").html("您未上传文件，或者您上传文件类型有误！").show();
        return false 
    }
})
```
