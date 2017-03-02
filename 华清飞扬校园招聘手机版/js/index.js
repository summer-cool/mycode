$(document).ready(function() {
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
        $('.loading').hide();
        $('.load_bg').hide();
    }, 6000);
    $('.wp-inner').fullpage({
        change: function(e) {
            // 移除动画属性
            $('.page').eq(e.cur).find('.js-animate').each(function() {
                $(this).removeClass($(this).data('animate')).hide();
            });
        },
        afterChange: function(e) {
            // 添加动画属性
            $('.page').eq(e.cur).find('.js-animate')
                .each(function() {
                    $(this).addClass($(this).data('animate')).show();
            });
            if(e.cur==7){
                $('.jiantou_down').css({
                    "transform":"rotate(0deg)",
                    "-webkit-transform":"rotate(0deg)"
                });
                $('.main_text p').html("向下滑动继续预览");
            }else{
                 $('.main_text p').html("向上滑动继续预览");
                 $('.jiantou_down').css({
                    "transform":"rotate(180deg)",
                    "-webkit-transform":"rotate(180deg)"
                });
            }
        },

    });
})