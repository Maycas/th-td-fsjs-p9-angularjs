'use strict';

describe("Controllers: RecipeDetailController", function () {

    beforeEach(module('app'));

    var recipeDetailController,
        dataService,
        $location,
        scope;

    beforeEach(inject(function ($rootScope, $controller, _$location_, _dataService_) {
        // Define the scope for the tests
        scope = $rootScope.$new();

        // Define services needed
        dataService = _dataService_;
        $location = _$location_;

        // Define the controller
        recipeDetailController = $controller("RecipeDetailController", {
            $scope: scope,
            $location: $location,
            dataService: dataService
        });

        // Set some mock data as a recipe
        recipeDetailController.recipe = {
            "name": "Grilled Cheese Sandwich",
            "description": "Quick to prepare and delicious chees sandwiches.",
            "category": "Appetizer/Snack",
            "prepTime": 10,
            "cookTime": 7,
            "ingredients": [{
                "foodItem": "Cheese",
                "condition": "American, Swiss or your choice",
                "amount": "2 slices per sandwich"
            }],
            "steps": [{
                "description": "Melt butter in gtill pan over medium heat until bubbling."
            }, {
                "description": "Place one slice of bread in butter."
            }, {
                "description": "Add cheese and last slice of bread."
            }, {
                "description": "Grill for 4 minutes."
            }],
            "_id": "12PbSq6jL6wgFSlJ"
        };

    }));

    // Test suite on updateRecipe
    describe("updateRecipe", function () {

        it("should update the name of a recipe", function () {
            recipeDetailController.recipe.name = "Fish and Chips";
            recipeDetailController.updateRecipe(recipeDetailController.recipe);

            // After updating the recipe and querying it again, it should return the recipe with the title changed
            dataService.getRecipe(recipeDetailController.recipe._id, function (response) {
                recipeDetailController.recipe = response.data;
                expect(recipeDetailController.recipe.name).toBe("Fish and Chips");
            });
        });

    });

    // Test suite on addIngredient
    describe("addIngredient", function () {

        it("should add a new ingredient in the list", function () {
            expect(recipeDetailController.recipe.ingredients.length).toBe(1);
            recipeDetailController.addIngredient(recipeDetailController.recipe);
            expect(recipeDetailController.recipe.ingredients.length).toBe(2);
        });

    });

});