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
            $('#data_table').tableExport({ type: 'excel', escape: 'false',fileName:'用户实时状态' });
        }
    });
     // 下载excel表格数据(新增用户信息)
    $('.download_yh').click(function(){
        if(window.ActiveXObject || "ActiveXObject" in window){
            var curTbl = document.getElementById("hour_table");
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
            $('#hour_table').tableExport({ type: 'excel', escape: 'false',fileName:'用户实时状态' });
        }
    });
})