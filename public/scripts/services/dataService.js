/**
 * DataService
 * @namespace Services
 * @author Marc Maycas
 */
(function () {
    'use strict';

    angular.module('app')
        .constant('baseURL', 'http://localhost:5000/api')
        .service('dataService', dataService);

    dataService.$inject = ['$http', 'baseURL'];

    /**
     * @namespace DataService
     * @desc Service to retrieve data using the recipe API
     * @memberOf Services
     */
    function dataService($http, baseURL) {

        /**
         * @namespace DataService
         * @name getAllRecipes
         * @desc Gets all the recipes available in the database
         * @param {function} successCallback - Function to execute once the request has been performed successfully
         * @memberOf Services.DataService
         */
        this.getAllRecipes = function (successCallback) {
            $http.get(baseURL + '/recipes')
                .then(successCallback, this.errorAlert);
        };

        /**
         * @namespace DataService
         * @name getRecipesByCategory
         * @desc Gets all the recipes from a specific category
         * @param {string} category - Recipe category parameter
         * @param {function} successCallback - Function to execute once the request has been performed successfully
         * @memberOf Services.DataService
         */
        this.getRecipesByCategory = function (category, successCallback) {
            $http.get(baseURL + '/recipes?category=' + category)
                .then(successCallback, this.errorAlert);
        };

        /**
         * @namespace DataService
         * @name getRecipe
         * @desc Gets a specific recipe identified by its '_id' parameter
         * @param {string} id - Recipe id
         * @param {function} successCallback - Function to execute once the request has been performed successfully
         * @memberOf Services.DataService
         */
        this.getRecipe = function (id, successCallback) {
            $http.get(baseURL + '/recipes/' + id)
                .then(successCallback, this.errorAlert);
        };

        /**
         * @namespace DataService
         * @name getCategories
         * @desc Gets all the possible categories available in the database
         * @param {function} successCallback - Function to execute once the request has been performed successfully
         * @memberOf Services.DataService
         */
        this.getCategories = function (successCallback) {
            $http.get(baseURL + '/categories')
                .then(successCallback, this.errorAlert);
        };

        /**
         * @namespace DataService
         * @name getFoodItems
         * @desc Gets all the possible foodItems available in the database
         * @param {function} successCallback - Function to execute once the request has been performed successfully
         * @memberOf Services.DataService
         */
        this.getFoodItems = function (successCallback) {
            $http.get(baseURL + '/fooditems')
                .then(successCallback, this.errorAlert);
        };

        /**
         * @namespace DataService
         * @name updateRecipe
         * @desc Sets new information on an existing recipe
         * @param {string} id - Recipe id
         * @param {Object} recipe - Recipe's data to be updated
         * @param {function} successCallback  - Function to execute once the request has been performed successfully
         * @param {function} errorCallback    - Function to execute in case that the request encounters an error 
         * @memberOf Services.DataService
         */
        this.updateRecipe = function (id, recipe, successCallback, errorCallback) {
            $http.put(baseURL + '/recipes/' + id, recipe)
                .then(successCallback, errorCallback);
        };

        /**
         * @namespace DataService
         * @name addRecipe
         * @desc Creates a new recipe inside the database
         * @param {Object} recipe - New recipe's data
         * @param {function} successCallback  - Function to execute once the request has been performed successfully
         * @param {function} errorCallback    - Function to execute in case that the request encounters an error 
         * @memberOf Services.DataService
         */
        this.addRecipe = function (recipe, successCallback, errorCallback) {
            $http.post(baseURL + '/recipes/', recipe)
                .then(successCallback, errorCallback);
        };

        /**
         * @namespace DataService
         * @name deleteRecipe
         * @desc Deletes a recipe
         * @param {string} id - Recipe id
         * @memberOf Services.DataService
         */
        this.deleteRecipe = function (id) {
            $http.delete(baseURL + '/recipes/' + id);
        };

        /**
         * @namespace DataService
         * @name errorAlert
         * @desc Handles non-captured errors in the API requests
         * @param {Object} response    - Response object with the error information 
         * @memberOf Services.DataService
         */
        this.errorAlert = function (response) {
            alert("An error has occurred with an API request. Please refresh the page" + "\n" +
                "Status Code: " + response.status + "\n" +
                "Status Text: " + (response.text ||  "(message unavailable)"));
        };

    }

})();