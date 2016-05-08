/// <reference path='../../typings/tsd.d.ts' />
/// <reference path='indexController.ts' />
module udoaApp {
    "use strict";

    angular.module("app", ["ui.router", "ngMaterial"]);
    
    routes.$inject = ["$stateProvider", "$urlRouterProvider"]
    function routes($stateProvider: ng.ui.IStateProvider, $urlRouterProvider: ng.ui.IUrlRouterProvider) {


        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('/', {
                url: '/',
                templateUrl: '/home.html',
                controller: IndexController
            })

    }
    angular
        .module("app")
        .config(routes);

}
