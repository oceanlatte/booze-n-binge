// Comedy
// Animation
// Drama
// Action 
// Thriller
// Romance
// Sci-fi

// Options: Vodka, Tequila, Whiskey, Brandy, Gin, Amaretto, Champagne
// once they choose a movie genre then the cocktail functions will be ran
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

          var chosenDrink = data.drinks[0].strDrink; 
          var drinkImage = data.drinks[0].strDrinkThumb;
          let ingredientarray = new Array(data.drinks[0].strIngredient1, data.drinks[0].strIngredient2, data.drinks[0].strIngredient3, data.drinks[0].strIngredient4, data.drinks[0].strIngredient5, data.drinks[0].strIngredient6, data.drinks[0].strIngredient7, data.drinks[0].strIngredient8, data.drinks[0].strIngredient9, data.drinks[0].strIngredient10, data.drinks[0].strIngredient11, data.drinks[0].strIngredient12, data.drinks[0].strIngredient13, data.drinks[0].strIngredient14,data.drinks[0].strIngredient15)

          //results will give only valid ingredients
          let results = []
          ingredientarray.forEach(element => {
            if (element !== null || element == "") {
              results.push(element)
            }
          })

          var instructions = data.drinks[0].strInstructions;

          drinkDisplayer(chosenDrink, drinkImage, results, instructions); 
        })
      }// end if statment
    });
  };

// display cocktal information to page
function drinkDisplayer(drink, image, ingredients, instructions) { 
  var displayDrink = $(".drink-container");

  var displayTitle = $("<h3>")
    .addClass("is-size-5") 
    .text(drink);

  var displayImage = $("<img>")
    .attr("src", image);
  
  var ingredientsHeader = $("<h4>")
    .text("ingredients:");

  var ingredientsContainer = $("<ul>");

  for (var i = 0; i < ingredients.length; i++) {
    var displayingredients = $("<li>").text(ingredients[i]);
    ingredientsContainer.append(displayingredients);
  }
  
  var instructionsHeader = $("<h4>")
    .addClass("mt-2")
    .text("Instructions: ");

  var displayInstructions = $("<p>")
    .text(instructions);

  displayDrink.append(displayTitle, displayImage, ingredientsHeader, ingredientsContainer, instructionsHeader, displayInstructions);
}


drinkChooser("gin");