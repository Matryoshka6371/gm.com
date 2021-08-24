const express=require("express");
const cors=require("cors");
const db=require("./libs/DBhelper");
const file=require("./libs/fileHelper");
const md5=require("md5");


// 创建对象
let server=express();
// 配置静态资源
server.use(express.static("./../src"));
// 配置中间件
// 使得post能够快速使用body
server.use(express.urlencoded({extended:false}));
server.use(express.json());

// 配置跨域
server.use(cors());


// 1.请求index轮播图数据
server.get("/api/index",async(request,response)=>{
    var bannerData=JSON.parse((await file.getData("./data/index/mainbanner.json"))||"[]");
    response.json({
        msg:"轮播图数据加载成功",
        data:bannerData,
        code:200
    })
})



// 设置端口
server.listen(8080,()=>{
    console.log("服务启动成功!8080端口监听中");
})
