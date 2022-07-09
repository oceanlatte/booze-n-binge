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

          // if (data.drinks[0].strIngredient15 === null) {
          //   data.drinks[0].strIngredient15 = " "}
          // if (data.drinks[0].strIngredient15 === null) {
          //   data.drinks[0].strIngredient15 = " "}
          for (let i = 1; i <= 15; i++) {
            ingredient = "strIngredient" + [i];
            console.log(ingredient);
            if (data.drinks[0].ingredient === null) {
              console.log((data.drinks[0].ingredient));
              data.drinks[0].ingredient = " "}
          }


          ingredients = (`${data.drinks[0].strIngredient1} \ ${data.drinks[0].strIngredient2} \ ${data.drinks[0].strIngredient3} \ ${data.drinks[0].strIngredient4} \ ${data.drinks[0].strIngredient5} \ ${data.drinks[0].strIngredient6} \ ${data.drinks[0].strIngredient7} \ ${data.drinks[0].strIngredient8} \ ${data.drinks[0].strIngredient9} \ ${data.drinks[0].strIngredient10} \ ${data.drinks[0].strIngredient11} \ ${data.drinks[0].strIngredient12} \ ${data.drinks[0].strIngredient13} \ ${data.drinks[0].strIngredient14} \ ${data.drinks[0].strIngredient15}`)


          // var ingrediants = data.drinks[0].strIngredient1 + data.drinks[0].strIngredient2 + ", " + data.drinks[0].strIngredient15;

          console.log("Ingredients listed are: " + ingredients);


          var instructions = "Instructions: " + data.drinks[0].strInstructions;
          console.log(instructions);
        })
      }// end if statment
    })
};

drinkChooser("whiskey");