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

/// <reference path='../../typings/tsd.d.ts' />
/// <reference path='indexService.ts' />
var udoaApp;
(function (udoaApp) {
    'use strict';
    ;
    var IndexController = (function () {
        function IndexController($state, $scope, indexService) {
            this.$state = $state;
            this.$scope = $scope;
            this.scope = $scope;
            this.scope.controller = this;
            this.state = $state;
            this.scope.helloWorld = indexService.returnHelloWorld();
        }
        ;
        IndexController.prototype.helloWorld = function () {
            console.log("here");
            this.scope.helloWorld = "Hello World from controller";
        };
        IndexController.$inject = ["$state", "$scope", 'IndexService'];
        return IndexController;
    }());
    udoaApp.IndexController = IndexController;
})(udoaApp || (udoaApp = {}));
angular.module("app").controller('IndexController', udoaApp.IndexController);

/// <reference path='../../typings/tsd.d.ts' />
var udoaApp;
(function (udoaApp) {
    'use strict';
    var IndexService = (function () {
        //static $inject = [];
        function IndexService() {
        }
        IndexService.prototype.returnHelloWorld = function () {
            return "Hello World From Service";
        };
        return IndexService;
    }());
    udoaApp.IndexService = IndexService;
})(udoaApp || (udoaApp = {}));
angular.module("app").service('IndexService', udoaApp.IndexService);
