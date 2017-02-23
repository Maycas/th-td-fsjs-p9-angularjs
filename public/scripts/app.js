/**
 * Angular.js app 'app'
 * @namespace app
 * @author Marc Maycas
 */

(function () {
    'use strict';

    angular.module('app', ['ngRoute'])
        .config(exceptionConfig);

    // Handle unhandled exceptions with $exceptionHandler

    exceptionConfig.$inject = ['$provide'];

    /**
     * @namespace app
     * @name exceptionConfig
     * @desc Uses a decorator to extend the $exceptionHandler service
     * @param {Object} $provide - Angular $provide service
     */
    function exceptionConfig($provide) {
        $provide.decorator('$exceptionHandler', extendExceptionHandler);
    }

    extendExceptionHandler.$inject = ['$delegate'];

    /**
     * @namespace app
     * @name extendExceptionHandler
     * @desc Fires an alert with the uncaught exception message
     * @param {Object} $delegate -  Instantiated service/directive/filter, prior to being passed to the service that required it
     * @returns a function that fires an alert with the exception data
     */
    function extendExceptionHandler($delegate) {
        return function (exception, cause) {
            $delegate(exception, cause);
            var errorData = {
                exception: exception,
                cause: cause
            };
            alert("An exception has occurred: " + errorData.exception + " - " + errorData.cause);
        };
    }
})();