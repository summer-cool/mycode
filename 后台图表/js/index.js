$(document).ready(function() {
    // chart//充值金额url//ltv数据//渠道区服url//ltv url//ltv日期
    var dataTmp, //金额y轴
        xAxi, //金额x轴
        chart, //图表1
        chart_2, //图表2
        chart_3,//图表3
        chargeUrl = "datatable_1.json", //金额 & ltv url
        ChannelUrl = "channel.json", //渠道url
        dauUrl = "datatable_2.json",
        ltvXaxi, //ltv x轴
        ltvData, //ltv y轴
        dauXaXi,//dau x轴
        dauData,//dau y轴
        startDate, //开始日期
        endDate, //结束日期
        index = 0, //图表标号
        channel, //渠道
        zone, //服务区
        QFurl = "querychzone.do", //确定--渠道和服务区url
        channelArray = ""; //盛放渠道id
    Highcharts.setOptions({
        lang: {
            printChart: "打印图表",
            downloadJPEG: "下载JPEG 图片",
            downloadPDF: "下载PDF文档",
            downloadPNG: "下载PNG 图片",
            downloadSVG: "下载SVG 矢量图",
            exportButtonTitle: "导出图片",
            downloadCSV: "下载CSV格式文件",
            downloadXLS: "下载XLS格式文件"
        }
    });
    $('.sd_li_1').click(function() {
        $('.sd_div_1').slideToggle();
        $(this).find('img').toggleClass("img_roate");
    });
    //btn_group日期切换
    $('.btn_ul li').click(function() {
        $(this).addClass("btn_li").siblings(".btn_ul li").removeClass("btn_li");
    });
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
        // inputTrigger : 'input_trigger',
        theme: 'ta',
        success: function(obj) {
            $('.btn_ul li').removeClass("btn_li");
            $("#dCon_demo3").html('开始时间 : ' + obj.startDate + '<br/>结束时间 : ' + obj.endDate);
            startDate = obj.startDate;
            endDate = obj.endDate;
            //调用图表ajax
            ChartAajx(chargeUrl, startDate, endDate, channel, zone);
            DauAjax(dauUrl, startDate, endDate, channel, zone);
        }
    });
    ChartAajx(chargeUrl, startDate, endDate, channel, zone);
    //图表ajax
    function ChartAajx(url, startDate, endDate, channel, zone) {
        $('.loading').show();
        $.ajax({
            type: "GET",
            url: url,
            data: {
                startDate: startDate,
                endDate: endDate,
                channel: channel,
                zoneid: zone
            },
            // async: false,
            dataType: "json",
            success: function(result) {
                channelArray = "";
                zone = "";
                var data = eval(result);
                xAxi = data.money.xAxiss;
                dataTmp = data.money.yAxisCategories;
                ltvXaxi = data.ltv.xAxiss;
                ltvData = data.ltv.yAxisCategories;
                $('.loading').hide();
                if (index == 0) {
                    $('.first_nav').show();
                    $('.second_nav').hide();
                    $('.AVG').html(data.money.AVG + "元");
                    $('.SUM').html(data.money.SUM + "元");
                    moneyChart(xAxi, dataTmp);
                    chart1 = new Highcharts.Chart(chart); //重新渲染图表1(下2)
                    table_one.ajax.reload(); //重新渲染表格1(下2)
                } else if (index == 1) {
                    $('.first_nav').hide();
                    $('.second_nav').hide();
                    chart_two(ltvXaxi, ltvData);
                    chart2 = new Highcharts.Chart(chart_2);
                    table_two.ajax.reload();
                }
            },
            error: function() {
                alert("请求超时，请重试！");
            }
        });
    };
    // dau图表ajax
    function DauAjax(url, startDate, endDate, channel, zone){
        $(".loading").show();
        $.ajax({
            type: "GET",
            url: url,
            data: {
                startDate: startDate,
                endDate: endDate,
                channel: channel,
                zoneid: zone
            },
            success:function(data){
                var data = eval(data);
                channelArray = "";
                zone = "";
                $('.loading').hide();
                $('.first_nav').hide();
                $('.second_nav').show();
                $('.dauAvg').html(data.dauAvg);
                dauXaXi = data.xAxiss;
                dauData = data.yAxisCategories;
                if (index == 2) {
                    chart_three(dauXaXi,dauData);
                    chart3 = new Highcharts.Chart(chart_3);
                    table_three.ajax.reload();
                } 
            },
            error:function(){
                alert("加载失败，请刷新再试~")
            }
        })
    };
    //金额chart
    function moneyChart(xAxi, dataTmp) {
        chart = {
            credits: {
                text: null,
            },
            chart: {
                type: 'column',
                renderTo: 'chart_C',
                zoomType: 'xy',
                // inverted: false
            },
            exporting: {
                enabled: false
            },
            colors: ['#ffae00', '#f4533c', '#4da1ff', '#1aba9b', '#64E572', '#FF9655',  '#6AF9C4'],
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
    }

    // LTVchart_2
    function chart_two(ltvXaxi, ltvData) {
        chart_2 = {
            credits: {
                text: null,
            },
            exporting: {
                enabled: false
            },
            chart: {
                type: 'line',
                zoomType: 'xy',
                renderTo: 'LTV_chart',
                // inverted: false
            },
            colors: ['#ffae00', '#ED561B', '#4da1ff', '#1aba9b', '#64E572',
                '#FF9655', '#6AF9C4'
            ],
            title: {
                text: null,
            },
            subtitle: {
                text: null,
            },
            xAxis: {
                categories: ltvXaxi,
                showFirstLabel: true,
                gridLineWidth: 1,

                reversed: false,
                title: {
                    text: null
                },
                labels: {
                    formatter: function() {
                        return this.value;
                    }
                },
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
                        return this.value;
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
            series: ltvData,
        };
    }
    // DAUchart
    function chart_three(dauXaXi,dauData) {
        chart_3 = {
            credits: {
                text: null,
            },
            exporting: {
                enabled: false
            },
            chart: {
                type: 'column',
                zoomType: 'xy',
                renderTo: 'dau_chart',
                // inverted: false
            },
            colors: ['#ffae00', '#ED561B', '#4da1ff', '#1aba9b', '#64E572',
                '#FF9655', '#6AF9C4'
            ],
            title: {
                text: null,
            },
            subtitle: {
                text: null,
            },
            xAxis: {
                categories: dauXaXi,
                // categories: ltvXaxi,
                showFirstLabel: true,
                gridLineWidth: 1,

                reversed: false,
                title: {
                    text: null
                },
                labels: {
                    formatter: function() {
                        return this.value;
                    }
                },
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
                        return this.value;
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
                column: {
                    stacking: 'normal',
                    dataLabels: {
                        // enabled: true,
                        // color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white',
                        style: {
                            textShadow: '0 0 3px black'
                        }
                    }
                }
            },
            series:dauData,
        }
    };
    //渲染图表1
    moneyChart(xAxi, dataTmp);
    chart1 = new Highcharts.Chart(chart);

    //图表切换
    $(".nav li").click(function() {
        $('.pl_li_2').css({
            "background": "url(imgs/biaoge.png) center center no-repeat",
            "background-size": "80% 80%",
        });
        $('.pl_li_1').css({
            "background": "url(imgs/tubiao_1.png) center center no-repeat",
            "background-size": "80% 80%",
        });
        $('.table_one_C').hide();
        $('.table_two_C').hide();
        $('.table_three_C').hide();
        index = $(this).index();
        $(this).addClass("active_li").siblings(".nav li").removeClass("active_li");

        if (index == 0) {
            $("#chart_C").show();
            $("#LTV_chart").hide();
            $("#dau_chart").hide();
            ChartAajx(chargeUrl, startDate, endDate, channel, zone);
        } else if (index == 1) {
            $("#LTV_chart").show();
            $("#chart_C").hide();
            $("#dau_chart").hide();
            ChartAajx(chargeUrl, startDate, endDate, channel, zone);
        }else if (index == 2) {
            $("#LTV_chart").hide();
            $("#chart_C").hide();
            $("#dau_chart").show();
            DauAjax(dauUrl, startDate, endDate, channel, zone);   
        }
    });
    //图表1
    var table_one = $('#table_one').DataTable({
        "language": {
            "sProcessing": "处理中...",
            "sLengthMenu": "显示_MENU_项结果",
            "sZeroRecords": "没有匹配结果",
            "sInfo": "显示第_START_至_END_项结果，共_TOTAL_项",
            "sInfoEmpty": "显示第0至0项结果，共0项",
            "sInfoFiltered": "(由_MAX_项结果过滤)",
            "sInfoPostFix": "",
            "sSearch": "搜索:",
            "sUrl": "",
            "sEmptyTable": "表中数据为空",
            "sLoadingRecords": "载入中...",
            "sInfoThousands": ",",
            "oPaginate": {
                "sFirst": "首页",
                "sPrevious": "上页",
                "sNext": "下页",
                "sLast": "末页"
            },
            "oAria": {
                "sSortAscending": ":以升序排列此列",
                "sSortDescending": ":以降序排列此列"
            }
        },
        ajax: {
            url: "http://192.168.6.189:8080/statistics/tableInfo.do",
            data: function(d) {
                d.startDate = startDate;
                d.endDate = endDate;
                d.channel = channel;
                d.zoneid = zone;
                d.queryType = "money";
            },
        },
        "bProcessing": "true",
        //当处理大数据时，延迟渲染数据，有效提高Datatables处理能力
        "deferRender": true,
        "columns": [{
            "data": "date"
        }, {
            "data": "money"
        }, {
            "data": "channel"
        }, {
            "data": "zone"
        }]
    });
    //图表2
    var table_two = $('#table_two').DataTable({
        "language": {
            "sProcessing": "处理中...",
            "sLengthMenu": "显示_MENU_项结果",
            "sZeroRecords": "没有匹配结果",
            "sInfo": "显示第_START_至_END_项结果，共_TOTAL_项",
            "sInfoEmpty": "显示第0至0项结果，共0项",
            "sInfoFiltered": "(由_MAX_项结果过滤)",
            "sInfoPostFix": "",
            "sSearch": "搜索:",
            "sUrl": "",
            "sEmptyTable": "表中数据为空",
            "sLoadingRecords": "载入中...",
            "sInfoThousands": ",",
            "oPaginate": {
                "sFirst": "首页",
                "sPrevious": "上页",
                "sNext": "下页",
                "sLast": "末页"
            },
            "oAria": {
                "sSortAscending": ":以升序排列此列",
                "sSortDescending": ":以降序排列此列"
            }
        },

        ajax: {
            url: "http://192.168.6.189:8080/statistics/tableInfo.do",
            data: function(d) {
                d.startDate = startDate;
                d.endDate = endDate;
                d.channel = channel;
                d.zoneid = zone;
                d.queryType = "ltv";
            },
        },
        //当处理大数据时，延迟渲染数据，有效提高Datatables处理能力
        "deferRender": true,
        "columns": [{
            "data": "date"
        }, {
            "data": "ltv"
        }, {
            "data": "channel"
        }, {
            "data": "zone"
        }]
    });
    //图表3(dau)
    var table_three = $('#table_three').DataTable({
        "language": {
            "sProcessing": "处理中...",
            "sLengthMenu": "显示_MENU_项结果",
            "sZeroRecords": "没有匹配结果",
            "sInfo": "显示第_START_至_END_项结果，共_TOTAL_项",
            "sInfoEmpty": "显示第0至0项结果，共0项",
            "sInfoFiltered": "(由_MAX_项结果过滤)",
            "sInfoPostFix": "",
            "sSearch": "搜索:",
            "sUrl": "",
            "sEmptyTable": "表中数据为空",
            "sLoadingRecords": "载入中...",
            "sInfoThousands": ",",
            "oPaginate": {
                "sFirst": "首页",
                "sPrevious": "上页",
                "sNext": "下页",
                "sLast": "末页"
            },
            "oAria": {
                "sSortAscending": ":以升序排列此列",
                "sSortDescending": ":以降序排列此列"
            }
        },

        ajax: {
            url: "http://192.168.6.189:8080/statistics/DAUTableInfo.do",
            data: function(d) {
                d.startDate = startDate;
                d.endDate = endDate;
                d.channel = channel;
                d.zoneid = zone;
                // d.queryType = "ltv";
            },
        },
        //当处理大数据时，延迟渲染数据，有效提高Datatables处理能力
        "deferRender": true,
        "columns": [{
            "data": "date"
        }, {
            "data": "olduser"
        }, {
            "data": "newuser"
        }, {
            "data": "payolduser"
        }, {
            "data": "paynewuser"
        }, {
            "data": "DAU"
        }]
    });
    // 图表和表格切换
    $('.pl_li_2').click(function() {
        $('.pl_li_2').css({
            "background": "url(imgs/biaoge_1.png) center center no-repeat",
            "background-size": "80% 80%",
        });
        $('.pl_li_1').css({
            "background": "url(imgs/tubiao.png) center center no-repeat",
            "background-size": "80% 80%",
        })
        if (index == 0) {
            $('#chart_C').hide();
            $('.table_one_C').show();
            $('.table_two_C').hide();
            $('.table_three_C').hide();
            $('#table_one').dataTable().fnDraw(false);
        } else if (index == 1) {
            $('#LTV_chart').hide();
            $('.table_one_C').hide();
            $('.table_three_C').hide();
            $('.table_two_C').show();
        } else if(index ==2){
            $('#dau_chart').hide();
            $('.table_one_C').hide();
            $('.table_two_C').hide();
            $('.table_three_C').show();
        }
    });
    $('.pl_li_1').click(function() {
        $('.pl_li_2').css({
            "background": "url(imgs/biaoge.png) center center no-repeat",
            "background-size": "80% 80%",
        });
        $('.pl_li_1').css({
            "background": "url(imgs/tubiao_1.png) center center no-repeat",
            "background-size": "80% 80%",
        });
        if (index == 0) {
            $('#chart_C').show();
            ChartAajx(chargeUrl, startDate, endDate, channel, zone);
            $('.table_one_C').hide();
            $('.table_two_C').hide();
            $('.table_three_C').hide();
        } else if (index == 1) {
            $('#LTV_chart').show();
            ChartAajx(chargeUrl, startDate, endDate, channel, zone);
            $('.table_one_C').hide();
            $('.table_two_C').hide();
            $('.table_three_C').hide();
        } else if (index == 2) {
            $('#dau_chart').show();
            DauAjax(dauUrl, startDate, endDate, channel, zone);
            $('.table_one_C').hide();
            $('.table_two_C').hide();
            $('.table_three_C').hide();
        }
    });
    //打开数据筛选
    $('.shaixuan').click(function() {
        $('.sx_bg').show();
        $('.sx_slider').show();
        $('.spinner').show();
        $('.loading_bg').show();
        $(this).addClass("shaixuan_s");
        ChinelAjax(ChannelUrl);
    });
    // 渠道与服务切换
    $(".sx_choose li").click(function() {
        var xindex = $(this).index();
        $(this).siblings("li").removeClass("al_choose");
        $(this).addClass("al_choose");
        if (xindex == 0) {
            $('.sx_content').show();
            $('.sx_content_2').hide();
        } else if (xindex == 1) {
            $('.sx_content').hide();
            $('.sx_content_2').show();
        }
    });
    //渠道ajax
    function ChinelAjax(url) {
        $.ajax({
            url: url,
            type: "GET",
            datatype: "json",
            data: {

            },
            success: function(data) {
                $('.spinner').hide();
                $('.loading_bg').hide();
                var data = eval(data);
                //渠道append
                var str = "<ul>";
                for (var i = 0; i < data.channel.length; i++) {
                    str +=
                        "<li>" +
                        "<input type='checkbox' Cid='" + data.channel[i].id + "'>" +
                        "<span>渠道" + data.channel[i].name + "</span>" +
                        "</li>";
                };
                str += "</ul>";
                $('.sx_content').append(str);
                //渠道选择
                // channelId arra
                $('.sx_content li').click(function() {
                    var check = $(this).children("input").prop("checked");
                    if (check == false) {
                        $(this).children("input").prop("checked", true);
                        check = true;
                    } else {
                        $(this).children("input").prop("checked", false);
                    }
                });
                $('.sx_content input').click(function() {
                    var check = $(this).prop("checked");
                    if (check == false) {
                        $(this).prop("checked", true);
                        check = true;
                    } else {
                        $(this).prop("checked", false);
                    }
                });
                //区服append
                var str2 = "<ul>";
                for (var j = 0; j < data.zone.length; j++) {
                    str2 +=
                        "<li>" +
                        "<input type='radio' name='radio' value='" + data.zone[j].id + "'>" +
                        "<span>" + data.zone[j].name + "</span>" +
                        "</li>";
                }
                str += "</ul>";
                $('.sx_content_2').append(str2);
                //区服选择
                $('.sx_content_2 li').click(function() {
                    var check = $(this).children("input").prop("checked");
                    if (check == false) {
                        $(this).children("input").prop("checked", "true");
                        zone = $(this).children("input").attr("value"); //获得zone服务区
                        console.log(zone)
                    }
                });
            },
            error: function() {
                alert("获取失败，刷新再试~")
            }
        });
        // 选择渠道和区服--确定
        $('.sx_btn_sure').click(function() {
            $('.sx_content li').children("input").each(function() {
                if ($(this).prop("checked") == true) {
                    channelArray += $(this).attr("Cid") + "-";
                }
            });
            channel = channelArray; //获得所选渠道id集合
            $('.sx_bg').hide();
            $('.sx_slider').hide();
            $('.sx_content_2 ul').remove();
            $('.sx_content ul').remove();
            $('.shaixuan').removeClass("shaixuan_s");
            ChartAajx(chargeUrl, startDate, endDate, channel, zone);
            DauAjax(dauUrl, startDate, endDate, channel, zone);
        });
    };
    //取消渠道选择
    $('.sx_btn_cancel').click(function() {
        channelArray = "";
        zone = ""; //重置服务区
        $('.sx_bg').hide();
        $('.sx_slider').hide();
        $('.sx_content_2 ul').remove();
        $('.sx_content ul').remove();
        $('.shaixuan').removeClass("shaixuan_s");
        $('.loading_bg').hide();
        $('.spinner').hide();
    });
    $('.close_sx').click(function() {
            channelArray = "";
            zone = "";
            $('.sx_bg').hide();
            $('.sx_slider').hide();
            $('.sx_content_2 ul').remove();
            $('.sx_content ul').remove();
            $('.shaixuan').removeClass("shaixuan_s");
            $('.loading_bg').hide();
            $('.spinner').hide();
        })
        // 全屏查看
    var all = 1;
    $('.pr_li_3').click(function() {
        $('.model').addClass("model_all");
        if (all == 1) {
            $(this).addClass("pr_li_3_all");
            all = 0;
        } else if (all == 0) {
            $(this).removeClass("pr_li_3_all");
            $('.model').removeClass("model_all");
            all = 1;
        };
        if (index == 0) {
            chart1 = new Highcharts.Chart(chart);
        } else if (index == 1) {
            chart2 = new Highcharts.Chart(chart_2);
        } else if (index ==2) {
            chart3 = new Highcharts.Chart(chart_3);
        }
    });
    // 下载图表
    $('.pr_li_1').click(function() {
        if (index == 0) {
            g_chart = $('#chart_C').highcharts(); //得到上面图表的对象
            g_chart.downloadXLS();
        } else if (index == 1) {
            g2_chart = $('#LTV_chart').highcharts(); //得到上面图表的对象
            g2_chart.downloadXLS();
        }else if (index == 2) {
            g3_chart = $('#dau_chart').highcharts(); //得到上面图表的对象
            g3_chart.downloadXLS();
        }
    });
    // 说明
    var sm = 0;
    $('.pr_li_2').click(function() {
        if (sm == 0) {
            $('.explan_C').show();
            sm = 1;
        } else if (sm == 1) {
            $('.explan_C').hide();
            sm = 0;
        }
    });

});