angular.module("services",[])//Stuinfo服务 services模块
    .factory("Stuinfo",function($http){
        // var defer=$q.defer();
        // stuinfo最终结果就是promise
        return $http({url:"/select"});//因为去取数据的时候不能保证什么时候回能去回来，
        //要用这个服务在其他地方直接依赖一下就可以放在服务上在哪个里面都可以用
    })
