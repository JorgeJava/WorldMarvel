var app = angular.module('website', [
    'ngRoute',
    'ui.bootstrap'
]).directive('loading',   ['$http' ,function ($http)  
{  
    return {  
        restrict: 'A',  
        template: '<div class="loading-spiner"><img src="/img/marvel-loader.gif" class="imgMarvelLoader"/> </div>',  
        link: function (scope, elm, attrs)  
        {  
            scope.isLoading = function () {  
                return $http.pendingRequests.length > 0;  
            };  
 
            scope.$watch(scope.isLoading, function (v)  
            {  
                if(v){  
                    elm.show();  
                }else{  
                    elm.hide();  
                }  
            });  
        }  
    };  
}]);


/*angular.module('aplicacao').controller('Rest', function ($scope, $http){
    $http.get('/v1/public/characters').
        success(function(data) {
            $scope.marvel = data;
        }
    );
  });*/

  


/**
 * Configuração da Rota
 */
app.config(['$routeProvider', function ($routeProvider){
    $routeProvider

    .when("/",{templateUrl: "templates/home.html", controller: "HomeCtrl"})
    .when("/about", {templateUrl: "templates/about.html", controller: "AboutCtrl"})
    .when("/page-actor", {templateUrl: "templates/page-actor.html", controller: "PageActorCtrl"})
    .when('/404', {templateUrl: "templates/404.html"})
    .otherwise("/404");
    
}])



/**
 * Configuração do Controller
 *
app.controller('HomeCtrl',function ($scope, $location){

    **Atividade do Carousel 
    $('.carousel').carousel({
        interval:5000
    });

    **Atividade do Tooltip 
    $('.tooltip-social').tooltip({
        selector: "a[data-toggle=tooltip]"
    })
    
});*/

app.controller('AboutCtrl', function ($scope, $location){

})

app.controller('PageActorCtrl', function ($scope, $location){

})



app.controller('HomeCtrl', function($scope, $location) {

  /**Atividade do Carousel */
  $('.carousel').carousel({
      interval:5000
  });

  /**Atividade do Tooltip */
  $('.tooltip-social').tooltip({
      selector: "a[data-toggle=tooltip]"
  })
 
});


app.controller('MarvelCtrl', function($scope, $location, $http) {

   $scope.char={};
    $scope.showCharInfo= false;
    $scope.getCharacters = function(val) {
          $scope.timeStamp=  Date.now();
          $scope.publicKey="f8d18c39ffa1066c77bcce602e12d023";
          baseUrl= "http://gateway.marvel.com/v1/public/characters";

      return $http.get(baseUrl, {
        params: {
          nameStartsWith: val,
          limit: 25,
          ts: $scope.timeStamp,
          apikey: $scope.publicKey
        
        }
      }).then(function(response){
        $scope.charInfoArr=response.data.data.results;
        return response.data.data.results.map(function(item){
          
          return item.name;
        });
      });
    };
  
    $scope.selectCharacter=function (item){
      angular.forEach($scope.charInfoArr, function(obj, key){
        if(obj.name===item){
        
           if (obj.thumbnail){
             $scope.char.thumb= obj.thumbnail.path+"."+obj.thumbnail.extension;
           }else{
             $scope.char.thumb="";
           }
           
           $scope.char.name= obj.name;
           $scope.char.desc= obj.description;
           $scope.showCharInfo= true;
        }
         
      });
      
    }
  
  });

  app.controller('myCtrl', function ($scope, $http) {  
    // Show loading spinner.
    $scope.loading = true;
    $http.get('/some/awesome/content')
      .success(function (data) {
        // Do stuff with data.
      })
      .catch(function (err) {
        // Log error somehow.
      })
      .finally(function () {
        // Hide loading spinner whether our call succeeded or failed.
        $scope.loading = false;
      });
  });



  app.controller("imgRandomCtrl", function($scope) {
    $scope.imgUrls = [
      "/img/404-captain-marvel.jpeg",
      "/img/404-iron-man.jpeg"
    ];
    $scope.imgRandom = function(imgUrls) {
      return imgUrls[Math.floor(Math.random() * imgUrls.length)]
    }
    $scope.reload = function() {
      $window.location.reload();
    }
  })

