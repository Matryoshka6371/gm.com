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


// 1.请求index数据
server.get("/api/index",async(request,response)=>{
    var bannerData=JSON.parse((await file.getData("./data/index/mainbanner.json"))||"[]");
    response.json({
        msg:"轮播图数据加载成功",
        data:bannerData,
        code:200
    })
})

// 2.注册页面接口
server.post("/account/reg",async function(request,response){
    let {user,pwd,phone}=request.body;
    // 2,准备sql语句
    let sql ="INSERT INTO `userinfo` (`uName`,`uPwd`,`uPhone`) VALUES(?,?,?,?);"


    // md5的二次加密
    let params=[user,md5(md5(pwd)+"lxw"),phone];

    try{
        let result=await db.exec(sql,params);
        //注意:除了查询返回的是数组,
        //其他 (插入,修改,删除)返回的 受影响行数
        //不是undefined并且受影响行数大于等于1
        console.log(result);
        let isReg=result&&result.affectRows;
        response.json({
            msg:isReg?"注册成功":"注册失败",
            code:200
        })
    }catch(error){
        response.json({
            msg:"注册失败",
            err:error,
            code:-200
        })
    }
})




// 设置端口
server.listen(8080,()=>{
    console.log("服务启动成功!8080端口监听中");
})
