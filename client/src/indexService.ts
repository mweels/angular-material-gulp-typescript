/// <reference path='../../typings/tsd.d.ts' />

module udoaApp {

    'use strict';

    export class IndexService {
        
        //static $inject = [];
        constructor() {
        }
        returnHelloWorld(): string {
            return "Hello World From Service"; 
        }      
    }
}

angular.module("app").service('IndexService', udoaApp.IndexService);

