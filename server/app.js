const express=require("express");
const cors=require("cors");
const db=require("./libs/DBhelper");
const file=require("./libs/fileHelper");
const md5=require("md5");
const { response } = require("express");


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
    let sql ="INSERT INTO `userinfo` (`uName`,`uPwd`,`uPhone`) VALUES(?,?,?);";


    // md5的二次加密
    let params=[user,md5(md5(pwd)+"lxw"),phone];

    try{
        let result=await db.exec(sql,params);
        //注意:除了查询返回的是数组,
        //其他 (插入,修改,删除)返回的 受影响行数
        //不是undefined并且受影响行数大于等于1
        console.log(result);
        let isReg=result&&result.affectedRows;
        response.json({
            msg:isReg?"注册成功":"注册失败",
            code:200
        })
    }catch(error){
        response.json({
            msg:"该手机号已经被注册,请更换手机号进行注册",
            err:error,
            code:-200
        })
    }
})

// 201/08/25/16:30
// 3.登录接口
server.post("/accout/login",async (request,response)=>{
    // 1.接受前端的数据(手机号和密码)
    let {phone,pwd}=request.body;
    // 2.准备sql语句
    let sql="SELECT `uId`,`uName`,`uSex`,`uPhone` FROM `userinfo` WHERE uname=? AND upwd=? AND ustatus=1;";
    let params=[
        phone,
        md5(md5(pwd)+"lxw")
    ]
    try{
        let result=await db.exec(sql,params);
        if(result&&result.length>=1){
            // 查询语句返回数组
            response.json({
                msg:"登录成功!",
                data:result,
                code:200

            })
        }else{
            response.json({
                msg:"登录失败!",
                code:200
            })
        }
    }catch(error){
        response.json({
            msg:"登录失败!",
            err:error,
            code:-200
        })
    }
})




// 设置端口
server.listen(8080,()=>{
    console.log("服务启动成功!8080端口监听中");
})
