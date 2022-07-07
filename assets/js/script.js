// Comedy
// Animation
// Drama
// Action 
// Thriller
// Romance
// Sci-fi

// Vodka, Tequila, Whiskey, Brandy, Gin, Amaretto, Champagne
// COCKTAIL BY NAME: www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita
// INGREDIANT ID: www.thecocktaildb.com/api/json/v1/1/lookup.php?iid=552
// RANDOM COCKTAIL: www.thecocktaildb.com/api/json/v1/1/random.php
// SEARCH BY INGREDIANT: www.thecocktaildb.com/api/json/v1/1/filter.php?i=Gin
// CATEGORY, ORDINARY DRINK: www.thecocktaildb.com/api/json/v1/1/filter.php?c=Ordinary_Drink

// once they choose a movie then the cocktail functions will be ran
function getDrink(drink) {
  var drinkByName = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=" + drink;
  console.log(drinkByName);
  fetch(drinkByName)
    .then(function(response){
      if(response.ok) {
        response.json()
        .then(function(drinkData){
          console.log(drinkData, "drink data fetched");
        }) 
      }// end if statment
  });
}

getDrink("tequila");