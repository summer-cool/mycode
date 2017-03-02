$(document).ready(function(){
     // 页面加载
    document.onreadystatechange = subSomething;

    function subSomething() {
        if (document.readyState == "complete") { //当页面加载状态为完全结束时隐藏加载动画
            $('.spinner').hide();
            $('.spinner_bg').hide();
        };      
    };
    //加载时间过长关闭加载动画
     if (setT) {
            clearTimeout(setT);
        };
        var setT = setTimeout(function() {
            $('.spinner').hide();
            $('.spinner_bg').hide();
    }, 10000);
    //资讯tab切换
    $(".mg_tb_li").click(function(){
        var index = $(this).index();
        $(this).addClass("mg_sp_li").siblings(".mg_tb_li").removeClass("mg_sp_li");
        $(".mg_div").eq(index).addClass("mg_show_div").siblings(".mg_div").removeClass("mg_show_div");
    });
    var mySwiper = new Swiper ('.swiper-container', {
        pagination: '.swiper-pagination',
        autoplay: 2000,
        paginationClickable: true,
        loop: true,
        // 如果需要分页器
        pagination: '.swiper-pagination',
        // 如果需要前进后退按钮
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        effect : 'coverflow',
        slidesPerView: 2,
        centeredSlides: true,
        coverflow: {
            rotate: 30,
            stretch: 10,
            depth: 60,
            modifier: 2,
            // slideShadows : true
        }
     });
})