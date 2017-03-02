$(document).ready(function(){
    var loginUrl = "http://60.205.26.212/php/login.php";
    //输入用户名判断
    $('.user_input').bind("input propertychange", function() {
        var in_val = $(this).val();
        if (in_val.length>4||in_val.length==4) {
           $('.wrong_user').hide(); 
        }
    });
    //输入密码判断
    $('.pass_input').bind("input propertychange", function() {
        $('.wrong_pass').hide(); 
    });
    $('.user_input').blur(function(){
        var in_val = $(this).val();
        var str = /^[a-zA-Z\d]+$/;
        if (in_val.length<4) {
           $('.wrong_user').show(); 
        }else if (!str.test(in_val)) {
            $('.wrong_user').show();
        };
    });
    //点击登陆按钮
    $(".login_btn").click(function(){
        var user_val = $('.user_input').val();//输入的用户名
        var pass_val = $('.pass_input').val();//输入的密码
        var str = /^[a-zA-Z\d]+$/;
        //验证user的格式
        if (user_val.length<4) {
           $('.wrong_user').show(); 
        }else if (!str.test(user_val)) {
            $('.wrong_user').show();
        };
        //验证密码的格式
        if (pass_val == "") {
            $('.wrong_pass').show();
            $('.wrong_pass').html("你不输密码还想进?");
        }
        //验证用户
        UserAjax(loginUrl,user_val,pass_val);
    });
    function UserAjax(url,user_val,pass_val){
        $('.login_success').show();
        $('.login_box').hide();
        $.ajax({
            url:url,
            type:"POST",
            datatype:"json",
            data:{
                user:user_val,
                password:pass_val
            },
            success:function(data){
                var data = eval(data);
                setTimeout(function(){
                        $('.welcome').html("connecting..");
                    },1000);
                if (data.result == true) {
                    $('.login_box').hide();
                    setTimeout(function(){
                        $('.welcome').html("Welcome!");
                    },2000);
                    setTimeout(function(){
                        window.location = "http://192.168.6.188/MrKkk/Mgindex.html";
                    },3000);
                };
                if (data.result == false) {
                    $('.login_box').hide();
                    setTimeout(function(){
                        $('.welcome').html("wrong..");
                    },2000);
                    setTimeout(function(){
                        $('.login_box').show();
                        $('.login_success').hide();
                        $('.wrong_pass').show();
                        $('.wrong_pass').html("你的密码错了~");
                        $('.welcome').html("waiting..");
                    },3000);
                }
            },
            error:function(data){
                setTimeout(function(){
                        $('.login_box').show();
                        $('.login_success').hide();
                        $('.wrong_pass').show();
                        window.confirm("服务器出问题了<-_-!>~");
                        $('.welcome').html("waiting..");
                },2000);
            }
        });
    };
})