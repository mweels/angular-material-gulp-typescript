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
