$(document).ready(function() {
  document.onreadystatechange = subSomething;

  function subSomething() {
    $('.spinner').show();
    $('.spinner_bg').show();
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
  //联系客服滚动位置固定
  $(window).scroll(function(event) {
    if (setTop) {
      clearTimeout(setTop);
    };
    var setTop = setTimeout(function() {
      var winPos = $(window).scrollTop();
      $('.lxkf').css('top', '' + winPos + 'px')
    }, 200);
  });
  //点击客服弹窗
  $('.lxkf').click(function() {
    $('.kf_slider').show();
    $('.publick_bg').show();
  });
  $('.kf_closeBtn').click(function() {
    $('.kf_slider').hide();
    $('.publick_bg').hide();
  });
})