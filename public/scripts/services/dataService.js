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
         *  
         * 
         * @param {any} successCallback
         * @param {any} errorCallback
         */
        this.getAllRecipes = function (successCallback) {
            $http.get(baseURL + '/recipes')
                .then(successCallback, this.errorAlert);
        };

        /**
         * 
         * 
         * @param {any} category
         * @param {any} successCallback
         */
        this.getRecipesByCategory = function (category, successCallback) {
            $http.get(baseURL + '/recipes?category=' + category)
                .then(successCallback, this.errorAlert);
        };

        /**
         * 
         * 
         * @param {any} id
         * @param {any} successCallback
         */
        this.getRecipe = function (id, successCallback) {
            $http.get(baseURL + '/recipes/' + id)
                .then(successCallback, this.errorAlert);
        };

        /**
         * 
         * 
         * @param {any} successCallback
         */
        this.getCategories = function (successCallback) {
            $http.get(baseURL + '/categories')
                .then(successCallback, this.errorAlert);
        };

        /**
         * 
         * 
         * @param {any} successCallback
         */
        this.getFoodItems = function (successCallback) {
            $http.get(baseURL + '/fooditems')
                .then(successCallback, this.errorAlert);
        };

        /**
         * 
         * 
         * @param {any} id
         * @param {any} recipe
         * @param {any} successCallback
         * @param {any} errorCallback
         */
        this.updateRecipe = function (id, recipe, successCallback, errorCallback) {
            console.log(recipe);
            $http.put(baseURL + '/recipes/' + id, recipe)
                .then(successCallback, errorCallback);
        };

        /**
         * 
         * 
         * @param {any} recipe
         * @param {any} successCallback
         */
        this.addRecipe = function (recipe, successCallback, errorCallback) {
            console.log(recipe);
            $http.post(baseURL + '/recipes/', recipe)
                .then(successCallback, errorCallback);
        };

        /**
         * 
         * 
         * @param {any} id
         */
        this.deleteRecipe = function (id) {
            $http.delete(baseURL + '/recipes/' + id);
        };

        /**
         * 
         * 
         */
        this.errorAlert = function (response) {
            alert("An error has occurred with an API request. Please refresh the page" + "\n" +
                "Status Code: " + response.status + "\n" +
                "Status Text: " + (response.text ||  "(message unavailable)"));
        };

    }

})();