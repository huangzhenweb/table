var express=require("express");
var app=express();
var path=require("path");
var mysql=require("./mysql");
app.use(express.static(path.join(__dirname,"static")));//静态文件
app.get("/",function(req,res){
    res.sendFile(path.join(__dirname,"/static/template/index.html"));
});
app.get("/template/:name",function(req,res){
    res.sendFile(path.join(__dirname,"/static/template/"+req.param.name));
});
//查询
app.get("/select",function(req,res){
    mysql.query("select * from stuinfo",function(error,result){
        // console.log(result)
        res.send(JSON.stringify(result));
    })
})
//删除
app.get("/del",function(req,res){
    var id=req.query.id;
    mysql.query("delete from stuinfo where id="+id,function(error,result){
        // console.log(result);
        res.send("ok");
    })
})
//修改
app.get("/edit/",function(req,res){
    var id=req.query.id;
    mysql.query("select * from stuinfo where id="+id,function(error,result){
        console.log(result)
        // res.send(JSON.stringify(result));
    })
})
app.get("/editinfo",function(req,res){
    var id=req.query.id;
    // console.log(id);
    var name=req.query.name;
    // console.log(name)
    var age=req.query.age;
    var sex=req.query.sex;
    var classes=req.query.classes;
    mysql.query(`update stuinfo set name='${name}',sex='${sex}',age='${age}',classes='${classes}' where id=${id}`,function(error,result){
        res.send("ok");
    })
})
//添加
app.get("/addData",function(req,res){
    var name=req.query.name||"";
    var age=req.query.age||"";
    var sex=req.query.sex||"";
    var classes=req.query.classes||"";
    mysql.query(`insert into stuinfo (name,age,sex,classes) values ('${name}','${age}','${sex}','${classes}')`,function(error,result){
        // console.log(result)
        // if(result.affectedRows>0){
            res.send(result.insertId.toString());
        // }



    })
})
app.listen(8888);