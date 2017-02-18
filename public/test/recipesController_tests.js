'use strict';

describe("Controllers: RecipesController", function () {

    beforeEach(module('app'));

    var recipesController,
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
        recipesController = $controller("RecipesController", {
            $scope: scope,
            $location: $location,
            dataService: dataService
        });

        // Set some mock data as recipes
        recipesController.recipes = [{
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
            },
            {
                "name": "Stone Soup",
                "description": "This is the recipe for when you are camping and have nothing but rocks.",
                "category": "Soup",
                "prepTime": 20,
                "cookTime": 145,
                "ingredients": [{
                    "foodItem": "Stones",
                    "condition": "Cleaned",
                    "amount": "Few dozen"
                }, {
                    "foodItem": "Water",
                    "condition": "",
                    "amount": "3 cups"
                }, {
                    "foodItem": "Salt",
                    "condition": "",
                    "amount": "to taste"
                }],
                "steps": [{
                    "description": "Add rocks and water to pot and simmer for 2 hours."
                }, {
                    "description": "Add salt to taste."
                }],
                "_id": "61fkZKBsqAqjVbn1"
            }
        ];
    }));

    // Test suite on deleteRecipe
    describe("deleteRecipe", function () {

        it("should reduce the number of recipes by 1 if the user confirms", function () {
            // Spy on the confirm dialog to simulate a fake confirmation
            spyOn(window, 'confirm').and.callFake(function () {
                return true;
            });

            expect(recipesController.recipes.length).toEqual(2);
            recipesController.deleteRecipe(recipesController.recipes[0], 0);
            expect(recipesController.recipes.length).toEqual(1);
        });

        it("should not reduce the number of recipes if the user ancels the deletion", function () {
            // Spy on the confirm dialog to simulate a fake confirmation
            spyOn(window, 'confirm').and.callFake(function () {
                return false;
            });

            expect(recipesController.recipes.length).toEqual(2);
            recipesController.deleteRecipe(recipesController.recipes[1], 1);
            expect(recipesController.recipes.length).toEqual(2);
        });

        it("should remove the selected recipe", function () {
            var recipe = recipesController.recipes[0];

            // Spy on the confirm dialog to simulate a fake confirmation
            spyOn(window, 'confirm').and.callFake(function () {
                return true;
            });

            recipesController.deleteRecipe(recipe, 0);
            expect(recipesController.recipes[0]).not.toEqual(recipe);
        });

    });

    // Test suite on addRecipe
    describe("addRecipe", function () {

        it("should direct the user to the add recipe page", function () {
            $location.path('/');
            expect($location.path()).toBe('/');
            recipesController.addRecipe();
            expect($location.path()).toBe('/add');
        });
    });

    // Test suite on editRecipe
    describe("editRecipe", function () {

        it("should direct the user to the edit recipe page", function () {
            var recipe = recipesController.recipes[0];

            $location.path('/');
            expect($location.path()).toBe('/');
            recipesController.editRecipe(recipe);
            expect($location.path()).toBe('/edit/' + recipe._id);

        });

    });

});