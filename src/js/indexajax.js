$(function () {
    // ajax请求 start
    $.ajax({
        url: './api/index',
        //成功的回调
        success: function (data) {
            console.log(data);
        },
        //超时时间
        timeout: 2000,
        //失败的回调
        error: function () {
            console.log('出错啦!!');
        },
    }).done(function (res) {
        let { msg, data } = res;
        console.log(data);

        //1. 商品分类,数据渲染完毕 start
        let mixId = [];
        data[1].forEach((item, index) => {
            let mixObj = {};
            var mixIdr = item.id.split("-");
            mixObj.modelid = mixIdr[0];
            mixObj.id = mixIdr[1];
            mixObj.index = index;
            mixId.push(mixObj);
            // mixId.push({modelid:mixIdr[0],id:mixIdr[1],index})
        })
        console.log(mixId);
        //对mixId进行去重
        for (var i = 0; i < mixId.length; i++) {
            for (var j = i + 1; j < mixId.length; j++) {
                if (mixId[i].modelid == mixId[j].modelid) {         //第一个等同于第二个，splice方法删除第二个
                    mixId.splice(j, 1);
                    j--;
                }
            }
        }
        console.log(mixId);

        // 渲染li
        let liStrHtml = ``;
        mixId.forEach((item1, index1) => {
            liStrHtml += `
                         <li data-index=${index1} modelid=${item1.modelid}>
                             <h3>
                             </h3>
                         </li>
                     `
        })
        $("#lisnav-ul").html(liStrHtml);
        //   渲染a
        let matchArr = Array.from($("#lisnav-ul").children("li"));
        console.log(matchArr);
        for (let j = 0; j < matchArr.length; j++) {
            for (let i = 0; i < data[1].length; i++) {
                if (data[1][i].id.includes($(matchArr[j]).attr("modelid"))) {
                    console.log($(matchArr[j]).attr("modelid"));
                    let catelink = $("<a data-code=" + data[1][i].id + "href=" + data[1][i].href + ">" + data[1][i].des + "</a>")
                    $(matchArr[j]).children("h3").append(catelink);
                } else {
                    continue;
                }
            }
        }

        // 复制对应数量的二级菜单,粘贴到subnav下面去
        console.log(Array.from($(".lisnav-ul").children("li")).length);
        for (let i = 0; i < Array.from($(".lisnav-ul").children("li")).length; i++) {
            $fullcategory = $(".fullcategory").clone(true);
            $(".subnav").append($fullcategory.get(0));
        }
        // ul移入移出显示效果
        $(".lisnav-ul").on("mouseenter", "li", function (evt) {
            // console.log($(this));//li
            $(this).addClass("bgw").siblings().removeClass("bgw");
            $("#subnav").css({
                display: "block"
            })
            // console.log($(this).index());
            // 返回下标
            // console.log($(".subnav").children(".fullcategory"));
            // console.log( Array.from($(".subnav").children(".fullcategory"))[$(this).index()]);
            $(Array.from($(".subnav").children(".fullcategory"))[$(this).index()])
                .siblings().css({
                    display: "none"
                }).end().css({
                    display: "block",
                })
            // $(".subnav").children(".fullcategory")
            // .index($(this).index()).css("display","block")
            // .siblings().css("display","none")
        })
        $("#navBox").on("mouseleave", function () {
            $(this).find(".lisnav-ul").children("li").removeClass("bgw");
            $("#subnav").css({
                display: "none"
            })


        })
        //1. 商品分类,数据渲染完毕 end

        //   2.主要轮播图区渲染 start
        let SwiperHtml = ``;
        let SwiperPointHtml = ``;
        data[0].forEach((item, index) => {
            SwiperHtml += `
                <li style="background:rgb${item.rgb};">
                    <a href=${item.href} data-code=${item.id}>
                        <img src=${item.src}  />
                    </a>
                </li>
            `
            SwiperPointHtml += `
                <li>
                    <a></a>
                </li>
            `
        })
        // 进行渲染
        $(".focus_box").html(SwiperHtml);
        $(".nav").html(SwiperPointHtml);
        $(".nav").children().eq(0).addClass("cur")
        // 设计类
        class MainSwiper {
            constructor(el) {
                this.$el = $(el);
                this.$Uls = this.$el.find("#focus_box");
                this.$Ols = this.$el.find(".nav");
                //滑动条
                this.$Slider = this.$el.find(".slider-extra");
                this.oImgIndex = 0;
                this.IntervalPlay();
                this.mouseHandler();
                this.clickHandler();
            }
            // 方法一,定时播放
            IntervalPlay() {
                this.SwiperTimer1 = setInterval(() => {
                    this.oImgIndex++;
                    this.Play();

                }, 1500)
            }
            // 方法二:播放行为
            Play() {
                if (this.oImgIndex > this.$Uls.children().length - 1) {
                    this.oImgIndex = 0;
                }
                if (this.oImgIndex < 0) {
                    this.oImgIndex = this.$Uls.children().length - 1;
                }
                // 轮播图图片行为
                this.$Uls.children().eq(this.oImgIndex)
                    .css("display", "block")
                    .siblings().css("display", "none");
                //轮播图小点行为
                this.$Ols.children().eq(this.oImgIndex)
                    .siblings().removeClass("cur").end()
                    .addClass("cur");
            }
            // 方法三,鼠标移入移除暂停
            mouseHandler() {
                this.$el.hover(() => {
                    clearInterval(this.SwiperTimer1);
                }, () => {
                    this.IntervalPlay();
                })
            }
            //方法4点击事件
            clickHandler() {
                this.$Slider.on("click", ".go_l", () => {
                    this.oImgIndex--;
                    this.Play();
                })
                this.$Slider.on("click", ".go_r", () => {
                    this.oImgIndex++;
                    this.Play();
                })
            }

        }

        //创建类的实例
        new MainSwiper(".main_data");
        // 2. 轮播图渲染完毕
        // floor渲染 start
        const floorData = data[2];
        console.log(floorData);
        let floorHtml = ``;
        floorData.forEach((item, index) => {
            // 对headTab进行遍历以确定
            floorHtml = `
            <div class="floor wbox edit-mode floor-current" data-idx=${index + 1}>
                <div class="ct temp0">
                    <div class="mt">
                        <div class="mtTop">
                            <span class="h2_text">${index + 1}F</span>
                            <h2>${item.head.headTitle}</h2>
                        </div>
                        <ul class="tab" id="headTab" data-floorNum=${index}>
                        </ul>
                    </div>
                <div class="mc">
                    <div class="mc_l" style="background:${item.bodyLeft.background}">
                        <a href="" class="mc_l_img edit-mode">
                            <img src="${item.bodyLeft.leftImg}" alt="">
                        </a>
                        <div class="keyAll"> 
                            <div class="channelbg">
                                <div class="channel">
                                    <ul class="channel_inner">
                                    </ul>
                                </div>
                            </div>
                            
                            <div class="keywords edit-mode" id="keywords">
                            </div>
                        </div>
                    </div>
                    <div class="main_warp" id="main_warp">
                        <div class="main">
                            <div class="mc_c">
                                <ul class="slider edit-mode" id="slider" style="height:100%"> 
                                </ul>
                                <ol class="floornav" id='floornav'>
                                </ol>
                                <div class="slider_page">
                                    <p class="slider_up">
                                        <a href="javascript:void(0)"></a>
                                        <span class="floorprev"></span>
                                    </p>
                                    <p class="slider_down">
                                        <a href="javascript:void(0)"></a>
                                        <span class="floornext"></span>
                                    </p>
                                </div>
                                <div class="brand_slider edit-mode">
                                </div>
                            </div>
                           
                            <div class="mc_r">
                                <ul class="mc_r_inner edit-mode">
                                </ul>
                            </div>
                        </div>

                    </div>
                   
                </div>
              
                </div>
            </div>
            `;
            $("#floorwrap").append(floorHtml);
        })
        // floor渲染 end
        // 头部tab栏遍历 渲染start遍历每一个headTab同时添加进去

        //1. 取出所有的headTab
        let headTab = [];
        floorData.forEach((item, index) => {
            headTab.push(item.head.headTab);
        })
        console.log(headTab);
        // 2.把每一个插入到对应下标的ul之中
        headTab.forEach((item, index) => {
            // 3.对每一个item进行遍历
            let headTabHtml = ``;
            item.forEach((item2, index2) => {
                headTabHtml = `
                    <li class="edit-mode">
                        <a>${item2}</a>
                    </li>
                `;
                $("#floorwrap").children("")
                    .eq(index).find("#headTab").append(headTabHtml);
            })
        })
        // 第一个li获得样式cur start
        for (var i = 0; i < 7; i++) {
            $("#floorwrap").children().eq(i).
                find("#headTab").children("li").eq(0).addClass("tabcur")
        }
        // 头部tab栏遍历 渲染end
        // 身体 start
        // 身体左侧 链接遍历 start
        let channel_inner = [];
        floorData.forEach((item, index) => {
            channel_inner.push(item.bodyLeft.channel_inner);
        })
        console.log(channel_inner);
        // 2.把每一个插入到对应下标的ul之中
        channel_inner.forEach((item, index) => {
            // 3.对每一个item进行遍历
            let channel_innerHtml = ``;
            item.forEach((item2, index2) => {
                channel_innerHtml = `
                    <li class="edit-mode">
                        <a style="display:block">${item2}</a>
                    </li>
                `;
                console.log(item2);
                $("#floorwrap").children("")
                    .eq(index).find(".channel_inner").append(channel_innerHtml);
            })
        })
        // 身体左侧 链接遍历 end
        let keywords = [];
        floorData.forEach((item, index) => {
            keywords.push(item.bodyLeft.keywords);
        })
        console.log(keywords);
        // 身体左侧,主要链接遍历 start
        keywords.forEach((item, index) => {
            let keywordsUlName = ``;
            // 遍历对象属性名.,创建ul
            for (let key in item) {
                keywordsUlName = `
                        <ul class=${key}>
                        </ul>
                    `
                $("#floorwrap").children("")
                    .eq(index).find("#keywords").append(keywordsUlName);
                // 遍历对象的属性值,创建li

                let liHtml = ``
                item[key].forEach((item2) => {
                    liHtml += `
                                <li>
                                    <a>${item2}</a>
                                </li>
                            `;
                    $("#floorwrap").children("")
                        .eq(index).find("#keywords")
                        .find("ul")
                        .append(liHtml);
                })
            }
        })
        // 身体左侧链接遍历 end

        // 身体右侧 start

        // 中间 小轮播图区域 start
        // 1.遍历获取每个小轮播图
        let SmallSwiper = [];
        floorData.forEach((item) => {
            SmallSwiper.push((item.bodySwiper.SwiperImg));
        })
        console.log(SmallSwiper);
        // 2.把每一个插入到对应下标的ul之中
        SmallSwiper.forEach((item, index) => {
            // 3.对每一个item进行遍历
            let SmallSwiperHtml = ``;
            let SmallPointHtml = ``
            item.forEach((item2, index2) => {
                SmallSwiperHtml = `
                <li>
                    <a href="" style="display:block">
                        <img src=${item2} alt="" />
                    </a>
                </li>
                `;
                SmallPointHtml = `
                <li>
                    <a></a>
                </li>
                `;
                $("#floorwrap").children("")
                    .eq(index).find("#slider").append(SmallSwiperHtml);
                $("#floorwrap").children("")
                    .eq(index).find("#floornav").append(SmallPointHtml);
            })
        })
        // 给每一个ol的第一个li添加一个cur样式
        for (var i = 0; i < 7; i++) {
            $("#floorwrap").children().eq(i).
                find("#floornav").children("li").eq(0).addClass("cur")
        }


        // 2.遍历获取每个商标
        let brandImg = [];
        floorData.forEach((item) => {
            brandImg.push((item.bodySwiper.brandImg));
        })
        brandImg.forEach((item, index) => {
            // 3.对每一个item进行遍历
            let brandImgHtml = ``;
            item.forEach((item2, index2) => {
                brandImgHtml += `
                <li>
                    <a href="" style="display:block">
                        <img src=${item2} alt="" />
                    </a>
                </li>
                `;
                // let brandUlHtml=``;
                for (var i = 1; i <= index2; i++) {
                    if ((index2 + 1) % 6 == 0) {
                        brandUlHtml = `
                            <ul>
                                ${brandImgHtml}
                            </ul>
                        `;
                        brandImgHtml = ``;
                        $("#floorwrap").children("")
                            .eq(index).find(".brand_slider").append(brandUlHtml);
                        break;
                    }

                }

            })
        })
        // 进行遍历,其中有需要单独进行设置的
        // 中间 小轮播图区域 end

        // 右边 start
        let bodyRight = [];
        floorData.forEach((item) => {
            bodyRight.push(item.bodyRight);
        })
        // 2.把每一个插入到对应下标的ul之中
        bodyRight.forEach((item, index) => {
            // 3.对每一个item进行遍历
            let bodyRightHtml = ``;
            item.forEach((item2, index2) => {
                bodyRightHtml = `
                    <li class="edit-mode">
                        <a style="display:block">
                            <img src=${item2} class="lazyloading" />
                        </a>
                    </li>
                `;
                $("#floorwrap").children("")
                    .eq(index).find(".mc_r_inner").append(bodyRightHtml);
            })
        })
        // 右边 end
        // 身体右侧 end
        // 其余tab的图片 start
        let tabOther = [];
        floorData.forEach((item) => {
            tabOther.push(item.tabOther);
        })
        // 2.把每一个插入到对应下标的ul之中
        tabOther.forEach((item, index) => {
            // 3.对每一个item进行遍历
            let mainHtml = ``;
            item.forEach((item2, index2) => {
                mainHtml = `
                <div class="main">
                    <ul class="main_inner" id="main_inner">
                    </ul>
                </div>
                `;
                $("#floorwrap").children()
                    .eq(index).children().children(".mc").
                    children().eq(1).append(mainHtml);
                // console.log(item2);
            })
        })

        // 设置初始样式
        for (var i = 0; i < 7; i++) {
            $("#floorwrap").children()
                .eq(i).find(".main_warp").children(".main").eq(0)
                .css("display", "block").siblings(".main").css("display", "none")

            let sliderHtml = `
            <div class="page_slider" style="z-Index=1000">
                <p class="page_down">
                    <a href="javascript:void(0)"></a>
                    <span class=".rightnext"></span>
                </p>
            </div>
            `;
            $("#floorwrap").children()
                .eq(i).children().children(".mc").
                children().eq(1).append(sliderHtml)

        }

        // 把每个item单独加到每个ul里面去
        tabOther.forEach((item, index) => {
            item.forEach((item2, index2) => {
                let tabUlHtml = ``;
                item2.forEach((item3, inde3) => {
                    tabUlHtml = `
                    <li>
                        <a>
                            <img class="lazyloading" src=${item3.src} />
                            <p class="p_name">${item3.p_name}</p>
                            <p class="p_price">
                            <span>¥</span>${item3.p_price}
                            </p>
                        </a>
                    </li>
                `;
                    $("#floorwrap").children().eq(index)
                        .children().children(".mc").children()
                        .eq(1).children().eq(index2 + 1).children().append(tabUlHtml)
                })


            })
        })


        //    点击事件
        // 设置ul下标
        // let tabMainIndex = 0;
        $(".page_slider").click(function (evt) {
            // tab跟随切换

            // 获取这个值
            let $index = $(this).parent().parent().parent()
                .children().eq(0).children().eq(1)
                .children("li.tabcur").index();
            $index++;
            if ($index >= $(this).parent().children(".main").length) {
                $index = 0;
            }
            $(this).parent().parent().parent()
                .children().eq(0).children().eq(1)
                .children("li").eq($index)
                .siblings().removeClass("tabcur").end().addClass("tabcur");

        let tabMainIndex = $(this).parent().children("[style='display:block']").index();
        tabMainIndex++;
        if (tabMainIndex >= $(this).parent().children(".main").length) {
            tabMainIndex = 0;
        }
        $(this).parent().children(".main").eq($index).css("display", "block")
            .siblings(".main").css("display", "none");
        })


        // 其余tab的图片
        // 身体 end
        // ajax请求 
    })
})