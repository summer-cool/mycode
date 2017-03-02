$(document).ready(function() {
    document.onreadystatechange = subSomething;
    var i = -1;
    function subSomething() {
        if (document.readyState == "complete") { //当页面加载状态为完全结束时隐藏加载动画
            window.sr = ScrollReveal({
                reset: false,
                afterReveal: function() {
                    gameSlider(i);
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
            sr.reveal('.game_c');
            var mySwiper = new Swiper('.sweiper_1', {
                direction: 'vertical',
                loop: true,
                direction: 'horizontal',
                // 如果需要分页器
                pagination: '.swiper-pagination',
                autoplay: 2000,
                // 如果需要前进后退按钮
                nextButton: '.swiper-button-next',
                prevButton: '.swiper-button-prev',
            });
            var mySwiper = new Swiper('.mobile_swiper', {
                direction: 'vertical',
                loop: false,
                direction: 'horizontal',
                // 如果需要前进后退按钮
                nextButton: '.swiper-button-next',
                prevButton: '.swiper-button-prev',
            });
            //游戏列表翻转
            function gameSlider(i) {
                var St = setInterval(function() {
                    i++;
                    $(".game_li").eq(i).addClass("fanzhuan");
                    if (i == 9) {
                        clearInterval(St);
                    };
                }, 250);
            };
            $(".game_li").mouseover(function() {
                $(this).addClass("scale");
                $(this).mouseout(function() {
                    $(this).removeClass("scale");
                });
            });
            // 游戏选择
            $('.game_li').click(function(){
                var index = $(this).attr("key");
                $(".game_detail").removeClass("game_show");
                $(".game_detail").eq(index).addClass("game_show");
            })
        };
    };

})