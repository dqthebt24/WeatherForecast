$(document).ready(function(){
    $('.header').height($(window).height());
})

var appForecast = angular.module("appForecast",["ngRoute", "ngResource"]);