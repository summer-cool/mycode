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
    //是否可以领取50元话费
    var timeUrl = "http://service.sincetimes.com/moon/canfifty";
	/*领取话费*/
    var payUrl = "http://service.sincetimes.com/moon/cty_pay";
    //已玩过得分
    var Ascore;
    //抽奖还需积分
    var Needscore;
    //是否为自己在玩
    var srcCharge;
    //名字
    var Pname;
      // 分数
    var Allscore = 0;
    //获取计时器
    var jsq_cover = document.getElementById("jsq_cover");
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
        $.ajax({
            url: url,
            type: "POST",
            dataType: 'json',
            data: {
                openid: openid,
            },
            success: function(data) {
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
                };
            }
        })
    };
    //
    function friendImg(url, openid) {
        $.ajax({
            url: url,
            type: "POST",
            dataType: 'json',
            data: {
                openid: openid,
            },
            success: function(data) {
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
    // 可否领取话费
    $('.lq_button').click(function() {
            $.ajax({
                url: timeUrl,
                type: "GET",
                dataType: "json",
                data: {
					openid : openid
                },
                success: function(data) {
                    var data = eval(data);
					console.log(data);
                    switch(data.result){
                        case -4:
                        $('.hflq_C').show();
                        $('.wdsj_C').show();
                        $('.hflq_bg').show();
                        break;
                        case -3:
                        alert("已经领取~");
                        break;
                        case -1:
                        alert("充值成功~");
                        break;
                        case 0:
                        alert("支付失败，稍后再试~");
                        break;
                        case -2:
                        $('.hflq_C').show();
                        $('.wqd_C').show();
                        $('.hflq_bg').show();
                        $('.jhm').html(data.libaocode);
                        break;
                        case 1:
                        //可领取话费弹出输入号码弹窗
                        $('.hflq_C').show();
                        $('.hflq_bg').show();
                        $('.srNum_C').show();
                        break;
                    }  
                },
                error: function() {
                    alert("加载失败，刷新再试~");
                }
            })
        });
        //关闭话费各种窗口
		$('.close').click(function(){
			$('.hflq_C').hide();
            $('.wdsj_C').hide();
			$('.hflq_bg').hide();
			$('.wqd_C').hide();
            $('.srNum_C').hide();
		});
        //领取话费
        $('.submitNum').click(function(){
            var mobile = $(".phoneNum").val();
            var num = /^[1][3,4,5,8][0-9]{9}$/;
            if (num.test(mobile)) {
                $.ajax({
                    url:payUrl,
                    type:"POST",
                    dataType:"json",
                    data:{
                        openid:openid,
                        mobile:mobile
                    },
                    success:function(data){
                        var data = eval(data);
                        if (data.result==0) {
                            alert("领取失败，请稍后再试~")
                        }else if (data.result == 1) {
                            alert("领取成功");
                            $('.hflq_C').hide();
                            $('.hflq_bg').hide();
                            $('.srNum_C').hide();
                        }else if (data.result==-2) {
                            $('.hflq_C').show();
                            $('.wqd_C').show();
                            $('.hflq_bg').show();
                            $('.jhm').html(data.libaocode);
                        }
                    },
                    error:function(){
                        alert("领取失败，请稍后再试~")
                    }
                })
            }else{
                alert("请输入正确手机号码~")
            } 
        });
    //已经助力好友
    function AlreadyZhuli(data) {
        $('.game_over_slider').show();
        $('.gm_text_C').hide();
        // 被助力玩家
        $('.fd_name').html(data.name);
        //被助力分数
        $('.fd_fs').html(data.helpscore)
        $('.gm_text_C_2').show();
		$('#container_game').hide();
    };

    //自己玩过游戏
    function AlreadyPlay(url) {
        $.ajax({
            url: url,
            datatype: "json",
            type: "POST",
            data: {

            },
            success: function(data) {
                $('.fd_C').find("ul").remove();
                var data = eval(data);
                $('.bottom').css({
                    "margin-top": "-1rem"
                }, {
                    "min-height": "14rem"
                });
                if (data.length>0) {
                     //主页滚动条可滚动
                    $('.container').css("overflow-Y", "scroll");
					$('#container_game').hide();
                    $('.jiantou').show();
                }
                // $('.container').css("overflow-Y":"scroll");
                $('.game_over_slider').show();
                $('.gm_num').html(Ascore);
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
    var l = 1;
    //游戏规则按钮点击
    $('.hd_sm').click(function() {
        if (l==1) {
            $('.gzsm_1_C').show();
            $('.gzsm_bg').show();
            l=0;
        }else if (l==0) {
            $('.gzsm_1_C').hide();
            $('.gzsm_bg').hide();
            l = 1;
        }  
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
                // 

                //er十秒后移除掉落物体
                var clear = setTimeout(function() {

                    clearTimeout(clear);
                    // 游戏结束
                    gameOver(gameNumUrl, openid, srcopenid, Allscore);
                    gameMonitor.stop();
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

    function Ship(ctx) {
        this.width = 60;
        this.height = 40;
        gameMonitor.im.loadImage(['imgs/player.png']);
        this.player = gameMonitor.im.createImage('imgs/player.png');
        this.left = gameMonitor.w / 2 - this.width / 2;
        this.top = gameMonitor.h - this.height+15;
        
        this.paint = function() {
            ctx.drawImage(this.player, this.left, this.top, this.width, this.height);
        }

        this.setPosition = function(event) {
            if (gameMonitor.isMobile()) {
                var tarL = event.changedTouches[0].clientX;
                var tarT = event.changedTouches[0].clientY;
            } else {
                var tarL = event.offsetX;
                var tarT = event.offsetY;
            }
            this.left = tarL - this.width / 2 - 16;
            // this.top = tarT - this.height/2;
            if (this.left < 0) {
                this.left = 0;
            }
            if (this.left > 320 - this.width) {
                this.left = 320 - this.width;
            }
            // if (this.top < 0) {
            //     this.top = 0;
            // }
            // if (this.top > gameMonitor.h - this.height) {
            //     this.top = gameMonitor.h - this.height;
            // }
            this.paint();
        }

        this.controll = function() {
            var _this = this;
            var stage = $('#gamepanel');
            var currentX = this.left,
                currentY = this.top,
                move = false;
            stage.on(gameMonitor.eventType.start, function(event) {
                _this.setPosition(event);
                move = true;
            }).on(gameMonitor.eventType.end, function() {
                move = false;
            }).on(gameMonitor.eventType.move, function(event) {
                event.preventDefault();
                if (move) {
                    _this.setPosition(event);
                }
            });
        }

        this.eat = function(foodlist) {
            for (var i = foodlist.length - 1; i >= 0; i--) {
                var f = foodlist[i];
                if (f) {
                    var l1 = this.top + this.height / 2 - (f.top + f.height / 2);
                    var l2 = this.left + this.width / 2 - (f.left + f.width / 2);
                    var l3 = Math.sqrt(l1 * l1 + l2 * l2);
                    if (l3 <= this.height / 2 + f.height / 2) {
                        foodlist[f.id] = null;
                        if (f.type == 0) {
                            num.push(new Numall(randomN(610, 620), 300, 40, 20, "imgs/+10.png"));
                            Allscore += 10;
                            getM.play();
                        }if(f.type == 6){
                            num.push(new Numall(randomN(610, 620), 300, 40, 20, "imgs/+20.png"));
                            Allscore += 20;
                            getM.play();
                        }if(f.type == 1){
                            num.push(new Numall(randomN(610, 620), 300, 40, 20, "imgs/-10.png"));
                            Allscore -= 10;
                            boomM.play();
                        }else {
                            num.push(new Numall(randomN(610, 620), 300, 40, 20, "imgs/+10.png"));
                            Allscore += 10;
                            botaS = 2;
                            getM.play();
                        }
                    }
                }
            }
        }
    }

    function Food(type, left, id) {
        this.speedUpTime = 200;
        this.id = id;
        this.type = type;
        this.width = 60;
        this.height = 50;
        this.left = left;
        this.top = -50;
        this.speed = 0.04 * Math.pow(1.2, Math.floor(gameMonitor.time / this.speedUpTime));
        this.loop = 0;
        switch (this.type) {
            case 0:
                p = 'imgs/sugar-1.png';
                break;
            case 1:
                p = 'imgs/bomb.png';
                break;
            case 2:
                p = 'imgs/mc-1.png';
                break;
            case 3:
                p = 'imgs/mc-2.png';
                break;
            case 4:
                p = 'imgs/mc-3.png';
                break;
            case 5:
                p = 'imgs/mc-4.png';
                break;
            case 6:
                p = 'imgs/rabbit.png';
                break;
            case 7:
                p = 'imgs/mc-1.png';
                break;
            case 8:
                p = 'imgs/sugar-2.png';
                break;
        }
        this.pic = gameMonitor.im.createImage(p);
    }
    Food.prototype.paint = function(ctx) {
        ctx.drawImage(this.pic, this.left, this.top, this.width, this.height);
    }
    Food.prototype.move = function(ctx) {
        if (gameMonitor.time % this.speedUpTime == 0) {
            this.speed *= 1.2;
        }
        this.top += ++this.loop * this.speed;
        if (this.top > gameMonitor.h) {
            gameMonitor.foodList[this.id] = null;
        } else {
            this.paint(ctx);
        }
    }
    function ImageMonitor() {
        var imgArray = [];
        return {
            createImage: function(src) {
                return typeof imgArray[src] != 'undefined' ? imgArray[src] : (imgArray[src] = new Image(), imgArray[src].src = src, imgArray[src])
            },
            loadImage: function(arr, callback) {
                for (var i = 0, l = arr.length; i < l; i++) {
                    var img = arr[i];
                    imgArray[img] = new Image();
                    imgArray[img].onload = function() {
                        if (i == l - 1 && typeof callback == 'function') {
                            callback();
                        }
                    }
                    imgArray[img].src = img
                }
            }
        }
    }
    var gameMonitor = {
        w: 320,
        h: 320,
        bgWidth: 320,
        bgHeight: 1126,
        time: 0,
        timmer: null,
        bgSpeed: 2,
        bgloop: 0,
        score: 0,
        im: new ImageMonitor(),
        foodList: [],
        bgDistance: 0, //背景位置
        eventType: {
            start: 'touchstart',
            move: 'touchmove',
            end: 'touchend'
        },
        init: function() {
            var _this = this;
            var canvas = document.getElementById('stage');
            var ctx = canvas.getContext('2d');

            //绘制背景
            var bg = new Image();
            _this.bg = bg;
            bg.onload = function() {
                    ctx.drawImage(bg, 0, 0, _this.bgWidth, _this.bgHeight);
                }
                // bg.src = 'static/img/bg.jpg';

            _this.initListener(ctx);
        },
        initListener: function(ctx) {
            var _this = this;
            var body = $(document.body);
            $(document).on(gameMonitor.eventType.move, function(event) {
                // event.preventDefault();
            });
            $('#game_start').on(gameMonitor.eventType.start, function() {
                setTimeout(function(){
                    _this.ship = new Ship(ctx);
                    _this.ship.paint();
                    _this.ship.controll();
                    gameMonitor.run(ctx);

                },4000);
            });
        },
        rollBg: function(ctx) {
            if (this.bgDistance >= this.bgHeight) {
                this.bgloop = 0;
            }
            this.bgDistance = ++this.bgloop * this.bgSpeed;
            ctx.drawImage(this.bg, 0, this.bgDistance - this.bgHeight, this.bgWidth, this.bgHeight);
            ctx.drawImage(this.bg, 0, this.bgDistance, this.bgWidth, this.bgHeight);
        },
        run: function(ctx) {
            var _this = gameMonitor;
            ctx.clearRect(0, 0, _this.bgWidth, _this.bgHeight);
            //绘制飞船
            _this.ship.paint();
            _this.ship.eat(_this.foodList);
            //产生月饼
            _this.genorateFood();
            //绘制月饼
            for (i = _this.foodList.length - 1; i >= 0; i--) {
                var f = _this.foodList[i];
                if (f) {
                    f.paint(ctx);
                    f.move(ctx);
                }
            }
            _this.timmer = setTimeout(function() {
                gameMonitor.run(ctx);
            }, Math.round(1000 /60));

            _this.time++;
        },
        stop: function() {
            var _this = this
            $('#stage').off(gameMonitor.eventType.start + ' ' + gameMonitor.eventType.move);
            setTimeout(function() {
                clearTimeout(_this.timmer);
            }, 0);

        },
        genorateFood: function() {
                var genRate = 30; //产生月饼的频率
                var random = Math.random();
                if (random * genRate > genRate - 2) {
                var left = Math.random() * (this.w - 50);
                var type = randomN(0,7);
                var id = this.foodList.length;
                var f = new Food(type, left, id);
                this.foodList.push(f);
            }
        },
        isMobile: function() {
            var sUserAgent = navigator.userAgent.toLowerCase(),
                bIsIpad = sUserAgent.match(/ipad/i) == "ipad",
                bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os",
                bIsMidp = sUserAgent.match(/midp/i) == "midp",
                bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4",
                bIsUc = sUserAgent.match(/ucweb/i) == "ucweb",
                bIsAndroid = sUserAgent.match(/android/i) == "android",
                bIsCE = sUserAgent.match(/windows ce/i) == "windows ce",
                bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile",
                bIsWebview = sUserAgent.match(/webview/i) == "webview";
            return (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM);
        }
    }
    if (!gameMonitor.isMobile()) {
        gameMonitor.eventType.start = 'mousedown';
        gameMonitor.eventType.move = 'mousemove';
        gameMonitor.eventType.end = 'mouseup';
    }

    gameMonitor.init();
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
    function randomN(min, max) {
        return Math.floor(min + Math.random() * (max - min));
    };
    //创建分数类
    function Numall(X, Y, sizeX, sizeY, imgsrc) {
        Num.call(this, X, Y, sizeX, sizeY, imgsrc)
    }

    // 分数合集
    var num = [];
    // 游戏结束
    function gameOver(gameNumUrl, openid, srcopenid) {
        //移除掉落物品和分数合集
        $('.game_C').find('.numimg').remove();
        $('#gamepanel').hide();
        // 将分数传给后台并处理返回数据
        if (Allscore > 200 && Allscore < 300) {
            Allscore = randomN(3.1, 3.9) * 100;
        }
        if (Allscore > 500) {
            Allscore = randomN(4.1, 4.8) * 100;
        }
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
    //我也要参加跳转
    $('.join_btn_2').click(function(){
        window.location = "http://service.sincetimes.com/moon/index.html";
    })
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
        function strToJson(str) {
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