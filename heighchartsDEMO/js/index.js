var dataTmp = "";
$(document).ready(function() {
    // $.ajax({
    //     type: "GET",
    //     url: "add.json",
    //     data: {},
    //     dataType: "json",
    //     success: function(result) {
    //         console.log(result)
    //         dataTmp = "";
    //         $.each(result, function(i, field) {
    //             //拼接json数据集字符串
    //             dataTmp += "{name: '" + field.add.num[i] + "',data: [" + field.add.date[i] + ",]}" + ",";
    //         });
    //         //去除最后一个字符
    //         dataTmp = dataTmp.substring(0, dataTmp.length - 1);
    //         GetData(dataTmp);
    //     },
    //     error: function() {
    //         alert("请求超时，请重试！");
    //     }
    // });
    $('#container').highcharts({
        credits: {
            text: null,
        },
        chart: {
            // type: 'column',
            zoomType: 'xy',
            // inverted: false
        },
        colors: ['#ffae00', '#f4533c', '#ED561B', '#4da1ff', '#1aba9b', '#64E572',
            '#FF9655', '#FFF263', '#6AF9C4'
        ],
        title: {
            text: null,
        },
        subtitle: {
            text: null,
        },
        xAxis: {
            // plotLines: [{
            //     color: 'red', //线的颜色，定义为红色
            //     dashStyle: 'longdashdot', //标示线的样式，默认是solid（实线），这里定义为长虚线
            //     value: 3, //定义在哪个值上显示标示线，这里是在x轴上刻度为3的值处垂直化一条线
            //     width: 2 //标示线的宽度，2px
            // }],
            showFirstLabel:true,
            gridLineWidth:1,
            type: "datetime",
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
            gridLineDashStyle:'ShortDash',
            title: {
                text: null,
            },
            labels: {
                formatter: function() {
                    return this.value / 10000 + '万人';
                }
            },
            lineWidth: 2
        },{
            gridLineDashStyle:'ShortDash',
            title: {
                text: null,
            },
            labels: {
                format:'{value}%',
            },
            lineWidth: 0,
            opposite: true,
        },],
        legend: {
            // layout: 'vertical',
            align: 'center',
            verticalAlign: 'bottom',
            borderWidth: 0,
            floating:true,
            y:20,
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
        series: [{
            name: '总用户数',
            type: 'column',
            yAxis: 0,
            data: [
                [1, 25565485],
                [2, 25565685],
                [3, 25575485],
                [4, 25585485],
                [5, 25565485],
                [6, 26565485],
                [7, 27565485],
                [8, 28565485],
                [9, 35565485],
            ],
            marker: { //去除线上数据点  
                radius: 0,
                lineWidth: 0,
                lineColor: '#fba845',
                fillColor: '#fba845',
                states: {
                    hover: {
                        lineColor: 'white',
                        fillColor: 'white',
                        enabled: true
                    }
                }
            }
        }, {
            name: '活跃用户数',
            type: 'column',
            yAxis:0,
            data: [
                [1, 22565485],
                [2, 21565685],
                [3, 23575485],
                [4, 20585485],
                [5, 21565485],
                [6, 28565485],
                [7, 37565485],
                [8, 29565485],
                [9, 35565485],
            ],
            marker: { //线上数据点  
                radius: 0,
                lineWidth: 0,
                states: {
                    hover: {
                        lineColor: 'white',
                        fillColor: 'white',
                        radius: 0,
                        lineWidth: 5,
                        enabled: true
                    }
                }
            }
        }, {
            name: '付费率',
            type: 'spline',
            yAxis: 1,
            data: [
                [1, 0.48],
                [2, 0.38],
                [3, 0.33],
                [4, 0.18],
                [5, 0.68],
                [6, 0.88],
                [7, 0.47],
                [8, 0.98],
                [9, 1.48],
            ],
            marker: { //线上数据点  
                radius: 0,
                lineWidth: 0,
                states: {
                    hover: {
                        lineColor: 'white',
                        fillColor: 'white',
                        radius: 0,
                        lineWidth: 5,
                        enabled: true
                    }
                }
            },
            tooltip: {
                valueSuffix: '%'
            },
        }
        ],
    });
})