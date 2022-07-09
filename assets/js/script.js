// Comedy
// Animation
// Drama
// Action 
// Thriller
// Romance
// Sci-fi

// Options: Vodka, Tequila, Whiskey, Brandy, Gin, Amaretto, Champagne
// COCKTAIL BY NAME: www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita
// SEARCH BY INGREDIANT: www.thecocktaildb.com/api/json/v1/1/filter.php?i=Gin
// INGREDIANT ID: www.thecocktaildb.com/api/json/v1/1/lookup.php?iid=552

// once they choose a movie (or alcohol type from a dropdown would work) then the cocktail functions will be ran
function drinkChooser(drink) {
  var drinkByName = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=" + drink;
  console.log(drinkByName);
  fetch(drinkByName)
    .then(function(response){
      if(response.ok) {
        response.json()
        .then(function(drinkData){
          console.log(drinkData, "all drink options for " + drink + " fetched");

          // use get a random index for which drink to choose
          var randomizer = Math.floor(Math.random() * drinkData.drinks.length);

          // get drink name and drink ID #
          // !!!!! drink name will need to be displayed dynamically on page !!!!!
          var drinkName = drinkData.drinks[randomizer].strDrink;
          var drinkId = drinkData.drinks[randomizer].idDrink;
          console.log("drink chosen by randomizer:", drinkName, "#" + drinkId);

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
          console.log("drink information: ", data);

          // image can be dynamically created
          // image will need a container within the card div
          var drinkImage = data.drinks[0].strDrinkThumb;
          console.log(drinkImage);

          // need to loop through ingrediants
          var ingrediants = data.drinks[0].strIngredient1;
          console.log("first ingrediant listed is: " + ingrediants);

          var instructions = "Instructions: " + data.drinks[0].strInstructions;
          console.log(instructions);
        })
      }// end if statment
    })
};

drinkChooser("whiskey");


// movie and genre from api

// https://unogs-unogs-v1.p.rapidapi.com/title/countries 
// https://unogs-unogs-v1.p.rapidapi.com/title/details 
// https://unogs-unogs-v1.p.rapidapi.com/static/genres 
// 'X-RapidAPI-Key': '5259f56577mshcc2e50fa11e554dp1d2517jsn803a2737221e', 
// 'X-RapidAPI-Host': 'unogs-unogs-v1.p.rapidapi.com' 
// https://unogs-unogs-v1.p.rapidapi.com/title/genres 
var apiKey = "5259f56577mshcc2e50fa11e554dp1d2517jsn803a2737221e"


// chooseGenre(genre) 
 