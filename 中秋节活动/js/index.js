window.onload = function() {
    document.onreadystatechange = subSomething;

    function subSomething() {
        if (document.readyState == "complete") { //当页面加载状态为完全结束时隐藏加载动画
            $('.loading').hide();
            $('.load_bg').hide();
        };
    };
    //加载时间过长关闭加载动画
    if (setT) {
        clearTimeout(setT);
    };
    var setT = setTimeout(function() {
        $('.loading').hide();
        $('.load_bg').hide();
    }, 6000);
    //获取当前用户url
    var s = window.location.href;
    //提取当前页面的openid isappinstalled值
    String.prototype.getQuery = function(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = this.substr(this.indexOf("\?") + 1).match(reg);
            if (r != null) return unescape(r[2]);
            return null;
        }
        //uid为获取的id值
    var openid = s.getQuery("openid");
    var srcopenid = s.getQuery("srcopenid");
    var isappinstalled = s.getQuery("isappinstalled");
    if (openid == srcopenid) {
        srcopenid = null;
    };
    // 获取音乐
    var getM = document.getElementById('get'),
        boomM = document.getElementById('boom');
    //是否被助力
    var zhuliUrl = "http://service.sincetimes.com/moon/hp";
    //获取用户的头像等基本信息
    var headurl = "http://service.sincetimes.com/moon/info";
    //游戏得分传送与返回
    var gameNumUrl = "http://service.sincetimes.com/moon/addscore";
    //好友助力列表
    var friendUrl = "http://service.sincetimes.com/moon/friends?openid=" + openid + "";
    //领取时间
    var timeUrl = "http://service.sincetimes.com/moon/opentime";
    //已玩过得分
    var Ascore;
    //抽奖还需积分
    var Needscore;
    //是否为自己在玩
    var srcCharge;
    //名字
    var Pname;
    //不存在openid时候的跳转到链接
    if (openid == null) {
        window.location = "http://service.sincetimes.com/moon/signon";
    } else if (openid && isappinstalled) {
        window.location = "http://service.sincetimes.com/moon/signon?openid=" + openid;
    } else if (openid && srcopenid) {
        //调用助力查询
        zhuliCharge(zhuliUrl, openid, srcopenid);
    } else if (openid) {
        // 调用访问头像等参数函数
        getImage(headurl, openid);
    };

    function zhuliCharge(url, openid, srcopenid) {
        $.ajax({
            type: "POST",
            url: url,
            dataType: "json",
            data: {
                openid: openid,
                srcopenid: srcopenid
            },
            success: function(data) {
                var data = eval(data);
                //未被助力
                if (data.result == false) {
                    $('.firstpage').show();
                    // 好友调用访问头像等参数函数
                    friendImg(headurl, srcopenid);
                    srcCharge = true;
                } else if (data.result == true) { //被助力不可游戏显示助力分数
                    //调用被助力函数
                    AlreadyZhuli(data);
                }
            }
        })
    }


    function getImage(url, openid) {
        $('.loading').show();
        $('.load_bg').show();
        $.ajax({
            url: url,
            type: "POST",
            dataType: 'json',
            data: {
                openid: openid,
            },
            success: function(data) {
                $('.loading').hide();
                $('.load_bg').hide();
                Ascore = data.selfscore;
                Needscore = 10000 - data.score;
                var data = eval(data);
                // 五十元话费进度条动画
                $('.wsy_jdt').css({
                    "width": "" + (data.score / 10000) * 100 + "%",
                    "transition": "a3ll 2s linear",
                    "-webkit-transition": "all 2s linear"
                });
                // 总进度条动画并显示分数
                $('.head_img').attr("src", "" + data.headpic + "");
                $('.jdt_2').css({
                    "width": "" + data.score * 0.00065 + "rem",
                    "transition": "all 2s linear",
                    "-webkit-transition": "all 2s linear"
                });
                $('.jdt_num').html(data.score);
                $('.need_num').html(Needscore);
                //如果进度条满值了领取话费功能出现\
                if (data.score == 10000 || data.score > 10000) {
                    $('.lq_button').show();
                }
                //如果没玩过显示主页可以游戏
                if (data.selfscore == 0) {
                    $('.firstpage').show();
                } else { //玩过游戏显示好友助力列表并隐藏主页
                    $('.firstpage').hide();
                    //调用玩过游戏
                    AlreadyPlay(friendUrl);
                    //主页滚动条可滚动
                    $('.container').css("overflow-Y", "scroll");
                };
            }
        })
    };
    //
    function friendImg(url, openid) {
        $('.loading').show();
        $('.load_bg').show();
        $.ajax({
            url: url,
            type: "POST",
            dataType: 'json',
            data: {
                openid: openid,
            },
            success: function(data) {
                $('.loading').hide();
                $('.load_bg').hide();
                Ascore = data.selfscore;
                Needscore = 10000 - data.score;
                var data = eval(data);
                Pname = data.nickname;
                // 五十元话费进度条动画
                $('.wsy_jdt').css({
                    "width": "" + (data.score / 10000) * 100 + "%",
                    "transition": "all 2s linear",
                    "-webkit-transition": "all 2s linear"
                });
                // 总进度条动画并显示分数
                $('.head_img').attr("src", "" + data.headpic + "");
                $('.jdt_2').css({
                    "width": "" + data.score * 0.00065 + "rem",
                    "transition": "all 2s linear",
                    "-webkit-transition": "all 2s linear"
                });
                $('.jdt_num').html(data.score);
                $('.need_num').html(Needscore);
            }
        })
    };
    // 领取话费
    $('.lq_button').click(function() {
            $.ajax({
                url: timeUrl,
                type: "GET",
                dataType: "json",
                data: {

                },
                success: function(data) {
                    var data = eval(data);
                    if (data.result == -2) {
                        $('.hflq_C').show();
                        $('.wdsj_C').show();
                    } else if (data.result == -3) {
                        alert("已经领取~")
                    } else if (data.result == 1) {
                        alert("充值成功~")
                    } else if (data.result == 0) {
                        alert("支付失败，稍后再试~")
                    }
                },
                error: function() {
                    alert("加载失败，刷新再试~");
                }
            })
        })
        //已经助力好友
    function AlreadyZhuli(data) {
        $('.game_over_slider').show();
        $('.gm_text_C').hide();
        // 被助力玩家
        $('.fd_name').html(data.name);
        //被助力分数
        $('.fd_fs').html(data.helpscore)
        $('.gm_text_C_2').show();
    };

    //自己玩过游戏
    function AlreadyPlay(url) {
        $('.loding').show();
        $('.load_bg').show();
        $.ajax({
            url: url,
            datatype: "json",
            type: "POST",
            data: {

            },
            success: function(data) {
                $('.fd_C').find("ul").remove();
                var data = eval(data);
                console.log(data)
                $('.bottom').css({
                    "margin-top": "-1rem"
                }, {
                    "min-height": "14rem"
                });
                $('.game_over_slider').show();
                $('.gm_num').html(Ascore);
                $('.loding').hide();
                $('.load_bg').hide();
                //显示助力列表
                $('.friend_C').show();
                $('.fd_num').html(data.length);
                var str = "";
                for (var i = 0; i < data.length; i++) {
                    str += "<ul class='friend'>" +
                        "<li class='fd_img'>" +
                        "<img src=" + data[i].headpic + " alt=''>" +
                        "</li>" +
                        "<li class='fd_1'>" +
                        "<p><span style='color: white;' class=='name'>" + data[i].nickname + "</span></p>" +
                        "<p>帮我抢了<span style='color: white'; class='fd_jf'>" + data[i].score + "</span>积分</p>" +
                        "</li>" +
                        "<li class='fd_2'>" +
                        "<p>" + data[i].timeString + "</p>" +
                        "</li>" +
                        "</ul>";
                };
                $('.fd_C').append(str);
                $('.bottom_text').show();
            },
            error: function() {
                alert("加载失败，刷新再试~");
            }
        })
    }
    // 小船
    var oDiv = document.getElementById('ship');
    // 小船高与宽
    var oWidth = oDiv.offsetWidth;
    var oHeight = oDiv.offsetHeight;
    var disX, moveX, L, T, starX, starY, starXEnd, starYEnd;
    // 分数
    var Allscore = 0;
    //获取计时器
    var jsq_cover = document.getElementById("jsq_cover");
    oDiv.addEventListener('touchstart', function(e) {
        e.preventDefault(); //阻止触摸时页面的滚动，缩放

        disX = e.touches[0].clientX - this.offsetLeft;
        disY = e.touches[0].clientY - this.offsetTop;
        //手指按下时的坐标
        starX = e.touches[0].clientX;
        starY = e.touches[0].clientY;
        //console.log(disX);
    });
    oDiv.addEventListener('touchmove', function(e) {
        L = e.touches[0].clientX - disX;
        T = e.touches[0].clientY - disY;
        //移动时 当前位置与起始位置之间的差值
        starXEnd = e.touches[0].clientX - starX;
        starYEnd = e.touches[0].clientY - starY;
        //console.log(L);
        if (L < 0) { //限制拖拽的X范围，不能拖出屏幕
            L = 0;
        } else if (L > document.documentElement.clientWidth - this.offsetWidth) {
            L = document.documentElement.clientWidth - this.offsetWidth;
        }

        if (T < 0) { //限制拖拽的Y范围，不能拖出屏幕
            T = 0;
        } else if (T > document.documentElement.clientHeight - this.offsetHeight) {
            T = document.documentElement.clientHeight - this.offsetHeight;
        }
        moveX = L + 'px';
        moveY = T + 'px';
        this.style.left = moveX;
        // this.style.top = moveY;
    });
    //两个开始按钮隐藏第一页显示规则
    $('.strat_btn').bind("touchstart", function() {
        $('.strat_btn').css({
            "transform": "scale(0.9,0.9)",
            "-webkit-transform": "scale(0.9,0.9)",
        });

    });
    $('.strat_btn').bind("touchend", function() {
        $('.strat_btn').css({
            "transform": "scale(1,1)",
            "-webkit-transform": "scale(1,1)",
        });
    });
    $('.strat_btn').click(function() {
        $('.firstpage').hide();
        $('.gzsm_C').show();
        $('.gzsm_bg').show();
    });
    //游戏规则按钮点击
    $('.hd_sm').click(function() {
        // $('.firstpage').hide();
        $('.gzsm_1_C').show();
        $('.gzsm_bg').show();
    });
    $('.gzsm_1_C').click(function() {
            // $('.firstpage').show();
            $('.gzsm_1_C').hide();
            $('.gzsm_bg').hide();
        })
        // 游戏开始按钮点击
    $('.game_start').bind("touchstart", function() {
        $('.game_start').css({
            "transform": "scale(0.9,0.9)",
            "-webkit-transform": "scale(0.9,0.9)",
        });
    });
    $('.game_start').bind("touchend", function(e) {
        $('.game_start').css({
            "transform": "scale(1,1)",
            "-webkit-transform": "scale(1,1)",
        });
        $('.firstpage').hide();
        $('.gzsm_C').hide();
        $('.djs_num_C').show();
        e.stopPropagation();
        gameStart();
    });
    $('.gzsm_C').click(function(e) {
        $('.firstpage').show();
        $('.gzsm_C').hide();
        $('.gzsm_bg').hide();
        e.stopPropagation(); //  阻止事件冒泡
    });
    // 游戏开始
    function gameStart() {
        // 倒计时3.2.1.go
        var i = 3;
        var t = setInterval(function() {
            i--;
            if (i == -1) {
                clearInterval(t);
                $('.djs_num_C').hide();
                $('.gzsm_bg').hide();
                $('.gzsm_C').hide();
                $('.jishiqi_C').show();
                //隐藏下载按钮
                $('.down_btn').hide();
                //禁用手机默认的触屏滚动行为
                document.addEventListener('touchmove', function(event) {
                    event.preventDefault();
                }, false);
                // 开始创建掉落物品
                var a = setInterval(start, 20);
                //er十秒后移除掉落物体
                var clear = setTimeout(function() {
                    clearInterval(a);
                    clearTimeout(clear);
                    // 游戏结束
                    gameOver(gameNumUrl, openid, srcopenid, Allscore);
                }, 20000);
                //秒表计时器动画
                jsq_cover.className = "jsq_animate";
            } else {
                $('.djs_img').attr("src", "imgs/" + i + ".png");
            }
        }, 1000);
    };
    // 这一段使用原生js对象
    var game_box = document.getElementById("game_box");

    function creatDrop(bs, X, Y, sizeX, sizeY, speed, imgsrc, score) {
        this.dropX = X;
        this.dropY = Y;
        this.dropbs = bs;
        this.dropsizeX = sizeX;
        this.dropsizeY = sizeY;
        this.imagenode = null;
        this.dropspeed = speed;
        // 移动行为
        this.move = function() {
            if (score <= 200) {
                this.imagenode.style.top = this.imagenode.offsetTop + this.dropspeed + "px";
            } else if (score > 200 && score <= 300) {
                this.imagenode.style.top = (this.imagenode.offsetTop + this.dropspeed + 1) + "px";
            } else if (score > 300 && score <= 400) {
                this.imagenode.style.top = (this.imagenode.offsetTop + this.dropspeed + 2) + "px";
            } else if (score > 400) {
                this.imagenode.style.top = (this.imagenode.offsetTop + this.dropspeed + 4) + "px";
            }
        }
        this.init = function() {
            this.imagenode = document.createElement("img");
            this.imagenode.id = "dropimg";
            this.imagenode.src = imgsrc;
            game_box.appendChild(this.imagenode);
            this.imagenode.style.left = (this.dropX) / 75 + "rem";
            this.imagenode.style.top = (this.dropY) / 75 + "rem";
            this.imagenode.style.width = (this.dropsizeX) / 75 + "rem";
            this.imagenode.style.height = (this.dropsizeY) / 75 + "rem";
        }
        this.init();
    };
    // 分数对象
    function Num(X, Y, sizeX, sizeY, imgsrc) {
        this.xX = X;
        this.yY = Y;
        this.numX = sizeX;
        this.numY = sizeY;
        this.imagenode = null;
        this.init = function() {
            this.imagenode = document.createElement("img");
            this.imagenode.className = "numimg";
            this.imagenode.src = imgsrc;
            game_box.appendChild(this.imagenode);
            this.imagenode.style.left = (this.xX) / 75 + "rem";
            this.imagenode.style.top = (this.yY) / 75 + "rem";
            this.imagenode.style.width = (this.numsizeX) / 75 + "rem";
            this.imagenode.style.height = (this.numsizeY) / 75 + "rem";
        }
        this.init();
    };
    // 产生随机数
    function random(min, max) {
        return Math.floor(min + Math.random() * (max - min));
    };
    //创建掉落类
    function dropThing(bs, X, Y, sizeX, sizeY, speed, imgsrc, score) {
        creatDrop.call(this, bs, X, Y, sizeX, sizeY, speed, imgsrc, score)
    }
    //创建分数类
    function Numall(X, Y, sizeX, sizeY, imgsrc) {
        Num.call(this, X, Y, sizeX, sizeY, imgsrc)
    }
    // 掉落物品对象集合
    var drop = [];
    var mark = 0;
    var mark1 = 0;
    // 分数合集
    var num = [];
    // 开始函数
    function start() {
        mark++;
        // 开始掉落物品
        if (mark == 20) {
            mark1++;
            //月饼1
            if (mark1 % 2 == 0) {
                drop.push(new creatDrop(3, random(0, 630), 1, 160, 170, 6, "imgs/bomb.png", 300));
            }
            //月饼2
            if (mark1 % 3 == 0) {
                drop.push(new dropThing(1, random(0, 630), 1, 160, 170, 4, "imgs/mc-2.png", 200));
            }
            //月饼3
            if (mark1 % 4 == 0) {
                drop.push(new dropThing(1, random(0, 630), 1, 160, 170, 6, "imgs/mc-3.png", 400));
            }
            //月饼4
            if (mark1 % 5 == 0) {
                drop.push(new dropThing(1, random(0, 630), 0, 160, 170, 7, "imgs/mc-4.png", 300));
            }
            //兔子
            if (mark1 % 6 == 0) {
                drop.push(new dropThing(2, random(0, 630), 0, 160, 170, 8, "imgs/rabbit.png", 100));
            }
            //糖果1
            if (mark1 % 7 == 0) {
                drop.push(new dropThing(1, random(0, 630), 0, 160, 170, 4, "imgs/sugar-1.png", 250));
            }
            //糖果2
            if (mark1 % 8 == 0) {
                drop.push(new dropThing(1, random(0, 630), 0, 160, 170, 10, "imgs/sugar-2.png", 100));
            }
            //炸弹
            if (mark1 == 40) {
                drop.push(new dropThing(3, random(0, 630), 0, 160, 170, 6, "imgs/bomb.png", 400));
                mark1 = 0;
            } else {
                drop.push(new dropThing(1, random(0, 630), 0, 160, 170, 5, "imgs/mc-1.png", 350));
                mark = 0;
            }
        };
        // 移动物品
        var droplength = drop.length;
        for (var i = 0; i < droplength; i++) {
            drop[i].move();
            // 物品超出边界移除
            if (drop[i].imagenode.offsetTop > 975) {
                game_box.removeChild(drop[i].imagenode);
                drop.splice(i, 1);
                droplength--;
            }
        };
        //碰撞判断
        for (var j = 0; j < droplength; j++) {
            if (drop[j].imagenode.offsetLeft + drop[j].imagenode.offsetWidth >= oDiv.offsetLeft && drop[j].imagenode.offsetLeft + drop[j].imagenode.offsetWidth <= oDiv.offsetLeft + oWidth + 10) {
                if (drop[j].imagenode.offsetTop + drop[j].imagenode.offsetHeight >= oDiv.offsetTop + 10 && drop[j].imagenode.offsetTop + drop[j].imagenode.offsetHeight <= oDiv.offsetTop + oHeight + 10) {
                    //月饼时
                    if (drop[j].dropbs == 1) {
                        oDiv.src = "imgs/boat-2.png";
                        num.push(new Numall(random(610, 620), 300, 50, 20, "imgs/+10.png"));
                        Allscore += 10;
                        getM.play();
                    }
                    //兔子时
                    if (drop[j].dropbs == 2) {
                        oDiv.src = "imgs/boat-2.png";
                        num.push(new Numall(random(610, 620), 300, 50, 20, "imgs/+20.png"));
                        Allscore += 20;
                        getM.play();
                    }
                    // 炸弹时
                    if (drop[j].dropbs == 3) {
                        oDiv.src = "imgs/boat-3.png";
                        num.push(new Numall(random(610, 620), 300, 50, 20, "imgs/-10.png"));
                        Allscore -= 10;
                        boomM.play();
                    }

                    game_box.removeChild(drop[j].imagenode);
                    drop.splice(j, 1);
                    droplength--;
                }
            }
        }
    }
    // 游戏结束
    function gameOver(gameNumUrl, openid, srcopenid) {
        //移除掉落物品和分数合集
        $('.game_C').find('.numimg').remove();
        $('.game_C').find('#dropimg').remove();
        // 将分数传给后台并处理返回数据
        if (Allscore > 200 && Allscore < 300) {
            Allscore = random(3.1, 3.9) * 100;
        }
        if (Allscore > 500) {
            Allscore = random(4.1, 4.8) * 100;
        }
        $('.loding').show();
        $('.load_bg').show();
        $.ajax({
            url: gameNumUrl,
            type: "POST",
            dataType: "json",
            data: {
                openid: openid,
                srcopenid: srcopenid,
                score: Allscore,
            },
            success: function(data) {
                $('.loding').hide();
                $('.load_bg').hide();
                //显示游戏结束得分弹窗
                if (srcCharge == true) {
                    $('.game_over_slider').show();
                    $('.gm_text_C').hide();
                    $('.gm_text_C_2').show();
                    $('.fd_name').html(Pname);
                    $('.fd_fs').html(Allscore);
                } else {
                    $('.game_over_slider').show();
                    $('.gm_text_C').show();
                    $('.gm_num').html(Allscore);
                }
              
                var data = eval(data); 
                console.log(data)
                // 五十元话费进度条动画
                $('.wsy_jdt').css({
                    "width": "" + (data.newscore / 10000) * 100 + "%",
                    "transition": "all 2s linear",
                    "-webkit-transition": "all 2s linear"
                });
                // 总进度条动画并显示分数
                $('.jdt_2').css({
                    "width": "" + data.newscore * 0.00065 + "rem",
                    "transition": "all 2s linear",
                    "-webkit-transition": "all 2s linear"
                });
                $('.jdt_num').html(data.newscore);
                //显示下载按钮
                $('.down_btn').show();
            },
            error: function() {
                alert("加载失败，刷新再试~")
            }
        })
    };
    // 音乐控件
    var bgAudio = new Audio();
    bgAudio.loadStatus = 'unload';
    bgAudio.loop = true;

    function loadAudio(audio, url, callback) {
        audio.src = url;
        audio.load();
        audio.addEventListener('canplay', function() {
            bgAudio.loadStatus = 'loaded';
            callback();
        });
        audio.addEventListener('loadstart', function() {
            bgAudio.loadStatus = 'loading';
        });
    }

    function playAudio() {
        if (bgAudio.loadStatus === 'unload') {
            loadAudio(bgAudio, 'music/BGM.mp3', function() {
                playAudio();
            });
            return 1;
        }

        bgAudio.play();
    }

    function stopAudio() {
        bgAudio.pause();
    }
    bgAudio.addEventListener('playing', function(e) {
        $('#music .music-btn').addClass('play');
    });
    bgAudio.addEventListener('pause', function(e) {
        $('#music .music-btn').removeClass('play');
    });

    $('body').one('touchstart', function() {
        playAudio();
        $('#music').on('touchstart', function(e) {
            if (bgAudio.paused) {
                playAudio();
                return 0;
            }
            stopAudio();
            return 1;
        });
    });
    window.onload = function() {
        if (bgAudio.loadStatus !== 'unload') {
            return;
        }
        playAudio();
    };
    //yaoqing
    $('.join_btn').click(function() {
        $('.invite').show();
        $('.invite_bg').show();
    });
    // cloose
    $('.invite').click(function() {
        $('.invite').hide();
        $('.invite_bg').hide();
    });
    $('.down_btn').click(function() {
        window.location = "http://service.sincetimes.com/moon/download.html?openid=" + openid + "";
    });
    var websocket = null;

    //判断当前浏览器是否支持WebSocket  
    if ('WebSocket' in window) {
        websocket = new WebSocket("ws://119.29.52.126:7050/moon/ws");
    } else {
        console.log('Not support websocket')
    }

    //连接发生错误的回调方法  
    websocket.onerror = function() {
        console.log("error");
    };

    //连接成功建立的回调方法  
    websocket.onopen = function(event) {
        // console.log(new Date().toTimeString() + "opened");
        // console.log("open");
        websocket.send(openid);
    }

    //接收到消息的回调方法  
    websocket.onmessage = function(event) {
        function strToJson(str){  
            return JSON.parse(str);  
        }
        if (event.data == "s") {
            // console.log(event.data);
             // gameOver(gameNumUrl, openid, srcopenid);

        } else if (strToJson(event.data).type == "updatefifshow") { /*刷新分数*/
            console.log(strToJson(event.data));
            $('.fifshow').html(strToJson(event.data).fifshow);
        } else { /*刷新好友列表和分数*/
            AlreadyPlay(friendUrl);
            getImage(headurl, openid);
        }
    }
};