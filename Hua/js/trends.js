$(document).ready(function(){
    window.sr = ScrollReveal({
    reset: false,
    afterReveal:function(){
        $('.circle_1').addClass("rotateZ");
        $('.circle_2').addClass("rotateZ");
        $('.circle_3').addClass("rotateZ");
        $('.circle_4').addClass("rotateZ");
    }
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
    sr.reveal('.wb',left);
    sr.reveal('.wx',right);
    $('.carousel').carousel();
    $('.news_detial a').mouseover(function(){
        $(this).find("img").attr("src","imgs/news_arrow_2.png");
        $(this).find("li").css("border-bottom","1px solid #73c2f5");
        $(this).mouseout(function(){
            $(this).find("img").attr("src","imgs/news_arrow.png");
            $(this).find("li").css("border-bottom","1px solid #6d6c6c");
        })
    });
   
    $(document).scroll(function(){
        var scroll = $(document).scrollTop();
        if (scroll>350) {
            $('.goto_top').fadeIn();
        }else{
            $('.goto_top').fadeOut();
        }
    });
    $('.goto_top').click(function(){
         $('body,html').animate({scrollTop:0},300);
    })

});