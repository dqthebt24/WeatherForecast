// $(document).ready(function(){
//     $('.header').height($(window).height());
// })

var appForecast = angular.module('appForecast',['ngRoute', 'ngResource']);

appForecast.config(['$routeProvider', function($routeProvider){
	
	$routeProvider.when('#!/',{
		templateUrl: '../pages/home.html',
		controller: 'homepageController'
	})

	. when('#!/forecast',{
		templateUrl: '../pages/forecast.html',
		controller: 'forecastController'
	});
}]);

appForecast.controller('homepageController',['$scope', function($scope){

}]);

appForecast.controller('forecastController', ['$scope', function($scope){

}]);