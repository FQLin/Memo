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

//修改jQuery.validator默认的处理方法  
jQuery.validator.setDefaults({  
    event:"keyup",//触发校验的方式，可选值有keyup(每次按键时)，blur(当控件失去焦点时)  
    debug:true,//如果这个参数为true，那么表单不会提交，只进行检查，调试时十分方便.   
    ignore: "",  
    errorClass : 'help-block',    
    focusInvalid : true,  
    onclick : function (element) {  
        $(element).valid();  
    },  
    onfocusout: function (element) {  
        $(element).valid();  
    },  
    highlight : function(element) {  
        $(element).closest('.form-group').removeClass('has-success').addClass('has-error');  
    },  
    success : function(label) {    
        label.closest('.form-group').removeClass('has-error').addClass('has-success');    
        label.remove();    
    },    
    errorPlacement : function(error, element) {    
        element.parent('div').append(error);    
    }  
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