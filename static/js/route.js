angular.module("route",["ngRoute"]).config(function($routeProvider){//路由  引进模块 config定义  $routeProvider服务
    $routeProvider.when("/",{//then方法  当路径是/这个时候找根目录
        templateUrl:"/template/main.html",//发送ajax找/template这个路径
        controller:"main"//控制器
    }).when("/edit/:id",{//这个/edit/:id路径的时候找他对应的目录
        templateUrl:"/template/edit.html",
        controller:"edit"//控制器
    }).when("/add",{//这个/add路径的时候找他对应的目录
        templateUrl:"/template/add.html",
        controller:"add"
    })
})