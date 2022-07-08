// Comedy
// Animation
// Drama
// Action 
// Thriller
// Romance
// Sci-fi

// Vodka, Tequila, Whiskey, Brandy, Gin, Amaretto, Champagne
// COCKTAIL BY NAME: www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita
// SEARCH BY INGREDIANT: www.thecocktaildb.com/api/json/v1/1/filter.php?i=Gin

// INGREDIANT ID: www.thecocktaildb.com/api/json/v1/1/lookup.php?iid=552
// RANDOM COCKTAIL: www.thecocktaildb.com/api/json/v1/1/random.php
// CATEGORY, ORDINARY DRINK: www.thecocktaildb.com/api/json/v1/1/filter.php?c=Ordinary_Drink

// once they choose a movie then the cocktail functions will be ran
function drinkChooser(drink) {
  var drinkByName = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=" + drink;
  console.log(drinkByName);
  fetch(drinkByName)
    .then(function(response){
      if(response.ok) {
        response.json()
        .then(function(drinkData){
          console.log(drinkData, "drink data fetched");

          // use randomized instead of for loop and where the [i] is for only one random drink
          var randomizer = Math.floor(Math.random() * drinkData.drinks.length);

          // get drink name and drink ID #, drink name will need to be displayed
          var drinkName = drinkData.drinks[randomizer].strDrink;
          var drinkId = drinkData.drinks[randomizer].idDrink;
          console.log(drinkName, drinkId);

          // drinkId to pass through drink information function
          drinkInfo(drinkId);
        }) 
      }// end if statment
  });
}

// use drinkId from drinkChooser function to get that specific drink's information
function drinkInfo(drinkId) {
  var drinkById = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + drinkId;

  fetch(drinkById)
    .then(function(response){
      if(response.ok) {
        response.json()
        .then(function(data){
          console.log(data);
        })
      }// end if statment
    })
};

drinkChooser("tequila");