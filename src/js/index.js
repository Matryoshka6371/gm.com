// 2021-08-17 16:50
// 使用jQuery实现顶部动态效果

//数据加载在页面资源完成之前
$(function () {
    //左边登录动态效果
    //设置主要颜色
    const $mainColor = "#b20fd3";
   
    $("#gome-user").hover(function () {
        $("#gome-user b").css({
            border: "1px solid #e6e6e6",
            borderBottom: "none",
            borderTop: "none",
            backgroundColor: "white",
            padding: " 0 19px 1px 9px"
        })
        $("#gome-user b a").css({
            color: $mainColor,
        })
        $("#gome-user b i").css({
            backgroundPosition: "-55px -433px",
        })

        $("#gome-user .public_down").css({
            "display": "block",
        });
        $(" #user-name").css({
            border: "1px solid #e6e6e6",
        })
    }, function () {
        $("#gome-user .public_down").css("display", "none");
        $("#gome-user b").css({
            border: "none",
            backgroundColor: "#f8f8f8",
            padding: "0 20px 0 10px"
        })
        $("#gome-user b a").css({
            color: " #888",
        })
        $("#gome-user b i").css({
            backgroundPosition: "-62px -433px",
        })
    })
    //右边动态效果
    $("#gome-top-right>li").hover(function (evt) {
        // 显示
        let e = evt.target || evt.srcElement;
        $(this).children("b").css({
            border: "1px solid #e6e6e6",
            borderBottom: "none",
            borderTop: "none",
            backgroundColor: "white",
            padding: " 0 19px 1px 9px"
        })
        $(this).children(".public_down").css({
            display: "block",
        })
        $(this).find("i").css({
            backgroundPosition: "-55px -433px",
        })
        $(e).children("b a").css({
            color: $mainColor,
        })
    }, function () {
        $(this).children("b").css({
            border: "none",
            backgroundColor: "#f8f8f8",
            padding: "0 20px 0 10px"
        })
        $(this).find("i").css({
            backgroundPosition: "-62px -433px",
        })
        $(this).children("a").css({
            color: "#888",
        })
        //字体颜色,隐藏链接和顶部字体颜色`
        $("#gome-top-right>li>b>a").css({
            color: "#888",
        })
        $(this).children(".public_down").css({
            display: "none",
        })
        //$(evt)拿到的是事件对象
    })

    // head动态效果

    //head切换search_type
    //head动态 1. 悬浮效果
    $(".search_type_down").hover(function () {
        $(".search_type_list").css({
            "display": "block",
        })
    }, function () {
        $(".search_type_list").css({
            "display": "none",
        })
    })
    //搜索框点击事件
    $(".search_type_list").on("click", ".search_type_item", function (evt) {
        e = evt.target || evt.srcElement;
        let $txt = $(e).text();
        $(".search_type_selected").text($txt);
        $(".search_type_list").css({
            "display": "none",
        })
    })
    $(".search_type_item").on("mouseenter", function () {
        $(this).addClass("hover_item").siblings().removeClass("hover_item")
    })
    $(".topsearch .hotkeyword a").hover(function () {
        $(this).addClass("hoverhightlight").siblings().removeClass("hoverhightlight")
    }, function () {
        $(this).removeClass("hoverhightlight")
    })
    $(".mygome_side").hover(function () {
        $("#hdrcarttext").css({
            color: $mainColor,
            "textDecoration": "underline"
        })
    }, function () {
        $("#hdrcarttext").css({
            color: "#5e5e5e",
            "textDecoration": "none"
        })
    })
    //右侧上下滚动开始
    //克隆第一个图片li追加到最后面
    function textScroll(){
        $(".hd-clickscroll").animate({
         top: -hd_clickIndex*38
       })
 }
    $(".hd-clickscroll")
    .append($(".hd-clickscroll")
    .children("li").eq(0).clone(false));
    //设置下标
    let hd_clickIndex=0;
    let $timer1=null
    //定时器进行轮播
    $timer1= setInterval(()=>{
            hd_clickIndex++;
            if( hd_clickIndex>1){
                hd_clickIndex=0;
                $(".hd-clickscroll").css({
                    top:0
                })
            }
        textScroll();
       },3000)

    //    点击按钮进行切换
    // 1.移入暂停,移出回复时间
    $(".hdrsideRoll").hover(function(){
        clearInterval($timer1)
    },()=>{
        $timer1=setInterval(()=>{
            hd_clickIndex++;
            if( hd_clickIndex>1){
                hd_clickIndex=0;
                $(".hd-clickscroll").css({
                    top:"0px"
                })
            }
        textScroll();
       },3000)
       
    })
    //2.点击事件
    $(".hdrsRollbtn").on("click","a",function(evt){
        let e=evt.target||evt.srcElement;
        if(e.className=="j-hdrbtn-up"){
            hd_clickIndex++;
            if( hd_clickIndex>1){
                hd_clickIndex=0;
                $(".hd-clickscroll").css({
                    top:0
                })
            }
            textScroll();
        }else if(e.className=="j-hdrbtn-down"){
            hd_clickIndex--;
            if( hd_clickIndex<0){
                hd_clickIndex=1;
                $(".hd-clickscroll").css({
                    top:"-38px"
                })
            }
            textScroll();
        }
        
    })
    
    // 2021年8月20日 8:30
    //移入图表区域时,图片字体都变紫色
    $("#icon_server").children("li").hover(function(){
     $(this).find(".gm-icon").css({color:$mainColor}).end()
     .find(".icon_server_li_titile").css({color:$mainColor})
    },function(){
        $(this).find(".gm-icon").css({color:"#373737"}).end()
        .find(".icon_server_li_titile").css({color:" #5e5e5e"})
    })
    //2021年8月20日13:18

    // 领券中心

    //猜你喜欢 开始
    //1. ul中的li复制5个追加到最后面
    for(var j=0;j<3;j++){
        for(var i=1;i<=5;i++){
            $("#j-imgload-recomm").children("ul").eq(j)
            .append( $("#j-imgload-recomm").children("ul").eq(j).children("li").eq(0).clone(true));
           }
    }
  
    //    设置ul的下标
    let maybeulIndex=0;
    $(".change_btn").children(".nex").on("click",function(){
        maybeulIndex++;
        if( maybeulIndex>$("#j-imgload-recomm").children("ul").length){
            maybeulIndex=0;
        }
        $("#j-imgload-recomm").children("ul")
        .eq(maybeulIndex).siblings().css("display","none")
        .end().css("display","block")
    })
    $(".change_btn").children(".pre").on("click",function(){
        maybeulIndex--;
        if( maybeulIndex<0){
            maybeulIndex= $("#j-imgload-recomm").children("ul").length;
        }
        $("#j-imgload-recomm").children("ul")
        .eq(maybeulIndex).siblings().css("display","none")
        .end().css("display","block")
    })

    //猜你喜欢完成
    

    //侧边栏开始
    //二维码弹出
    $("#gome-aside-app").hover(function(){
        $("#gome-aside-app-code").animate({"right":"335px"})
    },function(){
        $("#gome-aside-app-code").animate({"right":"34px"})
    })
    //移动到哪里,哪里变成深色
    $(".gome-aside").on("mouseenter","li",function(){
       $(this).find("a").parent().siblings().find("a").removeClass("barClass")
       .end().end().end().addClass("barhover");

    })
    $(".gome-aside").on("mouseleave","li",function(){
        $(this).find("a").parent().siblings().find("a").removeClass("barClass")
        .end().end().end().removeClass("barhover");
 
     })
    //侧边栏结束

    //楼层开始
    $(".__gome_not-care .tab").children("li").eq(0).addClass("tabcur")

    //给中间第一个添加样式
    $("#floornav").children("li").eq(0).addClass("floorcur")
    //楼层结束

    // 暂时复制楼层 start
    // for(var i=1;i<=6;i++){
    //     $("#floorwrap").append($("#floor").clone(true))
    // }
    // 暂时复制楼层 end


    //帮助 start
    //复制dl
    for(var i=0;i<4;i++){
        $("#gome-help-box")
        .append($("#gome-help-box")
        .children("dl").eq(0).clone(true))
    }
    //帮助end

    // 底部开始

    //底部结束


})