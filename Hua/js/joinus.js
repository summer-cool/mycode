$(document).ready(function() {
    var str1 = 0,
        str2 = 0,
        str3 = 0,
        str4 = 0;
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

    document.onreadystatechange = subSomething;
    var num = 0,
        add = 1;
    window.sr = ScrollReveal({
        reset: false,
    }); //初始化scrollreveal
    var left = {
        delay: 200,
        distance: '90px',
        origin: 'left',
        duration: 300,
        opacity: 0,
        easing: 'ease-in-out',
    };
    var right = {
        delay: 200,
        distance: '90px',
        origin: 'right',
        duration: 300,
        opacity: 0,
        easing: 'ease-in-out',
    };
    var rotate = {
        delay: 200,
        distance: '30px',
        origin: 'bottom',
        duration: 300,
        opacity: 0,
        easing: 'ease-in-out',
    };
    var numS;

    function subSomething() {
        if (document.readyState == "complete") { //当页面加载状态为完全结束时隐藏加载动画
            $('.circle_div').addClass("rotateZ");
            numS = setInterval(function() {
                str4++;
                switch (str4) {
                    case 0:
                        numAdd(num, str4);
                        break;
                    case 1:
                        numAdd(str1, str4);
                        break;
                    case 2:
                        numAdd(str2, str4);
                        break;
                    case 3:
                        numAdd(str3, str4);
                        break;
                    case 4:
                        numAdd(str4, str4);
                        clearInterval(numS);
                        break;
                }
            }, 1500);
        };
    };
    function numAdd(num, str4) {
        var setNum = setInterval(function() {
            num++;
            if (num == 100) {
                num = 100;
                clearInterval(setNum);
            }
            $('.circle_num').eq(str4 - 1).html(num + "%");
        }, 10);
    };
    sr.reveal('.wb', left);
    sr.reveal('.wx', right);
    if (isMobile.any() == false) { //pc时
        // 环境图片效果
        $(".hj_img").mousemove(function() {
            $(this).addClass("img_hover");
            $(this).siblings(".hj_img").addClass("img_back");
            $(this).mouseout(function() {
                $(this).removeClass("img_hover");
                $(this).siblings(".hj_img").removeClass("img_back");
            })
        });
        // 帅哥美女图片效果
        $(".sg_img").mousemove(function() {
            $(this).addClass("img_hover");
            $(this).siblings(".sg_img").addClass("img_back");
            $(this).mouseout(function() {
                $(this).removeClass("img_hover");
                $(this).siblings(".sg_img").removeClass("img_back");
            })
        });
        // 美食图片效果
        $(".ms_img").mousemove(function() {
            $(this).addClass("img_hover");
            $(this).siblings(".ms_img").addClass("img_back");
            $(this).mouseout(function() {
                $(this).removeClass("img_hover");
                $(this).siblings(".ms_img").removeClass("img_back");
            })
        });
        // 我们的生活方式
        $(".sh_img").mousemove(function() {
            $(this).addClass("img_hover");
            $(this).siblings(".sh_img").addClass("img_back");
            $(this).mouseout(function() {
                $(this).removeClass("img_hover");
                $(this).siblings(".sh_img").removeClass("img_back");
            })
        });
        //分区切换
        $(".fenqu").click(function() {
                var index = $(this).index();
                $(".we_day").removeClass("welifi_show");
                $(".sanjiao").removeClass("show_sanjiao");
                $(".we_day").eq(index).addClass("welifi_show");
                $(".sanjiao").eq(index).addClass("show_sanjiao");
                if (index > 1) {
                    $('.welife').css({
                        "background": "url(imgs/welife_bg_1.jpg) no-repeat",
                        "background-size": "cover",
                    })
                } else {
                    $('.welife').css({
                        "background": "url(imgs/welife_bg_2.jpg) no-repeat",
                        "background-size": "cover",
                    })
                }
            })
            // 打开我们日常
        $('.our_day span').click(function() {
            $(".join_us_2").show();
            $(".join_us_1").hide();
        })
    };
    //关闭
    $(".close_btn").click(function() {
        $(".join_us_2").fadeOut();
        $(".join_us_1").fadeIn();
        num=0;
        str1 = 0;
        str2 = 0;
        str3 = 0;
        str4 = 0;
        $('.circle_num').html(0 + "%");
        subSomething();
    });
})