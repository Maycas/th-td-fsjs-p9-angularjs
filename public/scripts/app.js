/**
 * Angular.js app 'app'
 * @namespace app
 * @author Marc Maycas
 */

(function () {
    'use strict';

    angular.module('app', ['ngRoute'])
        .factory(exceptionConfig);

    function exceptionConfig() {
        // when an error occurs, this returned function will handle it
        return function exceptionHandler(exception, cause) {
            alert("An exception has occurred: " + exception + ". Caused by: " + cause);
        };
    }

})();