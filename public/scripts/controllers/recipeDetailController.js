/**
 * RecipeDetailController
 * @namespace Controllers
 * @author Marc Maycas
 */
(function () {
    'use strict';

    angular.module('app')
        .controller('RecipeDetailController', recipeDetailController);

    recipeDetailController.$inject = ['dataService', 'utilities', '$routeParams', '$location'];

    /**
     * @namespace RecipeDetailController
     * @name recipeDetailController
     * @desc Controller that sets up the business logic to manage (add / edit) recipes
     * @param {Object} dataService - Service that operates with the recipes API
     * @param {Object} utilities - Service with helper functions to initialize app elements
     * @param {Object} $routeParams - Angular $routeParams service
     * @param {Object} $location - Angular $location service
     * @memberOf Controllers
     */
    function recipeDetailController(dataService, utilities, $routeParams, $location) {
        var vm = this;

        vm.recipe = {
            name: "",
            description: "",
            category: "",
            prepTime: "",
            cookTime: "",
            ingredients: [{
                foodItem: "",
                condition: "",
                amount: ""
            }],
            steps: [{
                description: ""
            }]
        };
        vm.foodItems = []; // Array with all the available of food items
        vm.categories = []; // Array with all the recipe categories
        vm.editMode = false; // Boolean to define if a new recipe is being added (false) or an existing one being edited (true)
        vm.hasErrors = false; // Boolean that defines if there has been an error when adding or updating a recipe
        vm.validationErrors = {}; // Object with all the errors that may have occurred when adding or updating a recipe

        // Initialize all the data needed by the controller
        initializeController(dataService, utilities, vm);

        /**
         * @name saveRecipe
         * @desc Saves or updates a recipe depending on if the user is editing a recipe or adding a new one
         * @param {Object} recipe   - Recipe object to be saved
         * @memberOf Controllers.RecipeDetailController
         */
        vm.saveRecipe = function (recipe) {
            if (vm.editMode) {
                vm.updateRecipe(recipe);
            } else {
                vm.addNewRecipe(recipe);
            }
        };

        /**
         * 
         */
        vm.updateRecipe = function (recipe) {
            console.log(JSON.stringify(recipe));
            dataService.updateRecipe(
                recipe._id,
                recipe,
                function (response) {
                    console.log(response);
                    vm.hasErrors = false;
                    vm.recipe = response.data.errors;
                    vm.goBack();
                },
                function (errors) {
                    console.log(errors);
                    vm.hasErrors = true;
                    vm.validationErrors = errors.data.errors;
                }
            );
        };

        /**
         * 
         */
        vm.addNewRecipe = function (recipe) {
            dataService.addRecipe(
                recipe,
                function (response) {
                    vm.hasErrors = false;
                    vm.recipe = response.data;
                    vm.goBack();
                },
                function (errors) {
                    vm.hasErrors = true;
                    vm.validationErrors = errors.data.errors;
                }
            );
        };

        /**
         * @name addIngredient
         * @desc Adds a new ingredient in the recipe
         * @param {Object} recipe   - Recipe object to be saved
         * @memberOf Controllers.RecipeDetailController
         */
        vm.addIngredient = function (recipe) {
            var newIngredient = {
                foodItem: "",
                condition: "",
                amount: ""
            };
            recipe.ingredients.push(newIngredient);
        };

        /**
         * @name deleteIngredient
         * @desc Deletes an ingredient in the recipe
         * @param {Object} recipe   - Recipe object to be saved
         * @param {Integer} $index  - Index of the element in the ingredient list
         * @memberOf Controllers.RecipeDetailController
         */
        vm.deleteIngredient = function (recipe, $index) {
            recipe.ingredients.splice($index, 1);
        };

        /**
         * @name addStep
         * @desc Adds a new step in the recipe
         * @param {Object} recipe   - Recipe object to be saved
         * @memberOf Controllers.RecipeDetailController
         */
        vm.addStep = function (recipe) {
            var newStep = {
                description: ""
            };
            recipe.steps.push(newStep);
        };

        /**
         * @name deleteStep
         * @desc Deletes a step in the recipe
         * @param {Object} recipe   - Recipe object to be saved
         * @param {Integer} $index  - Index of the element in the steps list
         * @memberOf Controllers.RecipeDetailController
         */
        vm.deleteStep = function (recipe, $index) {
            recipe.steps.splice($index, 1);
        };

        /**
         * @name goBack
         * @desc Returns to the previous page, cancelling the add/edit operation
         * @memberOf Controllers.RecipeDetailController
         */
        vm.goBack = function () {
            window.history.back();
        };

        /**
         * @name setMode
         * @desc Sets the 'add' or 'edit' mode of the app. In case the edit mode has been set, it gets the necessary recipe data
         * @memberOf Controllers.RecipeDetailController
         */
        function setMode() {
            if ($routeParams.id) {
                // If there's an id in the route, then the 'edit' mode has been set
                vm.editMode = true;
                // Get the selected recipe data to bind it with the html data models
                dataService.getRecipe(
                    $routeParams.id,
                    function (response) {
                        vm.recipe = response.data;
                    });
            } else {
                // If no id exists, then a new recipe needs to be added
                vm.editMode = false;
            }
        };

        /**
         * @name initializeController
         * @desc Sets up the scope variables for the list of recipes and the list of categories. It also sets the mode.
         * @memberOf Controllers.RecipeDetailController
         */
        function initializeController() {
            utilities.initializeCategories(dataService, vm);
            utilities.initializeFoodItems(dataService, vm);
            setMode();
        }

    }

})();