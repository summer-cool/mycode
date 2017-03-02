$(document).ready(function(){
    var urlThree ="xiaoshitubiao.json",//图表json
        index = 0, //定义下标志值
        xAxi,
        dataTmp,
        charg1 = 1,
        charg2 = 2,
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
    //选择渠道和区服
    $('.sx_btn').click(function(){
        channelName = $('.chanel_choose').find("option:selected").text();
        channel =$('.chanel_choose').find("option:selected").val();
        $('.c_ul').find("li").html(channelName);
        zoneName = $('.server_choose').find("option:selected").text();
        $('.f_ul').find("li").html(zoneName);
        zone = $('.server_choose').find("option:selected").val();
    })
    var chanelStr = "<li>"+channelName+"</li>";
    var zoneStr = "<li>"+zoneName+"</li>";
    //添加
    $('.c_ul').append(chanelStr);
    $('.f_ul').append(zoneStr);
 
     // 提示
    $('.explan').click(function(){
            $(this).find('.explan_box').toggle();
    })
    //收入小时图表ajax
    //调用
    XschartAjax(urlThree,startDate, endDate, channel, zone);
    function XschartAjax(url,startDate, endDate, channel, zone){
        $.ajax({
            type:"GET",
            datatype:"json",
            url:url,
            data:{
                startDate: startDate,
                endDate: endDate,
                channel: channel,
                zoneid: zone
            },
            success:function(data){
                var data = eval(data);
                xAxi = data.xAxiss;
                dataTmp = data.yAxisCategories;
                HourChart(xAxi, dataTmp);
                chart2 = new Highcharts.Chart(chart);
            },
            error:function(){
                alert("获取失败，请刷新再试")
            }
        })
    };
    //收入小时统计chart
    function HourChart(xAxi, dataTmp) {
        chart = {
            credits: {
                text: null,
            },
            chart: {
                type: 'line',
                renderTo: 'chart_C',
                zoomType: 'xy',
                // inverted: false
            },
            exporting: {
                enabled: false
            },
            colors: ['#6CBA55', '#f4533c', '#4da1ff', '#1aba9b', '#64E572', '#FF9655',  '#6AF9C4'],
            title: {
                text: null,
            },
            subtitle: {
                text: null,
            },
            xAxis: {
                showFirstLabel: true,
                gridLineWidth: 1,
                title: {
                    text: null
                },
                categories: xAxi,
                lineColor: '#FFF',
                tickColor: '#FFF',
                maxPadding: 0.05,
                showLastLabel: true
            },

            yAxis: [{
                gridLineDashStyle: 'ShortDash',
                title: {
                    text: null,
                },
                labels: {
                    formatter: function() {
                        return this.value + '元';
                    }
                },
                lineWidth: 2
            }],
            legend: {
                align: 'center',
                verticalAlign: 'bottom',
                borderWidth: 0,
                floating: true,
                y: 20,
            },
            tooltip: {
                valueSuffix: '(元)',
                followPointer: true,
                shared: true,
                crosshairs: true,
                backgroundColor: '#535f6a',
                borderColor: 'black', // 边框颜色
                // borderRadius: 10, // 边框圆角
                // borderWidth: 3, // 边框宽度
                shadow: true, // 是否显示阴影
                style: { // 文字内容相关样式
                    color: "white",
                    fontSize: "12px",
                    fontWeight: "blod",
                    fontFamily: "Courir new"
                }
            },
            plotOptions: {
                series: {
                    marker: {
                        enable: false
                    }
                }
            },
            series: dataTmp,
        };
    };
     // 下载excel表格数据(小时)
    $('.download_hour').click(function(){
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
            $('#hour_table').tableExport({ type: 'excel', escape: 'false',fileName:'小时统计' });
        }
    });
     // 下载excel表格数据(购买道具)
    $('.download_items').click(function(){
        if(window.ActiveXObject || "ActiveXObject" in window){
            var curTbl = document.getElementById("dj_table");
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
            $('#dj_table').tableExport({ type: 'excel', escape: 'false',fileName:'购买道具'});
        }
    });
})