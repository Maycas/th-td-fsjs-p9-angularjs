/**
 * Utilities
 * @namespace Services
 * @author Marc Maycas
 */
(function () {
    'use strict';

    angular.module('app')
        .service('utilities', utilities);

    utilities.$inject = ['dataService'];

    /**
     * @namespace Utilities
     * @name utilities
     * @desc Service to initialize data used by the app and controllers
     * @param {Object} dataService - Service that operates with the recipes API
     * @memberOf Services
     */
    function utilities(dataService) {

        /**
         * @name initializeRecipes
         * @desc Requests all the available recipes in the database and sets them in the scope's recipes property
         * @param {Object} dataService - Service that operates with the recipes API
         * @param {Object} scope - Controller's scope
         * @memberOf Services.Utilities
         */
        this.initializeRecipes = function (dataService, scope) {
            dataService.getAllRecipes(
                function (response) {
                    scope.recipes = response.data;
                });
        };

        /**
         * @name initializeCategories
         * @desc Requests all the available categories in the database and sets them in the scope's categories property
         * @param {Object} dataService - Service that operates with the recipes API
         * @param {Object} scope - Controller's scope
         * @memberOf Services.Utilities
         */
        this.initializeCategories = function (dataService, scope) {
            dataService.getCategories(
                function (response) {
                    scope.categories = response.data;
                });
        };

        /**
         * @name initializeFoodItems
         * @desc Requests all the available food items in the database and sets them in the scope's categories property
         * @param {Object} dataService - Service that operates with the recipes API
         * @param {Object} scope - Controller's scope
         * @memberOf Services.Utilities
         */
        this.initializeFoodItems = function (dataService, scope) {
            dataService.getFoodItems(
                function (response) {
                    scope.foodItems = response.data;
                }
            );
        };

    }

})();