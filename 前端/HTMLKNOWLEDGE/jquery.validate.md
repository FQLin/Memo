```javascript
var $jQval = $("#form1").validate();
//验证姓名
if (!$jQval.element($("#Name"))) {
    return false;
}
//验证手机
if (!$jQval.element($("#Mobile"))) {
    return false;
}

//修改jQuery.validator默认配置
//不建议写在 dom 加载完成后的事件中，可能会不起总用
jQuery.validator.setDefaults({
            ignore: ""
});
  
//配置通用的默认提示语  
$.extend($.validator.messages, {  
    required: '该项为必填项',  
    maxlength: $.validator.format("最大长度不能大于{0}个字符"),  
    minlength: $.validator.format("最小长度不能小于{0}个字符"),  
    rangelength: $.validator.format("字符长度必须在 {0} 和 {1} 之间"),  
    range: $.validator.format("数值必须在 {0} 和 {1} 之间"),  
    max: $.validator.format("数值不能大于 {0}"),  
    min: $.validator.format("数值不能小于 {0}")  
});
```

//ajax上传文件
```javascript
var data_validation = "unobtrusiveValidation";

function validate(form) {
    var validationInfo = $(form).data(data_validation);
    return !validationInfo || !validationInfo.validate || validationInfo.validate();
}

function onSuccess(data) {
    //doing something
}

$(document).on("submit", "form[data-ajax=true]", function (evt) {
    evt.preventDefault();
    if (!validate(this)) {
        return;
    }
    var formData = new FormData(this);
    $.ajax({
        url: this.action,
        type: this.method,
        data: formData,
        cache: false,
        processData: false,
        contentType: false
    }).success(function(data) {
        onSuccess(data);
        })
        .error(function () {
            alert("系统错误");
        });
});
```
