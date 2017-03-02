$(document).ready(function() {
    window.sr = ScrollReveal({
        reset: false
    }); //初始化scrollreveal
    var left = {
        delay    : 200,
        distance : '90px',
        origin: 'left',
        duration:300,
        opacity:0,
        easing   : 'ease-in-out',
    };
     var right = {
        delay    : 200,
        distance : '90px',
        origin: 'right',
        duration:300,
        opacity:0,
        easing   : 'ease-in-out',
    };
    sr.reveal('.txt_p_1');
    sr.reveal('.txt2', {
        duration: 200
    });
    sr.reveal('.txt3', {
        duration: 300
    });
    sr.reveal('.txt_p_4', {
        duration: 400
    });
    sr.reveal('.txt_p_5', {
        duration: 500
    });
    sr.reveal('.txt4', {
        duration: 600
    });
     sr.reveal('.game_1', {
        duration: 200
    });
    sr.reveal('.game_2', {
        duration: 200
    });
    sr.reveal('.game_3', {
        duration: 200
    });
    sr.reveal('.wb',left);
    sr.reveal('.wx',right);
    var isMobile = {
        Android: function() {
            return navigator.userAgent.match(/Android/i) ? true : false;
        },
        BlackBerry: function() {
            return navigator.userAgent.match(/BlackBerry/i) ? true : false;
        },
        iOS: function() {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i) ? true : false;
        },
        Windows: function() {
            return navigator.userAgent.match(/IEMobile/i) ? true : false;
        },
        any: function() {
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Windows());
        }
    };
    if (isMobile.any() == false) {//pc时
          // 主页导航(关于我们和游戏)
        $(".shadow_C_1").mouseenter(function() {
            $('.back_g_1').addClass("bg_add");
            $('.bg_1').addClass("mg_scale");
            $('.link2').addClass("fade");
        });
        $(".shadow_C_1").mouseleave(function() {
            $('.back_g_1').removeClass("bg_add");
            $('.bg_1').removeClass("mg_scale");
            $('.link2').removeClass("fade");
        });
        $(".shadow_C_2").mouseenter(function() {
            $('.back_g_2').addClass("bg_add");
            $('.bg_2').addClass("mg_scale");
            $('.link3').addClass("fade");
        });
        $(".shadow_C_2").mouseleave(function() {
            $('.back_g_2').removeClass("bg_add");
            $('.bg_2').removeClass("mg_scale");
            $('.link3').removeClass("fade");
        });
    }else{
        // 主页导航(关于我们和游戏)
        $(".shadow_C_1").bind("touchstart",function() {
            $('.back_g_1').addClass("bg_add");
            $('.bg_1').addClass("mg_scale");
            $('.link2').addClass("fade");
            $('.back_g_2').removeClass("bg_add");
            $('.bg_2').removeClass("mg_scale");
            $('.link3').removeClass("fade");
        });

        $(".shadow_C_2").bind("touchstart",function() {
            $('.back_g_2').addClass("bg_add");
            $('.bg_2').addClass("mg_scale");
            $('.link3').addClass("fade");
             $('.back_g_1').removeClass("bg_add");
            $('.bg_1').removeClass("mg_scale");
            $('.link2').removeClass("fade");
        });
    };
  
    //详细信息效果
    $('.link_1').mouseover(function() {
        $(this).addClass("pulse");
    });
    $('.link_1').mouseout(function() {
        $(this).removeClass("pulse");
    });
    // 游戏手机样式
    if (isMobile.any() == true){//手机时
        $(".game_1").bind("touchstart touchmove",function(){
            $(this).find("p").css("color","#0468b3");
            $(this).find(".game_line").css("background","#0468b3");
            $(".game_2").find("p").css("color","#626262");
            $(".game_2").find(".game_line").css("background","#626262");
            $(".game_3").find("p").css("color","#626262");
            $(".game_3").find(".game_line").css("background","#626262");

        });
        $(".game_2").bind("touchstart touchmove",function(){
            $(this).find("p").css("color","#0468b3");
            $(this).find(".game_line").css("background","#0468b3");
            $(".game_1").find("p").css("color","#626262");
            $(".game_1").find(".game_line").css("background","#626262");
            $(".game_3").find("p").css("color","#626262");
            $(".game_3").find(".game_line").css("background","#626262");

        });
        $(".game_3").bind("touchstart touchmove",function(){
            $(this).find("p").css("color","#0468b3");
            $(this).find(".game_line").css("background","#0468b3");
            $(".game_1").find("p").css("color","#626262");
            $(".game_1").find(".game_line"). css("background","#626262");
            $(".game_2").find("p").css("color","#626262");
            $(".game_2").find(".game_line").css("background","#626262");
        });
    };
})