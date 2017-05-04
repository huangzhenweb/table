var mysql=require("mysql");
var connect=mysql.createConnection({
    host:"localhost",
    port:3306,
    user:"root",
    password:"",
    database:"uek1610"
});
module.exports=connect;