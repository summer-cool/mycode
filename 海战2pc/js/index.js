$(document).ready(function(){
    var mySwiper = new Swiper ('.swiper-container', {
    // direction: 'vertical',
    loop: true,
    autoplay:2000,
    // 如果需要分页器
    pagination: '.swiper-pagination',
    paginationClickable :true,

    // 如果需要前进后退按钮
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',
    lazyLoading : true,
  });
    $('.swiper-container').mouseover(function(){
        $('.swiper-button-prev').show();
        $('.swiper-button-next').show();
    });
    $('.swiper-container').mouseout(function(){
        $('.swiper-button-prev').hide();
        $('.swiper-button-next').hide();
    });
    // 顯示隱藏服務窗
    var fw = 1;
    $('.fw_cloose').click(function(){
        if (fw==1) {
             $('.fw_slider').animate({
                "right":"-140px"
             });
             $('.triangle-right').css({
                "transform":"rotate(180deg)"
             });
             fw=0;
        }else if (fw==0) {
            $('.fw_slider').animate({
                "right":"0"
             });
             $('.triangle-right').css({
                "transform":"rotate(360deg)"
             });
             fw=1;
        }
    });
    // 服务弹窗随动
    $(window).scroll(function(){
        var top = $("body").scrollTop()+10;
        $('.fw_slider').css("top",""+top+"px")
    });
});