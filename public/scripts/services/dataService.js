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
        this.getRecipesFromCategory = function (category, successCallback) {
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
         * @param {any} recipeData
         * @param {any} successCallback
         */
        this.updateRecipe = function (id, recipeData, successCallback) {
            $http.put(baseURL + '/recipes/' + id, recipeData)
                .then(successCallback, this.errorAlert);
        };

        /**
         * 
         * 
         * @param {any} recipeData
         * @param {any} successCallback
         */
        this.addRecipe = function (recipeData, successCallback) {
            $http.post(baseURL + '/recipes', recipeData)
                .then(successCallback, this.errorAlert);
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