/// <reference path='../../typings/tsd.d.ts' />
/// <reference path='indexService.ts' />

module udoaApp {
    'use strict';
    export interface IScopeIndexController extends ng.IScope {
        controller: IndexController;
        helloWorld: string;
    };
    export class IndexController {

        scope: IScopeIndexController;
        state: angular.ui.IStateService;

        static $inject = ["$state","$scope",'IndexService'];
        constructor(protected $state: angular.ui.IStateService, protected $scope: udoaApp.IScopeIndexController, indexService : IndexService) {
            this.scope = $scope;
            this.scope.controller = this;
            this.state = $state;
            
            this.scope.helloWorld = indexService.returnHelloWorld();
            
        };
        helloWorld() {
            console.log("here");
            this.scope.helloWorld = "Hello World from controller";
        }
    }
}
angular.module("app").controller('IndexController', udoaApp.IndexController);

