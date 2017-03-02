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
            $('#data_table').tableExport({ type: 'excel', escape: 'false',fileName:'最新消费记录' });
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
            $('#zj_table').tableExport({ type: 'excel', escape: 'false',fileName:'最新消费记录' });
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