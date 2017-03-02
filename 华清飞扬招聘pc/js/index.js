$(document).ready(function() {
    // 全屏滚动   
    $('#fullpage').fullpage({
        menu: true,
        navigation: true,
        navigationPosition: 'right',
        continuousVertical: false,
        anchors: ['firstPage', 'secondPage', '3rdPage', '4rdPage', '5rdPage', '6rdPage'],
        navigationTooltips: ['首页', '公司介绍', '校招职位', '招聘流程', '宣讲会行程 ', ' Q&A',],
        onLeave: function(anchorLink, index) {
            if (index) {
                $('.hd_span').removeClass('hd_span_sp');
                $('.hd_span').eq(index - 1).addClass('hd_span_sp');
            };
        },
        afterLoad: function(anchorLink, index) {
            if (anchorLink=="6rdPage") {
                //箭头向上
                $('.jiantou').addClass('up_jiantou');
            }else{
                $('.jiantou').removeClass('up_jiantou');
            }
            switch (anchorLink) {
                // 第一页动画
                case "firstPage":
                // 移除其他页面动画
                $('.sc_2_title').hide();
                $('.sc_2_div').hide();
                $('.sc_3_title').hide();
                $('.sc_3_ul').hide();
                $('.sc_4_title').hide();
                $('.sc_4_text').hide();
                $('.sc_5_title').hide();
                $('.sc_5_text').hide();
                $('.sc_6_title').hide();
                $('.sc_6_text').hide();
                // 添加动画
                $('.text_img').show();
                $('.btn_1').show();
                break;
                // 第二页动画
                case "secondPage":
                // 移除其他页面动画
                $('.text_img').hide();
                $('.btn_1').hide();
                $('.sc_3_title').hide();
                $('.sc_3_ul').hide();
                $('.sc_4_title').hide();
                $('.sc_4_text').hide();
                $('.sc_5_title').hide();
                $('.sc_5_text').hide();
                $('.sc_6_title').hide();
                $('.sc_6_text').hide();
                // 添加动画
                $('.sc_2_title').show();
                $('.sc_2_div').show();
                break;
                 //第三页动画
                case "3rdPage":
                //移除其他页面动画
                $('.sc_2_title').hide();
                $('.sc_2_div').hide();
                $('.text_img').hide();
                $('.btn_1').hide();
                $('.sc_4_title').hide();
                $('.sc_4_text').hide();
                $('.sc_5_title').hide();
                $('.sc_5_text').hide();
                $('.sc_6_title').hide();
                $('.sc_6_text').hide();
                // 添加动画
                $('.sc_3_title').show();
                $('.sc_3_ul').show();
                break;
                // 第四屏动画
                case "4rdPage":
                //移除其他页面动画
                $('.sc_2_title').hide();
                $('.sc_2_div').hide();
                $('.text_img').hide();
                $('.btn_1').hide();
                $('.sc_3_title').hide();
                $('.sc_3_ul').hide();
                $('.sc_5_title').hide();
                $('.sc_5_text').hide();
                $('.sc_6_title').hide();
                $('.sc_6_text').hide();
                // 添加动画
                $('.sc_4_title').show();
                $('.sc_4_text').show();
                break;
                // 第五屏动画
                case "5rdPage":
                // 移除其他页面动画
                $('.text_img').hide();
                $('.btn_1').hide();
                $('.sc_2_title').hide();
                $('.sc_2_div').hide();
                $('.sc_3_title').hide();
                $('.sc_3_ul').hide();
                $('.sc_4_title').hide();
                $('.sc_4_text').hide();
                $('.sc_6_title').hide();
                $('.sc_6_text').hide();
                // 添加动画
                $('.sc_5_title').show();
                $('.sc_5_text').show();
                break;
                // 第六屏动画
                case "6rdPage":
                // 移除其他页面动画
                $('.text_img').hide();
                $('.btn_1').hide();
                $('.sc_2_title').hide();
                $('.sc_2_div').hide();
                $('.sc_3_title').hide();
                $('.sc_3_ul').hide();
                $('.sc_4_title').hide();
                $('.sc_4_text').hide();
                $('.sc_5_title').hide();
                $('.sc_5_text').hide();
                // 添加动画
                $('.sc_6_title').show();
                $('.sc_6_text').show();
                break;
            }
        }
    });
    // 鼠标滚动文本时禁止滚屏
    $('.sc_2_text').mouseover(function(){
        $.fn.fullpage.setAllowScrolling(false);
    });
      // 移除可滚屏
    $('.sc_2_text').mouseout(function(){
        $.fn.fullpage.setAllowScrolling(true);
    });
    $('.sc_6_text').mouseover(function(){
        $.fn.fullpage.setAllowScrolling(false);
    });
     // 移除可滚屏
    $('.sc_6_text').mouseout(function(){
        $.fn.fullpage.setAllowScrolling(true);
    });
    // 图片随动
    var $_window = $(window);
    var $main_visual = $('.section');
    var visualWidth = $main_visual.width();
    $main_visual.mousemove(function(e){
        var cursorX = e.clientX - $main_visual.offset().left;
        var cursorY = e.clientY - $main_visual.offset().top;
        var i=0.5;
        $(this).find('.boli').each(function(){
            var item_width = $(this).width();
            var wrapperWidth =$_window.width();
            var wrapperHeight =(wrapperWidth-0)/1.26;
            var centerX = wrapperWidth / 2;
            var centerY = wrapperHeight / 2;
            var newLeft = ((cursorX - centerX) * (i) / 100) * (-1);
            var newTop = (cursorY - centerY) * (i) / 100 * (-1);
            $(this).css({'transform':'translate3d('+newLeft+'px,'+ newTop+'px, 0)'});
            i= i*2; 
        });
    });
    // 显示和隐藏职位详情
    $('.sc_3_ul li').mouseover(function(){
        $(this).children('.alert_div').addClass("flipInX");
    });
     $('.sc_3_ul li').mouseleave(function(){
            $(this).children('.alert_div').removeClass("flipInX");
    })
    // 第四屏鼠标悬浮背景色
    // $('.zplc_bg').click(function(){
        
    // })
});