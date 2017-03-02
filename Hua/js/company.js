$(document).ready(function() {
    window.sr = ScrollReveal({
        reset: false,
        mobile: true
    }); //初始化scrollreveal
    var upshow = {
        delay: 200,
        distance: '20px',
        origin: 'bottom',
        duration: 300,
        opacity: 0,
        easing: 'ease-in-out',
    };
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
    sr.reveal('.mb', upshow);
    sr.reveal('.wb', left);
    sr.reveal('.wx', right);
    // 发展路程显示
    var index;
    $('.fadeshow_ul li').mouseover(function() {
        index = $(this).index();
        $(".road_detail").find(".fadeshow").removeClass("fadeIn");
        $(".road_detail").find(".fadeshow").eq(index).addClass("fadeIn");
    });
    $('.fadeshow_ul li').mouseout(function() {
        $(".road_detail").find(".fadeshow").removeClass("fadeIn");
    });
})