// 2021-08-17 16:50
// 使用jQuery实现顶部动态效果
$(function () {
    //左边登录动态效果
    //设置主要颜色
    const $mainColor="#b20fd3";
    $("#gome-user").hover(function(){
         $("#gome-user b").css({
            border:"1px solid #e6e6e6", 
            borderBottom:"none",
            borderTop:"none",
            backgroundColor:"white",
            padding:" 0 19px 1px 9px"
         })
         $("#gome-user b a").css({
            color:$mainColor,
         })
         $("#gome-user b i").css({
            backgroundPosition: "-55px -433px",
         })

         $("#gome-user .public_down").css({
            "display":"block",
        });
         $(" #user-name").css({
            border:"1px solid #e6e6e6",
        })
    },function(){
        $("#gome-user .public_down").css("display","none");
        $("#gome-user b").css({ 
            border:"none",
            backgroundColor:"#f8f8f8",
            padding: "0 20px 0 10px"
        })
        $("#gome-user b a").css({
            color:" #888",
         })
         $("#gome-user b i").css({
            backgroundPosition: "-62px -433px",
         })
    })
    //右边动态效果
    $("#gome-top-right>li").hover(function(evt){
        // 显示
        let e=evt.target||evt.srcElement;
        $(this).children("b").css({
            border:"1px solid #e6e6e6", 
            borderBottom:"none",
            borderTop:"none",
            backgroundColor:"white",
            padding:" 0 19px 1px 9px"
        })
        $(this).children(".public_down").css({
            display:"block",
        })
       $(this).find("i").css({
            backgroundPosition: "-55px -433px",
         })
        $(e).children("b a").css({
            color:$mainColor,
         })
    },function(){
        $(this).children("b").css({
            border:"none",
            backgroundColor:"#f8f8f8",
            padding: "0 20px 0 10px"
        })
        $(this).find("i").css({
            backgroundPosition: "-62px -433px",
         })
        $(this).children("a").css({
            color:"#888",
         })
         //字体颜色,隐藏链接和顶部字体颜色`
         $("#gome-top-right>li>b>a").css({
            color:"#888",
         })
         $(this).children(".public_down").css({
            display:"none",
        })
         //$(evt)拿到的是事件对象
    })

    // head动态效果
})

//