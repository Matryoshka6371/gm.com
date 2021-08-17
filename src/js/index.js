// 2021-08-17 16:50
// 使用jQuery实现顶部动态效果
$(function () {
    $("#gome-user").hover(function(){
        $(".public_down").css({
            "display":"block",
        });
        $(" #user-name").css({
            border:"1px solid #e6e6e6",
        })
        $("#gome-user b a").css({
           color:"#b20fd3",
        })
        $("#gome-user").css({
            border:"1px solid #e6e6e6",
            borderBottom:"none",
            backgroundColor:"#white"
         })
         $("#gome-user b a").css({
             padding:"20px 2px",
              backgroundColor:"#white"

         })
         $("#gome-user b i").css({
            backgroundPosition: "-55px -433px",
         })
    },function(){
        $(".public_down").css("display","none");
        $("#gome-user").css({
            paddingBottom:0,
            border:"none",
            backgroundColor:"#f8f8f8",
        })
        $("#gome-user b a").css({
            color:" #888",
         })
         $("#gome-user b i").css({
            backgroundPosition: "-62px -433px",
         })
    })
})
//