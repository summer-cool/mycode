require(['zepto','iscroll'],function(zepto,iscroll){
    $(document).ready(function() {
            var myScroll,addScroll;
            myScroll = new iscroll('#wrapper', {
                useTransition: false,
                zoom: true,
            });
            document.addEventListener('touchmove', function(e) {
                e.preventDefault();
            }, false);
        })
})
    
