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

          // image can be dynamically created
          // image will need a container within the card div
          var drinkImage = data.drinks[0].strDrinkThumb;

          // need to loop through ingrediants
          var ingrediants = data.drinks[0].strIngredient1;
          console.log("first ingrediant listed is: " + ingrediants);

          var instructions = "Instructions: " + data.drinks[0].strInstructions;

          drinkDisplayer(chosenDrink, drinkImage, instructions); // need to add ingrediants
        })
      }// end if statment
    })
};

// display cocktal information to page
function drinkDisplayer(drink, image, instructions) { // may need to add ingrediants?
  var displayDrink = $(".drink-container");

  var displayTitle = $("<h3>")
    //.addClass() add Bulma styling class to h3 for: bigger text, bold, padding
    .text(drink);

  var displayImage = $("<img>")
    .attr("src", image);
  
  var ingrediantsHeader = $("<h4>")
    //.addClass() add possible Bulma styling 
    .text("Ingrediants:");
  
  var displayInstructions = $("<p>")
    //.addClass() add Bulma styling to add: padding and overflow scroll bar
    .text(instructions);

  displayDrink.append(displayTitle, displayImage, ingrediantsHeader, displayInstructions);

}
drinkChooser("gin");