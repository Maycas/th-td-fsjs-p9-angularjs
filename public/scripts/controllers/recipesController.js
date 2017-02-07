/**
 * Recipes Controller
 * @namespace Controllers
 * @author Marc Maycas
 */
(function () {
    'use strict';

    angular.module('app')
        .controller('RecipesController', recipesController);

    recipesController.$inject = ['dataService', 'utilities', '$location'];

    /**
     * @namespace RecipesController
     * @name recipesController
     * @desc Controller that sets up the business logic to manage recipes in recipes.html
     * @param {Object} dataService - Service that operates with the recipes API
     * @param {Object} utilities - Service with helper functions to initialize app elements
     * @param {Object} $location - Angular $location service
     * @memberOf Controllers
     */
    function recipesController(dataService, utilities, $location) {
        var vm = this;

        vm.recipes = []; // Array of all recipes in the database
        vm.categories = []; // Array with all the recipes categories available in the database
        vm.category = ""; // Selected category in the select module

        // Initialize all the data needed by the controller
        initializeController(dataService, utilities, vm);

        /**
         * @name searchRecipesByCategory
         * @desc Searches all the recipes under a specific category. If no category is selected it returns all the available recipes
         * @param {Object} category - Category object to search the recipes for.
         * @memberOf Controllers.RecipesController
         */
        vm.searchRecipesByCategory = function (category) {
            if (category) {
                dataService.getRecipesByCategory(
                    category.name,
                    function (response) {
                        vm.recipes = response.data;
                    });
            } else {
                utilities.initializeRecipes(dataService, vm);
            }
        };

        /**
         * @name editRecipe
         * @desc Changes the path of the application to the edit section for a specific recipe.
         * @param {Object} recipe - Selected Recipe object to edit
         * @memberOf Controllers.RecipesController
         */
        vm.editRecipe = function (recipe) {
            $location.path('/edit/' + recipe._id);
        };

        /**
         * @name deleteRecipe
         * @desc Deletes the specified recipe
         * @param {Object} recipe - Selected Recipe object to delete
         * @param {Integer} $index - Index of the element in the recipes object
         * @memberOf Controllers.RecipesController
         */
        vm.deleteRecipe = function (recipe, $index) {
            var confirmDeletion = confirm("Are you sure you want to delete '" + recipe.name + "'?");
            if (confirmDeletion) {
                dataService.deleteRecipe(recipe._id);
                vm.recipes.splice($index, 1);
            }
        };

        /**
         * @name addRecipe
         * @desc Changes the path of the application to the add section
         * @memberOf Controllers.RecipesController
         */
        vm.addRecipe = function () {
            $location.path('/add');
        };


        /**
         * @name initializeController
         * @desc Sets up the scope variables for the list of recipes and the list of categories
         * @memberOf Controllers.RecipesController
         */
        function initializeController() {
            utilities.initializeRecipes(dataService, vm);
            utilities.initializeCategories(dataService, vm);
        }

    }

})();