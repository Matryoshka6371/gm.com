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

    //引入json数据格式
    //数据渲染,左侧分类渲染
    $.getJSON("../../data/index/category.json",function(data){
         // 随机颜色函数
        console.log(data);
        let mixId=[];
        data.forEach((item,index)=>{
        let mixObj={};
        var mixIdr=item.id.split("-");
        mixObj.modelid=mixIdr[0];
        mixObj.id=mixIdr[1];
        mixObj.index=index;
        mixId.push(mixObj);
        // mixId.push({modelid:mixIdr[0],id:mixIdr[1],index})
    })
    console.log(mixId);
    //对mixId进行去重
    for(var i=0; i<mixId.length; i++){
        for(var j=i+1; j<mixId.length; j++){
            if(mixId[i].modelid==mixId[j].modelid){         //第一个等同于第二个，splice方法删除第二个
                mixId.splice(j,1);
                j--;
            }
        }
    }
    console.log(mixId);
    
     // 渲染li
     let liStrHtml=``;
     mixId.forEach((item1,index1)=>{
                 liStrHtml+=`
                     <li data-index=${index1} modelid=${item1.modelid}>
                         <h3>
                         </h3>
                     </li>
                 `
     })
     $("#lisnav-ul").html(liStrHtml);
    //   渲染a
    let matchArr=Array.from($("#lisnav-ul").children("li"));
    console.log(matchArr);
                for(let j=0;j<matchArr.length;j++){
                  for(let i=0;i<data.length;i++){
                    if(data[i].id.includes($(matchArr[j]).attr("modelid"))){
                        console.log($(matchArr[j]).attr("modelid"));
                       let catelink=$("<a data-code="+data[i].id+"href="+data[i].href+">"+data[i].des+"</a>")
                       $(matchArr[j]).children("h3").append(catelink);
                    }else{
                        continue;
                    }
                }
              }
              
     // 复制对应数量的二级菜单,粘贴到subnav下面去
    console.log(Array.from($(".lisnav-ul").children("li")).length);
    for(let i=0;i<Array.from($(".lisnav-ul").children("li")).length;i++){
            $fullcategory=$(".fullcategory").clone(true);
            $(".subnav").append( $fullcategory.get(0));
    }
    // ul移入移出显示效果
    $(".lisnav-ul").on("mouseenter","li",function(evt){
        // console.log($(this));//li
        $(this).addClass("bgw").siblings().removeClass("bgw");
        $("#subnav").css({
            display:"block"
        })
        // console.log($(this).index());
        // 返回下标
        // console.log($(".subnav").children(".fullcategory"));
        // console.log( Array.from($(".subnav").children(".fullcategory"))[$(this).index()]);
        $(Array.from($(".subnav").children(".fullcategory"))[$(this).index()])
        .siblings().css({
            display:"none"
        }).end().css({
            display:"block",
        })
        // $(".subnav").children(".fullcategory")
        // .index($(this).index()).css("display","block")
        // .siblings().css("display","none")
    })
    $("#navBox").on("mouseleave",function(){
        $(this).find(".lisnav-ul").children("li").removeClass("bgw");
        $("#subnav").css({
            display:"none"
        })


    })

    })
    //渲染数据结束

    


   

})


//