$('.tabUl li').bind("touchstart",function(){
    var index = $(this).index();
    $(this).addClass("tabLi").siblings("li").removeClass("tabLi");
    $('.tabDiv').eq(index).show().siblings(".tabDiv").hide();
})
$(document).ready(function(){
   var mySwiper = new Swiper('.swiper-container',{
        slidesPerView : 3,
        spaceBetween : 10,
    })
})