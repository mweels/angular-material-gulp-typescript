/// <reference path='../../typings/tsd.d.ts' />
/// <reference path='indexController.ts' />
var udoaApp;
(function (udoaApp) {
    "use strict";
    angular.module("app", ["ui.router", "ngMaterial"]);
    routes.$inject = ["$stateProvider", "$urlRouterProvider"];
    function routes($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');
        $stateProvider
            .state('/', {
            url: '/',
            templateUrl: '/home.html',
            controller: udoaApp.IndexController
        });
    }
    angular
        .module("app")
        .config(routes);
})(udoaApp || (udoaApp = {}));
