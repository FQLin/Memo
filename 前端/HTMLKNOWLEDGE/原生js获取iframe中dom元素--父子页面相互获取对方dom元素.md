### 1、父页面（demo.html），在父页面修改子页面div的背景色为灰色，原来为红色：

```html
<!DOCTYPE>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<title>demo主页面</title>
	<script type="text/javascript">
	window.onload = function(){
		var _iframe = document.getElementById('iframeId').contentWindow;
		var _div =_iframe.document.getElementById('objId');
		_div.style.backgroundColor = '#ccc';
	}
	
	</script>
</head>

<body>

<div id='parDiv'>父页面</div>
<iframe src="demo-iframe.html" id="iframeId" height="150" width="150"></iframe>  
</body>
</html>
```

### 2、子页面（demo-iframe.html），在子页面修改父页面div的字体颜色为红色，原来为黑色：

```html
<!DOCTYPE>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<title>子页面demo13-iframe.html</title>
	<script type="text/javascript">
	window.onload = function(){
		var _iframe = window.parent;
		var _div =_iframe.document.getElementById('parDiv');
		_div.style.color = 'red';
	}
	</script>
</head>

<body>
	<div id='objId' style='width:100px;height:100px;background-color:red;'>子页面</div>
</body>
</html>
```
