// $(document).ready(function(){
//     $('.header').height($(window).height());
// })

var appForecast = angular.module('appForecast',['ngRoute', 'ngResource']);

appForecast.config(function($routeProvider){
	
	$routeProvider.when('/', {
		templateUrl: '../pages/home.html',
		controller: 'homepageController'
	})

	. when('/forecast',{
		templateUrl: '../pages/forecast.html',
		controller: 'forecastController'
	})

	. when('/forecast/:lang',{
		templateUrl: '../pages/forecast.html',
		controller: 'forecastController'
	});
});

appForecast.service('cityService', function() {
    this.city = "";
});

appForecast.controller('homepageController', ['$scope', 'cityService', function($scope, cityService){
	$scope.city = "";
    
    $scope.$watch('city', function(){
        cityService.city = $scope.city;
    });
}]);

appForecast.controller('forecastController', ['$scope', '$resource', '$routeParams', 'cityService', 
	function($scope, $resource, $routeParams, cityService){
	
	$scope.lang = $routeParams.lang || "vi";
	$scope.city = cityService.city;
	console.log("LANG=" + $scope.lang + ";" + $scope.city);
	 var weatherRequest = $resource("http://api.openweathermap.org/data/2.5/forecast?" + 
	 	"APPID=a4955935f395ef2bc00e8380a3c11c7f&lang=:lang&units=metric&q=:ct&cnt=40",
	 {ct: '@ct', lang: '@lang'});
	 try{
		var result = weatherRequest.get({ct: $scope.city, lang:$scope.lang }).$promise.then(function(data){
		 
			console.log(data);
			$scope.report = {
				error: "",
				total: data.cnt,
				list: getDaysData(data.list)
			}
			console.log($scope.report.list);
		 }); 
	 }
	 catch(e){
		$scope.report = {
			error: e,
			total: 0,
			list: []
		}
	 }
	 
	 $scope.toDateTime = function(dt){
		 var days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
		 var date = new Date(dt*1000);
		 return days[date.getDay()] + " " + date.getDate() +"-" + date.getMonth() + "-" + date.getFullYear();
	 };
	 

	 var getDaysData = function(list){
		 if(list.length <= 0){
			 console.log("LENGH < 0");
			 return [];
		 }
		 else{
			 var oldDay = 0;
			 var lstResult = [];
			for(data of list){
				var date = new Date(data.dt*1000);
				if(date.getDate() != oldDay){
					oldDay = date.getDate();
					lstResult.push(data);
				}
			}

			return lstResult;
		 }
	 }
}]);