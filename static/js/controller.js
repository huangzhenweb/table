//控制器      $http服务本身就是promise对象 有对列方法，then
    angular.module("controller",["services"]).controller("main",["$scope","$http","Stuinfo",function($scope,$http,Stuinfo){
        //查询
        Stuinfo.then(function(data){//Stuinfo  promise对象
        // console.log(data)
        Stuinfo.data=data.data;//为了确保他俩是操作的是一个东西 stuinfo本身就是一个对象 对象上面就有data这个数据，
        $scope.data=data.data;
        // $scope.data 这个$scope只作用域这个里面
    })
        //删除
    $scope.del=function(id){//删除的方法
        $http({url:"/del",params:{id:id}}).then(function(data){//发送ajax连接数据库
            // console.log(data);
            $scope.data.forEach(function(obj,index){//循环
                // console.log(obj)
                if(obj.id==id){//判断id是不是等于传过来的id
                    $scope.data.splice(index,1)//在视图上删掉
                }
            })
            
        })
    }
        //编辑
}]).controller("edit",["$scope","$http","Stuinfo","$routeParams",function($scope,$http,Stuinfo,$routeParams){
    // console.log(Stuinfo)
    // $routeParams  路由的参数 通过他获取id
    // console.log($routeParams);//能获取到要编辑的id
        Stuinfo.then(function(data){//用这个方法 说明数据已经拿到了
           Stuinfo.data=data.data;
           $scope.data=data.data;
           var id=$routeParams.id;
           // console.log(id)
           // console.log(Stuinfo)
            $scope.data.forEach(function(obj,index){
                // console.log(obj)
                // console.log(obj.id)
                if(obj.id==id){
                    // $scope.data=obj;
                   $scope.current=obj ;//不能用$scope.data,用这个就把值换掉了，所有给当前的这个存个值，下面不影响$scope
                    // console.log($scope.data)
                }
            })
        });
        //修改
    $scope.submit=function(id){//提交
        // alert(1)
        var info={};//创建一个空对象
        // console.log(info)
        // console.log(Stuinfo.data);//这个输出的结果是所有的对象[Object, Object, Object, Object]
        //错误的 console.log($scope.data);//输出结果是你编辑的哪一行输出哪一行Object {id: 100, name: "2221", sex: 2, age: 3, classes: "221"…}
        // 正确的 console.log($scope.data);[Object, Object, Object, Object]
        //上面用的是$scope.current没有影响$scope.data.所以循环的时候$scope依旧可以用
        $scope.data.forEach(function(obj,index){//提交的时候循环 里面传一个对象 一个下标
            // console.log(obj)
            if(obj.id==id){//去过 对象里面的id就等于传的id
                info=obj;//这个对象就放在空的对象info里
            }
        })
        $http({url:"/editinfo",params:info}).then(function(data){//连接数据库，传过去要修改的内容，这些内容放在info这个对象上
           if(data.data=="ok"){//穿过来是ok  说明数据库添成功
               $scope.data=data.data;//让视图也显示出来
           }
        })
    }
        //添加
}]).controller("add",["$scope","$http","Stuinfo",function($scope,$http,Stuinfo){//Stuinfo这个服务只要依赖在任何地方都可以用
        // console.log(Stuinfo)
        Stuinfo.then(function(data){//Stuinfo这个对象上有这个then方法，用then这个方法说明数据已经拿到了，里面是要处理的东西
            Stuinfo.data=data.data;//首先关联他俩为了让他俩处理的是同一个东西
            $scope.data=Stuinfo.data;
            // console.log($scope.data);
            $scope.addData=function(){//添加完提交以后执行的事情
                var obj={};//创建一个空对象
                obj.name=$scope.name;//对象的名字就等于$scope的名字
                obj.age=$scope.age;//对象的年龄就等于$scope的年龄
                obj.sex=$scope.sex;//性别
                obj.classes=$scope.classes;//班级
                // $scope.data.push(obj);
                $http({url:"/addData",params:obj}).then(function(data){//发送ajax连接数据库
                    // console.log(obj);
                    // console.log(data.data);//返回的是id
                    // if(data.data>0){
                        // alert(1)
                        // console.log(data.data)
                        obj.id=data.data;//对象的id等于传过来的id
                        $scope.data.push(obj);//把对象添加到$scope.data身上。视图上显示出来
                    // }
                })
            }
        });
}]);