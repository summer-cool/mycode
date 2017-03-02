$(function() {  
    FastClick.attach(document.body);  
});
$(document).ready(function() {
    //服务器和uid部分
    //获取服务器接口
    var url = "http://192.168.98.115:8080/web_pay/gash/getServers";
    //提交服务器和uid接口
    var sendUrl = "http://192.168.98.115:8080/web_pay/gash/getPayWays_1013_1046";
    //订单确认接口
    var dindanUrl = "http://192.168.98.115:8080/web_pay/gash/getOrderData_1013_1046";
    //确认订单提交接口
    var dindanSure = "https://stage-api.eg.gashplus.com/CP_Module/ShowMessage.aspx";
    //返回的服务器id
    var serversid,
    //返回值用户uid
    uid_input,
    //返回的充值方式id
    paywayid,
    //返回的充值金额id
    itemid,
    //返回的ATA
    DATA,
    //角色等级
    LevelValue,
    //uid对应的玩家账号名
    nameValue,
    //充值方式
    chargewayValue,
    //充值金额
    chanrgeMoney;
    //提交uid和服务器选择ajax
    $('.uid_button').click( function() {
        uid_input = $('.uid_input').val();
        var reg = /^[0-9]*$/;
        if (uid_input == "") {
            $(".uid_li_3 span").eq(0).html("提示:");
            $(".uid_li_3 span").eq(1).html("请输入您的uid");
        } else if (!reg.test(uid_input)) {
            $(".uid_li_3 span").eq(0).html("提示:");
            $(".uid_li_3 span").eq(1).html("uid只能为数字,请核对后再输入!");
        };
        //uid通过后调用ajax
        if (uid_input != '' && reg.test(uid_input)) {
            sendAjax(sendUrl, uid_input);
        };
    });
    //uidbutoon提交前清空错误提示
    $('.uid_input').bind("input propertychange", function() {
        $(".uid_li_3 span").eq(0).html("");
        $(".uid_li_3 span").eq(1).html("");
    });
  //充值方式选择部分
    function sendAjax(url, uid) {
        //加载动画开启
        loadAnimation();
        $.ajax({
            type: "POST",
            datatype: "json",
            url: url,
            data: {
                uid: uid,
            },
            success: function(data) {
                var data = eval(data);
                //关闭加载动画
                cloesAnimation();
                //提交uid成功后进入支付渠道
                if (data.result == 1) {
                    $('.index').hide();
                    $(".chuzhifangshi").show();
                    LevelValue = data.level;
                    $('.LevelValue').html(LevelValue);
                    $('.roleVip').html(data.vip);
                    rechargeWay(data);
                    nameValue = data.name;
                }else{
                    $(".uid_li_3 span").eq(0).html("提示:");
                    $(".uid_li_3 span").eq(1).html("请输入正确的uid!");
                };
            },
            error: function() {
                alert("提交失败，请稍后再试!");
                cloesAnimation();
            }
        });
    };
    //将获取的充值方式加载到dom
    function rechargeWay(data){
        var str='';
        for(var i in data.payways){
         str += "<li payid="+data.payways[i].paywayid+" class='animated fadeInLeft'>" +
            "<span>" + data.payways[i].name + "</span>" +
            "<img class='navUl_img chanrge_img' src='imgs/arror1.png' alt='' />" +
            "</li>";
        };
        $(".rechanrgeWay").append(str);
        $(".rechanrgeWay").find("li").click(function(){
            var index = $(this).index();
            //选择充值方式id值
            var chanrgeId =index+1;
        });
        chooseChaneway(data);
    };
    //选择充值方式后跳转至充值金额界面
   function chooseChaneway(data){
    $(".rechanrgeWay").find('li').click(function(){
        var index = $(this).index();
        paywayid = $(this).attr("payid");
        //隐藏充值方式界面
        $('.chuzhifangshi').hide();
        //打开充值金额界面
        $('.chuzhijinePart').show();
        // $('.LevelValue').html(LevelValue);
        // $('.roleVip').html(data.vip);
        chargewayValue = $(".rechanrgeWay span").eq(index).html();
        $('.chargeWay').html(chargewayValue);
        chargeMonny(data);
    });
    //点击效果
     $('.rechanrgeWay li').bind('touchstart', function() {
            var index = $(this).index();
            $(this).addClass('touchLi');
            $('.chanrge_img').eq(index).attr('src', 'imgs/arror2.png')
        });
    $('.rechanrgeWay li').bind('touchend', function() {
            var index = $(this).index();
            $(this).addClass('touchLi');
            $(this).removeClass('touchLi');
            $('.chanrge_img').eq(index).attr('src', 'imgs/arror1.png');
        });
    //控制li加载动画延迟
    loadMcontrol('.rechanrgeWay');
   };
   //充值金额界面part
    function chargeMonny(data){
        var str="";
        for(var i in data.items){
         str += "<li item="+data.items[i].itemid+" class='animated fadeInLeft'>" +
            "<span>" + data.items[i].remark + "新台幣</span>" +
            "<span class='cash'>"+data.items[i].cash+"(鑽石)</span>"+
            "<img class='navUl_img jine_img' src='imgs/arror1.png' alt='' />" +
            "</li>";
        };
        $('.jinePart').append(str);
        makeSure();
    };
    //跳转至确认订单界面
    function makeSure(){
        $('.jinePart li').click(function(){
            var index = $(this).index();
            itemid = $(this).attr("item");
            //获取充值金额值
            chanrgeMoney = $(".jinePart").find('.cash').eq(index).html();
            //调用获取订单编号接口ajax并传值
            dindanAjax(dindanUrl,serversid,paywayid,itemid);
        });
    //点击效果
     $('.jinePart li').bind('touchstart', function() {
            var index = $(this).index();
            $(this).addClass('touchLi');
            $('.jine_img').eq(index).attr('src', 'imgs/arror2.png')
        });
    $('.jinePart li').bind('touchend', function() {
            var index = $(this).index();
            $(this).addClass('touchLi');
            $(this).removeClass('touchLi');
            $('.jine_img').eq(index).attr('src', 'imgs/arror1.png');
        });
    //调用控制li加载动画延迟
        loadMcontrol('.jinePart');
    };
    //订单编号ajax
    function dindanAjax(url,servers,paywayid,itemid){
        //开启加载动画
        loadAnimation();
        $.ajax({
            type:"POST",
            datatype:"json",
            url:url,
            data:{
                serverid:serversid,
                uid:uid_input,
                paywayid:paywayid,
                itemid:itemid
            },
            success:function(data){
                //关闭动画
                cloesAnimation();
               if(data.result==1){
                //显示最后一页
                $('.last_page').show();
                $(".chuzhijinePart").hide();
                //显示订单页面详细信息
                $('.dd_number').html(data.orderid);
                $('.dd_chargeWay').html(chargewayValue);
                $('.dd_chargeM').html(chanrgeMoney);
                DATA = data.DATA;
                $('.dd_value').attr('value',DATA);
               }
            },
            error:function(){
                alert("服务器繁忙，请稍后再试！")
            }
        })
    };
    //控制li加载延迟动画封装
       function loadMcontrol(clas){
        var liLenth = $(clas).find('li').length;
        var lis = $(clas).find('li');
        var time = 0;
        for (var i = 0; i < liLenth; i++) {
            time += 0.03;
            lis[i].style.cssText = "animation-delay:" + time + "s";
        };
    };
    //加载动画开启
    function loadAnimation() {
        $('.spinner').show();
        $('.spinner_bg').show();
    };
    //加载动画关闭
    function cloesAnimation() {
        $('.spinner').hide();
        $('.spinner_bg').hide();
    };
    //上一步按钮控制page
    $('.chuzhifs').click(function(){
        $('.chuzhifangshi').hide();
        $('.rechanrgeWay li').remove();
        $('.index').show();
    });
    $('.chuzhije').click(function(){
        $('.chuzhijinePart').hide();
        $('.jinePart li').remove();
        $('.chuzhifangshi').show();
    });
     $('.dindanB').click(function(){
        $('.last_page').hide();
        $('.chuzhijinePart').show();
    });
});