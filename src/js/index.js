// 2021-08-17 16:50
// 使用jQuery实现顶部动态效果
$(function () {
    //左边登录动态效果
    $("#gome-user").hover(function(){
        $("#gome-user").css({
            border:"1px solid #e6e6e6",
            backgroundColor:"white",
            
         })
         $("#gome-user b").css({
            backgroundColor:"white",
            height:"35px",

         })
         $("#gome-user b a").css({
            color:"#b20fd3",
         })
         $("#gome-user b i").css({
            backgroundPosition: "-55px -433px",
         })

         $(".public_down").css({
            "display":"block",
        });
         $(" #user-name").css({
            border:"1px solid #e6e6e6",
        })
    },function(){
        $(".public_down").css("display","none");
        $("#gome-user").css({
            border:"none",
        })
        $("#gome-user b").css({ 
            backgroundColor:"#f8f8f8",
            height: 30
        })
        $("#gome-user b a").css({
            color:" #888",
         })
         $("#gome-user b i").css({
            backgroundPosition: "-62px -433px",
         })
    })
    //右边动态效果
    $("#gome-top-right>li").hover(function(){
       $(this).find("i").css({
            backgroundPosition: "-55px -433px",
         })
        $(this).find("li  a").css({
            color:"#b20fd3",
         })
    },function(){
        $(this).find("i").css({
            backgroundPosition: "-62px -433px",
         })
        $(this).find("li  a").css({
            color:"#888",
         })
         //$(evt)拿到的是事件对象
    })
})

//