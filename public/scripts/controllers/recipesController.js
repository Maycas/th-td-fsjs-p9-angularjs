/**
 * Recipes Controller
 * @namespace Controllers
 * @author Marc Maycas
 */
(function () {
    'use strict';

    angular.module('app')
        .controller('RecipesController', recipesController);

    recipesController.$inject = ['dataService', '$location'];

    /**
     * @namespace RecipesController
     * @desc Controller that sets up the business logic to manage recipes in recipes.html
     * @memberOf Controllers
     */
    function recipesController(dataService, $location) {
        var vm = this;

        vm.recipes = [];
        vm.categories = [];
        vm.category = "";
        vm.recipe = {};


        // Direct calls to dataService to obtain the required data objects 
        dataService.getCategories(
            function (response) {
                vm.categories = response.data;
            });

        dataService.getAllRecipes(
            function (response) {
                vm.recipes = response.data;
            });

        vm.searchRecipesByCategory = function (category) {
            if (category) {
                dataService.getRecipesFromCategory(
                    category.name,
                    function (response) {
                        vm.recipes = response.data;
                    });
            } else {
                dataService.getAllRecipes(
                    function (response) {
                        vm.recipes = response.data;
                    });
            }
        };

        vm.editRecipe = function (recipe) {
            $location.path('/edit/' + recipe._id);
        };

        vm.deleteRecipe = function (recipe, $index) {
            var confirmDeletion = confirm("Are you sure you want to delete '" + recipe.name + "'?");
            if (confirmDeletion) {
                dataService.deleteRecipe(recipe._id);
                vm.recipes.splice($index, 1);
            }
        };

        vm.addRecipe = function () {
            $location.path('/add');
        };
    }
})();