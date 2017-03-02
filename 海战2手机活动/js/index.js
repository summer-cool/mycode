$(document).ready(function() {
    //获取当前用户url
    var s = window.location.href;
    //提取当前页面的openid sign isappinstalled值
    String.prototype.getQuery = function(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = this.substr(this.indexOf("\?") + 1).match(reg);
            if (r != null) return unescape(r[2]);
            return null;
        }
        //uid为获取的id值
    var openid = s.getQuery("openid");
    var sign = s.getQuery("sign");
    var isappinstalled = s.getQuery("isappinstalled");
    //进度条进度 头像url
    var urlF = "http://192.168.98.115:8084/bqjz";
    var zpUrl = "http://192.168.98.115:8084/drawone";
    //已获得奖励列表url
    var giftUrl = "http://192.168.98.115:8084/awards";
    //充值url
    var chargeUrl = "http://192.168.98.115:8084/cty_pay";
    //还剩抽奖次数
    //点击充值50元话费触发弹窗
    var tcUrl = "http://192.168.98.115:8084/canAccfifty";
    var lestNum;
    // 页面加载
    document.onreadystatechange = subSomething;

    function subSomething() {
        $('.loading').show();
        if (document.readyState == "complete") { //当页面加载状态为完全结束时隐藏加载动画
            $('.loading').hide();
        };
    };
     //加载时间过长关闭加载动画
    var closeTime = setInterval(closeLoad(),5000);
    function closeLoad(){
        if (closeTime) {
            clearInterval(closeTime);
        }
        $('.loading').hide();
    };
    //开始加载首页基本数据
    IndexAjax(urlF, openid, sign, isappinstalled);
    //控制音乐暂停播放
    var audio = $('#Audio')[0];
    var v = 0;
    $('#music_C').click(function() {

        if (v == 0) {
            audio.pause();
            $('#music_C').attr("src", "imgs/yinyue-1.png");
            v = 1;
            $('#music_C').css({
                "animation": "none",
            });
        } else if (v == 1) {
            audio.play();
            $('#music_C').attr("src", "imgs/yinyue-2.png");
            $('#music_C').css({
                "animation": "Mrotate 4s linear infinite;",
            })
            v = 0;
        }
    });
    //触摸自动播放音乐 （ios只有触发才播放音乐)
    $(document).trigger("click");
    $(document).click(function(){ 
        audio.play();
    }, false);
    function IndexAjax(url, uid, sign, isapp) {
        $('.loading').show();
        $.ajax({
            type: 'POST',
            dataType: "json",
            url: url,
            data: {
                openid: openid,
                sign: sign,
                isappinstalled: isapp
            },
            success: function(data) {
                var data = eval(data);
                lestNum = data.lefttimes;
                showProgress(data);
                $('.loading').hide();
                if (data.nowProgress > 0) {
                    $('.dl_jz').hide();
                    $('.dl_zp').show();
                };
                $(".list_num").html(data.fiftyleft+"份");
            },
            error: function() {
                alert("加载失败，请刷新再试!")
            }
        })
    };
    //进度条进度
    function showProgress(data) {
        $('.atlist_p').html(40 - data.nowProgress);
        var progressV = data.nowProgress * 0.072 * 2 + 20 * 0.072;
        $('.pw_add').css({
            "marginLeft": "" + progressV + "rem"
        });
        var persentV = progressV + 0.3;
        $('.pw_number').css({
            "marginLeft": "" + persentV + "rem"
        });
        var persentNum = 0;
        var Nlenth = data.nowProgress * 2 + 20;
        var numAdd = setInterval(function() {
            persentNum++;
            if (persentNum == Nlenth) {
                clearInterval(numAdd);
            };
            $('.pw_number').html(persentNum + "%");
        }, 50)

    };
    // 好友助力提示界面
    $('.yq_btn').click(function() {
        $('.hy_bg').show();
        $('.hy_zlImg').show();
    });
    $('.hy_zlImg').click(function() {
            $('.hy_bg').hide();
            $('.hy_zlImg').hide();
        })
        //大转盘part
    $('.dl_jz').click(function() {
        $(this).hide();
        $('.dl_zp').show();
    });
    $('.dl_zp').click(function() {
        $('.zp_bg').show();
        $('.zp_C').show();
        $('.chouJ_num').html(lestNum);
    });
    var s =1;
    //开始抽奖
    var ZhuanP = function (){
        //所有动画9s结束后重置
        var time=9000;
        if(zpSetTime){
            clearTimeout(zpSetTime);
        };
        $('.start_zp').unbind("click");
        $('.loading').show();
        zhuanpanAjax(zpUrl,openid, sign, isappinstalled);
        var zpSetTime = setTimeout(function(){
            $('.start_zp').click(ZhuanP);
            //移除闪烁动画
            $('.zp_rota').removeClass("zp_rotate");
            //重置转盘位置
            $('.zp_rota').css({
                "-webkit-transform":"rotate(225deg)",
                "transform":"rotate(225deg)",
                "opacity":"0",
                "-webkit-transition":"none",
                "transition":"none",
            });
        },time);
    };
    $('.start_zp').click(ZhuanP);
    function zhuanpanAjax(url,openid, sign, isapp,s) {
        $.ajax({
            type: "POST",
            dataType: 'json',
            url: url,
            data: {
                openid: openid,
                sign: sign,
                isappinstalled: isapp
            },
            success: function(data) { 
                $('.loading').hide();
                var data = eval(data);
                console.log(data)
                if(data.result==1){
                   zhuanpanShow(data); 
                }
            },
            error: function() {
                alert("加载失败，请刷新再试!");
                $('.loading').hide();
            }
        });
    };
    //转盘动画并显示剩余抽奖次数
    function zhuanpanShow(data) {
        //跟新抽奖剩余次数
        lestNum = data.lefttimes;
        $('.chouJ_num').html(lestNum);
        //获取奖品id
        var award_id = parseInt(data.award_id);
        var rotaDeg = award_id*45+6*360+225;
        if(award_id>0){
             $('.zp_rota').css({
                "opacity":"1",
                "transform":"rotate("+rotaDeg+"deg)",
                "-webkit-transform":"rotate("+rotaDeg+"deg)",
                "-webkit-transition":"transform 6s ease-out",
                "transition":"transform 6s ease-out",
            });
            setTimeout(function(){
                $('.zp_rota').addClass('zp_rotate');
            },6000)
        }else if(data.lefttimes==0){
            alert('抽奖次数已用完!');
        };
    };
    // 关闭抽奖页面
    $('.zp_close').click(function() {
        $('.zp_bg').hide();
        $('.zp_C').hide();
    });
    //定义需要动态加载的奖励物品
    //金币
    var jinBi = "<div class='jl_xyyt'>"+
                    "<ul>"+
                        "<li>"+
                          "<span class='jl_jbnumber jl_number'></span>"+
                          "<span class='jl_mc'>奖励名称</span>"+
                          "<img class='jl_text' src='imgs/jingbi.png' alt=''>"+
                        "</li>"+
                        "<li class='jl_li'>"+
                            "<img class='jl_img' src='imgs/jingbi1.png' alt=''>"+
                        "</li>"+
                        "<li class='jl_ma'>"+
                            "<span class='jl_jbno'></span>"+
                            "<span class='jl_changan'>长按复制</span>"+
                        "</li>"+
                    "</ul>"+
                "</div>";
    //钻石
    var zuanShi = "<div class='jl_xyyt'>"+
                    "<ul>"+
                        "<li>"+
                          "<span class='jl_zsnumber jl_number'></span>"+
                          "<span class='jl_mc'>奖励名称</span>"+
                          "<img class='jl_text' src='imgs/zhuanshi.png' alt=''>"+
                        "</li>"+
                        "<li class='jl_li'>"+
                            "<img class='jl_img' src='imgs/zhuanshi1.png' alt=''>"+
                        "</li>"+
                        "<li class='jl_ma'>"+
                            "<span class='jl_zsNo'></span>"+
                            "<span class='jl_changan'>长按复制</span>"+
                        "</li>"+
                    "</ul>"+
                "</div>";
    //中级特工令
    var zjTegong = "<div class='jl_xyyt'>"+
                    "<ul>"+
                        "<li>"+
                          "<span class='jl_zjnumber jl_number'></span>"+
                          "<span class='jl_mc'>奖励名称</span>"+
                          "<img class='jl_text' src='imgs/zhongjitegongling.png' alt=''>"+
                        "</li>"+
                        "<li class='jl_li'>"+
                            "<img class='jl_img' src='imgs/zhongjitegongling1.png' alt=''>"+
                        "</li>"+
                        "<li class='jl_ma'>"+
                            "<span class='jl_zjNo'></span>"+
                            "<span class='jl_changan'>长按复制</span>"+
                        "</li>"+
                    "</ul>"+
                "</div>";
    //高级特工令
    var gjTegong = "<div class='jl_xyyt'>"+
                    "<ul>"+
                        "<li>"+
                          "<span class='jl_gjnumber jl_number'></span>"+
                          "<span class='jl_mc'>奖励名称</span>"+
                          "<img class='jl_text' src='imgs/gaojitegongling.png' alt=''>"+
                        "</li>"+
                        "<li class='jl_li'>"+
                            "<img class='jl_img' src='imgs/gaojitegongling1.png' alt=''>"+
                        "</li>"+
                        "<li class='jl_ma'>"+
                            "<span class='jl_gjNo'></span>"+
                            "<span class='jl_changan'>长按复制</span>"+
                        "</li>"+
                    "</ul>"+
                "</div>";
    //寻宝证
    var xBao = "<div class='jl_xyyt'>"+
                    "<ul>"+
                        "<li>"+
                          "<span class='jl_xbnumber jl_number'></span>"+
                          "<span class='jl_mc'>奖励名称</span>"+
                          "<img class='jl_text' src='imgs/xunbao.png' alt=''>"+
                        "</li>"+
                        "<li class='jl_li'>"+
                            "<img class='jl_img' src='imgs/xunbao1.png' alt=''>"+
                        "</li>"+
                        "<li class='jl_ma'>"+
                            "<span class='jl_xbNo'></span>"+
                            "<span class='jl_changan'>长按复制</span>"+
                        "</li>"+
                    "</ul>"+
                "</div>";
    //十元话费
    var shiYuan = "<div class='jl_hf'>"+
              "<ul>"+
                  "<li>"+
                      "<span class='jl_synumber jl_number '></span>"+
                      "<span class='jl_mc'>获得十元话费</span>"+
                      "<button class='jl_ljczBtn' type='button'>立即充值</button>"+
                 " </li>"+
              "</ul>"+
          "</div>";
    //一元话费
    var yiYuan = "<div class='jl_hf'>"+
              "<ul>"+
                  "<li>"+
                      "<span class='jl_yynumber jl_number'></span>"+
                      "<span class='jl_mc'>获得一元话费</span>"+
                      "<button class='jl_ljczBtn jl_yiyuan' type='button'>立即充值</button>"+
                 " </li>"+
              "</ul>"+
          "</div>";
    //小原油桶
    var yuanYou = "<div class='jl_xyyt'>"+
                    "<ul>"+
                        "<li>"+
                          "<span class='jl_yuynumber jl_number'></span>"+
                          "<span class='jl_mc'>奖励名称</span>"+
                          "<img class='jl_text' src='imgs/yuanyou.png' alt=''>"+
                        "</li>"+
                        "<li class='jl_li'>"+
                            "<img class='jl_img' src='imgs/yuanyou1.png' alt=''>"+
                        "</li>"+
                        "<li class='jl_ma'>"+
                            "<span class='jl_yy'></span>"+
                            "<span class='jl_changan'>长按复制</span>"+
                        "</li>"+
                    "</ul>"+
                "</div>";                     
    //已获得奖励
    $('.zp_checkBtn').click(function() {
         $('.loading').show();
        //调用奖励列表ajax
        gistListAjax(giftUrl,openid, sign, isappinstalled);
    });
     //加载奖励列表
    function gistListAjax(url,openid, sign, isapp){
        $.ajax({
            type:"POST",
            dataType:"json",
            url:url,
            data:{
                openid: openid,
                sign: sign,
                isappinstalled: isapp
            },
            success:function(data){
                var data = eval(data);
                if (data.result==0) {
                    $('.loading').hide();
                }
                listShow(data);
                $('.loading').hide();
            },
            error:function(){
                alert("加载失败，请刷新再试!")
            }
        })
    };
    //将奖励列表渲染到页面
    function listShow(data){
        if (data.result==1) {
            $('.zp_bg').hide();
            $('.zp_C').hide();
            $('.get_bg').show();
            $('.get_part').show();
       
        var I = data.awards.length;
            for(var i =0;i<I;i++){
                console.log(data.awards[i].sn);
                 if(data.awards[i].sn==1){
                    $('.scroll_C').append(jinBi);
                    $('.jl_jbno').html(data.awards[i].no);
               }else if(data.awards[i].sn==2){
                    $('.scroll_C').append(xBao);
                    $('.jl_xbNo').html(data.awards[i].no);
               }else if(data.awards[i].sn==3){
                    $('.scroll_C').append(yiYuan);
               }else if(data.awards[i].sn==4){
                    $('.scroll_C').append(gjTegong);
                    $('.jl_gjNo').html(data.awards[i].no);
               }else if(data.awards[i].sn==5){
                    $('.scroll_C').append(yuanYou);
                    $('.jl_yy').html(data.awards[i].no);
               }else if(data.awards[i].sn==6){
                    $('.scroll_C').append(zjTegong);
                    $('.jl_zjNo').html(data.awards[i].no);
               }else if(data.awards[i].sn==7){
                    $('.scroll_C').append(shiYuan);
               }else if(data.awards[i].sn==8){
                    $('.scroll_C').append(zuanShi);
                    $('.jl_zsNo').html(data.awards[i].no);
               };
            };
        };
    };
    //添加充值弹窗内部
    var hfcz_charge = "<div><p class='hfcz_p_1'>输入领取话费的手机号</p>"+
     "<input class='hfcz_input' type='text' name=''>"+
     "<p class='hfcz_p_2'>(陕西、广东号码无法充值1元话费)</p>"+
     "<button class='hfcz_btn hfcz_charge' type=''>充值</button>"+
     "<button class='hfcz_btn hfcz_close' type=''>关闭</button></div>";
    //添加成功提示
    var hfcz_success ="<div><p class='hfcz_seccess'>充值成功!</p>"+
     "<button class='success_btn' type=''>关闭</button>";
    //添加失败提示
     var hfcz_fail ="<div><p class='hfcz_fail'>充值失败!</p>"+
     "<button class='fail_btn' type=''>返回</button>";
    //一元充值
    $('.jl_yiyuan').live("click",function(){
        $('.hfcz_bg').show();
        $('.hfcz_C').show();
        $('.hfcz_C').append(hfcz_charge); 
        //关闭充值弹窗
        $(".hfcz_close").live("click",function(){
            $('.hfcz_bg').hide();
            $('.hfcz_C').hide();
            $('.hfcz_C').find("div").remove();
        });
    });
     //充值触发
    $(".hfcz_charge").live("click",function(){
        var phnumber = $('.hfcz_C').find('.hfcz_input').val();
        var type = 1;
        var sortid = 1;
        var regN = /^[1][3,4,5,8][0-9]{9}$/;
        if(regN.test(phnumber)){
            chargeAjax(chargeUrl,openid,type,sortid,phnumber);
        }else{
            alert("请输入正确格式手机号码!");
        }
    });
   //充值Ajax
   function chargeAjax(url,openid, type, sortid,phnumber){
        $.ajax({
            type:"POST",
            datatype:"json",
            url:url,
            data:{
                openid: openid,
                type: type,
                sortid:sortid,
                mobile:phnumber,
            },
            success:function(data){
                var data = eval(data);
                console.log(data.result)
                if(data.result==1){               
                    //添加成功界面
                    $('.hfcz_C').find("div").remove();
                    $('.hfcz_C').append(hfcz_success);
                    $(".success_btn").live("click",function(){
                        $('.hfcz_bg').hide();
                        $('.hfcz_C').hide();
                        $('.hfcz_C').find("div").remove();
                    });
                }else if(data.result==0){
                    $('.hfcz_C').find("div").remove();
                    $('.hfcz_C').append(hfcz_fail);
                    $(".fail_btn").live("click",function(){
                        $('.hfcz_C').find("div").remove();
                        $('.hfcz_C').append(hfcz_charge);
                    });
                }
            },
            error:function(data){

            }
        });
   };
   //未到领奖时间弹窗
   $('.pw_yuan').click(function(){
        $(".loading").show();
    //调用50元话费检测接口
        FiveAjax(tcUrl,openid, sign, isappinstalled);
   });
   //FiveAjax
        function FiveAjax(url,openid,sign,isapp){
            $.ajax({
                type:"POST",
                dataType:"json",
                url:url,
                data:{
                    openid:openid,
                    sign:sign,
                    isappinstalled:isapp
                },
                success:function(data){
                     $(".loading").hide();
                    var data = eval(data);
                    console.log(data)
                    //调用领取条件判断
                    CanGet(data);
                },
                error:function(){
                     $(".loading").hide();
                     alert("加载失败,请刷新再试!")
                }
            })
        };
    //领取条件判断
    function CanGet(data){
        var result = data.result;
        if(result==0){
            alert("快去邀请好友助力，获取话费充值资格~");
        }else if(result==-3){
            alert("您已经领过~")
        }else if(result==-4){
            $('.ll_bg').show();
            $(".ll_C").show();
        }else if(result==1){
            var type=50,
                sortid=1,
                phone = $(".hfcz_input").value;
            //调取五十元充值
            chargeWushi();
        }
    };
    //五十元充值
    function chargeWushi(){
        $.ajax({
            type:"POST",
            datatype:"json",
            url:url,
            data:{
                openid: openid,
                type: type,
                sortid:sortid,
                mobile:phone,
            }
        })
    }
    // 关闭按钮关闭获得奖励界面
    $('.close_img').click(function() {
        $('.get_bg').hide();
        $('.get_part').hide();
        $('.scroll_C').find("div").remove();
    });
    //关闭各种弹窗
    //领奖时间
    $('.closeT').click(function(){
        $('.ts_bg').hide();
        $('.ts_C').hide();
    });
    //来晚一步
    $('.closeLl').click(function(){
        $('.ll_bg').hide();
        $('.ll_C').hide();
    });
    //二维码
    $('.erwe_close').click(function(){
        $('.erwei_bg').hide();
        $('.erwei_C').hide();
    })
});