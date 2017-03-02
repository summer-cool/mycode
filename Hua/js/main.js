$(document).ready(function(){
    // 右侧菜单栏划入
    $(".nav_btn").click(function(){
        $("body").addClass("nav_move");
        $('.nav_bg').show();
    });
    $('.nav_bg').click(function(){
        $("body").removeClass("nav_move");
        $('.nav_bg').hide();
    });
    // 导航栏
    $(".nav_ul_2 li").mouseenter(function() {
        var index = $(this).index();
        $(".nav_ul_1 li").eq(index).addClass("change_li");
        $(this).mouseleave(function(){
            var index = $(this).index();
            $(".nav_ul_1 li").removeClass("change_li");
        });
    });
    //weixin
    $(".wx_link").click(function(event){
        event.stopPropagation();
        $('.weixin_div').fadeToggle();
    });
    $(document).click(function(event){
        event.stopPropagation();
        $(".weixin_div").fadeOut();
    });
       // 去顶部
    $('.gotop').click(function(){
        $(document).scrollTop(0);
    });
    //语言选择
    $(".langue_choose").click(function(){
        $('.langue_detial').fadeToggle();
    });
    $(".lan_ul li").click(function(){
        var index = $(this).index();
        $('.contry_C li').removeClass("lan_show");
        $('.contry_C li').eq(index).addClass("lan_show");
        $('.lan_ul li').removeClass("c_show");
        $('.lan_ul li').eq(index).siblings("li").addClass("c_show");
    });
});