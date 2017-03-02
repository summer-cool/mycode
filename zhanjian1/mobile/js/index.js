$(document).ready(function() {
    var FrameRates = {
        film: 24,
        NTSC: 29.97,
        NTSC_Film: 23.98,
        NTSC_HD: 59.94,
        PAL: 25,
        PAL_HD: 50,
        web: 30,
        high: 60
    };
    debug = true;
    var mySwiper = new Swiper('.swiper_one', {
        // direction: 'vertical',
        loop: true,
        autoplay: 2000,
        // 如果需要分页器
        pagination: '.swiper-pagination',
    });
    var mySwiper = new Swiper('.swiper_two', {
        slidesPerView: 3,
        spaceBetween: 20,
        autoplay: 2000,
        // 如果需要前进后退按钮
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
    });
    // 游戏特色swiper
    var mySwiper = new Swiper('.swiper_3', {
        slidesPerView: 1,
        spaceBetween: 20,
        autoplay: 2000,
        // 如果需要前进后退按钮
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        pagination: '.swiper-pagination',
    });

    // 滚动
    $.fn.scrollTo = function(options) {
        var defaults = {
            toT: 0, //滚动目标位置
            durTime: 500, //过渡动画时间
            delay: 30, //定时器时间
            callback: null //回调函数
        };
        var opts = $.extend(defaults, options),
            timer = null,
            _this = this,
            curTop = _this.scrollTop(), //滚动条当前的位置
            subTop = opts.toT - curTop, //滚动条目标位置和当前位置的差值
            index = 0,
            dur = Math.round(opts.durTime / opts.delay),
            smoothScroll = function(t) {
                index++;
                var per = Math.round(subTop / dur);
                if (index >= dur) {
                    _this.scrollTop(t);
                    window.clearInterval(timer);
                    if (opts.callback && typeof opts.callback == 'function') {
                        opts.callback();
                    }
                    return;
                } else {
                    _this.scrollTop(curTop + index * per);
                }
            };
        timer = window.setInterval(function() {
            smoothScroll(opts.toT);
        }, opts.delay);
        return _this;
    };
    $('.up_1').click(function() {
        var row_1 = $(".up_m_1").offset().top - 200;
        $("body").scrollTo({
            toT: row_1
        });
    });
    $(".up_2").click(function() {
        var row_1 = $(".up_m_2").offset().top - 200;
        $("body").scrollTo({
            toT: row_1
        });
    });
    //新闻列表
    var newsUrl1 = "http://zjdg.sincetimes.com:8099/getInfoListByTypeName.do",//最新
        newsUrl2 = "http://zjdg.sincetimes.com:8099/getInfoListByTypeName.do?infoType=xinwen",//新闻
        newsUrl3 = "http://zjdg.sincetimes.com:8099/getInfoListByTypeName.do?infoType=gonggao",//公告
        newsUrl4 = "http://zjdg.sincetimes.com:8099/getInfoListByTypeName.do?infoType=huodong",//活动
        moreUrl = "http://zjdg.sincetimes.com:8099/infos.do?infoType=huodong";
    newsList(newsUrl1,"zuixin",0);
    // 新闻切换
    var aa = 1,
        bb = 1,
        cc = 1;
    $('.news_Li').click(function() {
        $(this).siblings(".news_Li").removeClass("news_a_li");
        $(this).addClass("news_a_li");
        $(this).siblings(".news_Li").find('.triangle-down').removeClass("arow_down");
        $(this).find('.triangle-down').addClass("arow_down");
        var index = $(this).index();
        $(".news_div").removeClass("news_div_show");
        $(".news_div").eq(index).addClass("news_div_show");
        if (index == 1 && aa == 1) {//新闻
            newsList(newsUrl2,"xinwen",index);
            aa = 0;
        }else if (index == 2 && bb == 1) {//公告
            newsList(newsUrl3,"gonggao",index);
            bb = 0;
        }else if (index == 3 && cc == 1) {//活动
            newsList(newsUrl4,"huodong",index);
            cc = 0;
        };
    });
 
    function newsList(url,type,index){    
        $.ajax({
            type:"GET",
            dataType:"json",
            url:url,
            headers:{
                Accept:"application/json, text/javascript, */*",
            },
            data:{
                infoType:type,
            },
            success:function(data){
                var data = eval(data);
                var str = "";
                for(var i=0;i<data.infoList.length;i++){
                    str+="<a href='http://zjdg.sincetimes.com:8099/info_detail.do?id="+data.infoList[i].id+"'>"+
                            "<li class='news_d_l'>"+
                              "<div class='left_div'>"+
                                "<div  class='t_ig t_ig_"+data.infoList[i].type+"'>"+
                                  "<span>"+data.tips+"</span>"+
                                  "<span class='triangle-right border_"+data.infoList[i].type+"'></span>"+
                               "</div>"+
                              "</div>"+
                            "<div class='right_div'>"+
                                "<ul>"+
                                  "<li class='rt_li_1'>"+data.infoList[i].title+"</li>"+
                                  "<li class='rt_li_2'>官方运营团队&nbsp;&nbsp;"+Time(data.infoList[i].date)+"</li>"+
                                "</ul>"+
                            "</div>"+
                            "</li>"+
                          "</a>";
                };
                str+="<a href='"+moreUrl+"'><p class='check_more'>查看更多></p></a>";
                // 最新
                $(".news_"+index+"").append(str);
            },
            error:function(data){
                var data = eval(data);
            }
        });
    };
    //时间转码
    function Time(time){
        var dt = new Date(time);
        var f_dt = dt.getFullYear()+"-"+(dt.getUTCMonth()+1)+"-"+dt.getDate();
        return f_dt;
    };
     //游戏展示swiper
    var mySwiper = new Swiper('.swiper_4', {
        slidesPerView: 1,
        spaceBetween: 20,
        autoplay: 2000,
        // 如果需要前进后退按钮
        // nextButton: '.swiper-button-next',
        // prevButton: '.swiper-button-prev',
        pagination: '.swiper-pagination',
        observer:true,//修改swiper自己或子元素时，自动初始化swiper  
        observeParents:true,//修改swiper的父元素时，自动初始化swiper  
        onSlideChangeEnd: function(swiper){  
            swiper.update();  
        }  
    });
    var mySwiper = new Swiper('.swiper_5', {
            slidesPerView: 1,
            spaceBetween: 20,
            autoplay: 2000,
            // 如果需要前进后退按钮
            // nextButton: '.swiper-button-next',
            // prevButton: '.swiper-button-prev',
            pagination: '.swiper-pagination',
             observer:true,//修改swiper自己或子元素时，自动初始化swiper  
            observeParents:true,//修改swiper的父元素时，自动初始化swiper  
            onSlideChangeEnd: function(swiper){  
                swiper.update();  
            }  
        });
    //游戏展示部分
    $(".gs_li").click(function() {
        var index = $(this).index();
        $(".gs_li").removeClass("gs_li_active");
        $(this).addClass("gs_li_active");
        $(".gs_div").removeClass("gs_div_show");
        $(".gs_div").eq(index).addClass("gs_div_show");
        $(".gs_span").removeClass("gs_span_active");
        $(".gs_span").eq(index).addClass("gs_span_active");
    });
    // 视频部分
    $('.v_img').click(function() {
        var num = $(this).attr("num");
        $(".game_v_div").removeClass("game_v_show");
        $(".game_v_div").eq(num).addClass("game_v_show");
    });
    // cg
    $(".index_video").click(function() {
        $('.video_bg').show();
        $(".video_container").show();
        var src = $(this).attr("url");
        $('#frame').show();
        $('#frame').attr("src", "" + src + "");
    });
    // 打开视频
    $(".video_start").click(function() {
        $('.video_bg').show();
        $(".video_container").show();
        var videoSrc = $(this).attr("url");
        $("#frame").attr("src", "" + videoSrc + "");
    });
    // 关闭视频
    $(".close_video").click(function() {
        $('.video_bg').hide();
        $(".video_container").hide();
        $("#frame").attr("src", "");
    });
    // 礼包领取打开弹窗
    $('.gift').click(function() {
        $('.lblq').show();
        $('.slider_bg').show();
        // $.ajax({
        //     url: "http://zjdg.sincetimes.com:8099/haizhan/dhm.do?",
        //     dataType: "json",
        //     type: "GET",
        //     data: {
        //         // email:"lijian",
        //     },
        //     success: function(data) {
        //         var data = eval(data);
        //         if (data.result == 1) {
        //             $('.lblq').show();
        //             $('.slider_bg').show();
        //         } else if (data.result == -1) {
        //             $('.jq_qd').show();
        //             $('.slider_bg').show();
        //         } else if (data.result == -2) {
        //             alert("礼包活动结束，下次再来哦!")
        //         }else if (data.result == 2) {//已经领取
        //             $(".cflq").show();
        //             $('.slider_bg').show();
        //         }
        //     },
        //     error:function(data){
        //         // alert("出错了，等等再试吧~")
                
        //     }
        // })
    });
    $(".lq_btn").bind("touchstart", function() {
        $(this).css({
            "tranform": "scale(0.8)",
            "-webkit-transform": "scale(0.8)",
            "-moz-transform": "scale(0.8)",
            "-ms-transform": "scale(0.8)"
        });
        $(this).bind("touchend", function() {
            $(this).css({
                "tranform": "scale(1)",
                "-webkit-transform": "scale(1)",
                "-moz-transform": "scale(1)",
                "-ms-transform": "scale(1)"
            });
        });
    });
    //手机礼包领取
    $('.lq_btn').click(function() {
        var phone = $('.phone_input').val();
        if (!(/^1(3|4|5|7|8)\d{9}$/.test(phone))) {
            alert("请输入正确手机号码!");
        } else {
            $.ajax({
                url: "http://zjdg.sincetimes.com:8099/haizhan/dhm.do?",
                dataType: "json",
                data: {
                    who: phone,
                },
                type: "POST",
                success: function(data) {
                    var data = eval(data);
                    if (data.result == 1) {
                        $(".lblq ").hide();
                        $('.code').html(data.code);
                        $(".lq_cg").show();
                    } else if (data.result == 2) {
                        $(".lblq ").hide();
                        $('.code').html(data.code);
                        $(".cflq").show();
                    } else if (data.result == 0) {
                        $(".lblq ").hide();
                        alert("礼包被抢完了，下次再来哦!");
                    }
                },
                error: function() {
                    alert("领取失败，请稍后再试!")
                }
            })
        };
    });
    // 关闭礼包窗口
    $('.gift_close').click(function() {
        $(".gift_slider").hide();
        $('.slider_bg').hide();
    });
    //菜单
    var m = 0;
    $(".menu_C").click(function(){
        if (m == 0) {
            $(".mune_sp_1").addClass("m_sp_1");
            $(".mune_sp_2").css("opacity","0");
            $(".mune_sp_3").addClass("m_sp_3");
            $(".menu_Div").show();
            $(".menu_bg").show();
            m = 1;
        }else if(m == 1){
            $(".mune_sp_1").removeClass("m_sp_1");
            $(".mune_sp_2").css("opacity","1");
            $(".mune_sp_3").removeClass("m_sp_3");
            $(".menu_Div").hide();
            $(".menu_bg").hide();
            m = 0;
        }
      
    });
});