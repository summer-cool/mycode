$(document).ready(function() {
    var index = 0, //定义下标志值
        charg1 = 1,
        charg2 = 2,
        charg3 =3,
        channelName = "所有",//选择的渠道名称
        zoneName = "所有",//选择的区服名称
        zone,
        channel,
        startDate, //开始日期
        endDate;//结束日期;
    //日期选择器
    var dateRange = new pickerDateRange('date_calendar', {
        aYesterday: 'aYesterday', //昨天
        aRecent7Days: 'aRecent7Days', //最近7天
        aRecent90Days: 'aRecent90Days', //最近90天
        aRecent30Days: 'aRecent30Days', //最近30天
        isTodayValid: false,
        startDate: '2016-01-01',
        endDate: '2016-09-01',
        //needCompare : true,
        //isSingleDay : true,
        //shortOpr : true,
        defaultText: ' 至 ',
        inputTrigger: 'input_trigger',
        theme: 'ta',
        success: function(obj) {
            $('.daychoose li').removeClass("choose_Li");
            $("#dCon_demo3").html('开始时间 : ' + obj.startDate + '<br/>结束时间 : ' + obj.endDate);
            startDate = obj.startDate;
            endDate = obj.endDate;
        }
    });
    //日期天数选择效果切换
    $('.daychoose li').click(function() {
        $(this).siblings("li").removeClass('choose_Li');
        $(this).addClass("choose_Li");
    });
    //数据选择加载相应table
    $('.choose_ul li').click(function() {
        index = $(this).index();
        $(this).siblings("li").removeClass("choosed_li");
        $(this).addClass("choosed_li");
        $('.choose_div').eq(index).siblings('.choose_div').removeClass("show_dataDiv");
        $('.choose_div').eq(index).addClass("show_dataDiv");
        //选择加载相应的数据
        if (index == 1&&charg1 == 1) {
            charg1 = 0;
        } else if (index == 2&& charg2 == 2) {
            charg2 = 1;
        }else if (index == 0&& charg3 == 3) {
            charg3 = 1;
        }
    });
 
    //选择渠道和区服
    $('.sx_btn').click(function(){
        channelName = $('.chanel_choose').find("option:selected").text();
        channel =$('.chanel_choose').find("option:selected").val();
        $('.c_ul').find("li").html(channelName);
        zoneName = $('.server_choose').find("option:selected").text();
        $('.f_ul').find("li").html(zoneName);
        zone = $('.server_choose').find("option:selected").val();
        //刷新数据
    });
        
    var chanelStr = "<li>"+channelName+"</li>";
    var zoneStr = "<li>"+zoneName+"</li>";
    //添加
    $('.c_ul').append(chanelStr);
    $('.f_ul').append(zoneStr);

    // 滚动到达底部出现gotop
    $(document).scroll(function(){
        if ($(document).scrollTop()>60) {
            $('.gotop').show();
        }else{
            $('.gotop').hide();
        }
    });
    $('.gotop').click(function(){
        $(document).scrollTop(0);
    });
    // 下载excel表格数据(小时统计)
    $('.download_jb').click(function(){
        if(window.ActiveXObject || "ActiveXObject" in window){
            var curTbl = document.getElementById("data_table");
            var oXL = new ActiveXObject("Excel.Application");

            var oWB = oXL.Workbooks.Add();
            var oSheet = oWB.ActiveSheet;
            var sel = document.body.createTextRange();
            sel.moveToElementText(curTbl);
            sel.select();
            sel.execCommand("Copy");
            oSheet.Paste();
            oXL.Visible = true;
        }else{
            $('#data_table').tableExport({ type: 'excel', escape: 'false',fileName:'基本信息' });
        }
    });
     // 下载excel表格数据(新增用户信息)
    $('.download_yh').click(function(){
        if(window.ActiveXObject || "ActiveXObject" in window){
            var curTbl = document.getElementById("zj_table");
            var oXL = new ActiveXObject("Excel.Application");

            var oWB = oXL.Workbooks.Add();
            var oSheet = oWB.ActiveSheet;
            var sel = document.body.createTextRange();
            sel.moveToElementText(curTbl);
            sel.select();
            sel.execCommand("Copy");
            oSheet.Paste();
            oXL.Visible = true;
        }else{
            $('#zj_table').tableExport({ type: 'excel', escape: 'false',fileName:'新增用户信息' });
        }
    });
    // 提示
    $('.explan').click(function(){
        $(this).find('.explan_box').toggle();
    });
    var ck =1;
    $('.openid_choose').click(function(){
        $(this).toggleClass("openid_choosed");
        if (ck ==1) {
            $(this).children("input").prop("checked", true);
            ck = 0;
        }else if (ck == 0) {
             $(this).children("input").prop("checked", false);
            ck = 1;
        }
    })
})