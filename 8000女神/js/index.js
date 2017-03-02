$(document).ready(function() {
    document.onreadystatechange = subSomething;

    function subSomething() {

        if (document.readyState == "complete") { //当页面加载状态为完全结束时隐藏加载动画
            $('.loading').hide();
            $('.load_bg').hide();
        };
    };
    //加载时间过长关闭加载动画
    if (setT) {
        clearTimeout(setT);
    };
    var setT = setTimeout(function() {
        $('.loading').hide();
        $('.load_bg').hide();
    }, 6000);
    var mySwiper = new Swiper('.swiper-container', {
        speed: 1000,
        touchRatio: 1,
        onInit: function(swiper) {
            swiperAnimateCache(swiper); //隐藏动画元素 
            swiperAnimate(swiper); //初始化完成开始动画
        },
        onSlideChangeEnd: function(swiper) {
            swiperAnimate(swiper);
            //第二屏的时候
            if (swiper.activeIndex == 1) {
                $('.sd_two_C').addClass("sd_two_am");
                showHide();
            }else if(swiper.activeIndex!= 1){
                $('.sd_two_C').removeClass("sd_two_am");
                $('.slider_two').css({
                    "background": "url(imgs/2_bg_f.jpg)",
                    "backgroundSize": "100% 100%",
                });
                $('.sd_two_C').show();
            }
        }
    });
    //显示和隐藏图片、更换背景
    function showHide() {
        var t = setTimeout(function() {
            $('.slider_two').css({
                "background": "url(imgs/2_bg.jpg)",
                "backgroundSize": "100% 100%",
            });
        }, 3000);
    };
    //控制音乐暂停播放
    var audio = $('#Audio')[0];
    var v = 0;
    $('.control_C').click(function() {
        if (v == 0) {
            audio.pause();
            $('.volume_img').attr("src", "imgs/Volume2.png");
            v = 1;
            $('.volume_img').css({
                "animation": "none",
            });
        } else if (v == 1) {
            audio.play();
            $('.volume_img').attr("src", "imgs/Volume_1.png");
            $('.volume_img').css({
                "animation": "rotaM 4s linear infinite;",
            })
            v = 0;
        }
    });

    //触摸自动播放音乐 （ios只有触发才播放音乐)
    $(document).bind("touchstart", function() {
        audio.play();
        $(document).unbind();
    });


    $('.yue').click(function() {
        mySwiper.slideNext();
    });

});