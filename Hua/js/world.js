$(document).ready(function() {
    document.onreadystatechange = subSomething;
    function subSomething() {
        if (document.readyState == "complete") { //当页面加载状态为完全结束时隐藏加载动画
            window.sr = ScrollReveal({
                reset: false,
                afterReveal:function(){
                  
                }
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
            sr.reveal('.wb', left);
            sr.reveal('.wx', right);
            //坐标
            $(".wd_zb").mouseenter(function(){
                var dd = $(this).attr("dd");
                 $(".wd_zb").attr("src","imgs/zuobiao.png");
                var imgsrc = "imgs/cn_"+dd+".png";
                $(this).attr("src",""+imgsrc+"");
                $('.zb_detial').fadeOut();
                $('.zb_detial').eq(dd-1).fadeIn();
            });
        };
    };
})