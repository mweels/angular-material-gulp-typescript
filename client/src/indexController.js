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
