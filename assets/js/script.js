var movieTitle = document.querySelector(".input").textContent;
var searchEl = document.querySelector("#movie-search");

// host and key in one varialble 
var keyAndHost = {
	method: "GET",
	headers: {
		"X-RapidAPI-Key": "5259f56577mshcc2e50fa11e554dp1d2517jsn803a2737221e",
		"X-RapidAPI-Host": "unogs-unogs-v1.p.rapidapi.com"
	}
};

function chooseMovie(movieTitle) {
  var movieSearch = "https://unogs-unogs-v1.p.rapidapi.com/search/titles?limit=10&order_by=rating&country_list=78&title="+ movieTitle +"&type=movie&audio=english"; 
  console.log(movieSearch);
  fetch(movieSearch, keyAndHost)
    .then(function(response){
      if(response.ok) {
        response.json()
        .then(function(movieData){
          console.log("this is the movie data: ", movieData);
          //  capture image and netflix id data 
          var movieImage = movieData.results[0].img;
          console.log(movieImage);
          var movieId = movieData.results[0].netflix_id;
          console.log("movie id: ",movieId)
          
          movieGenre(movieId);
          localStorage.setItem("savedMovie", movieTitle);
          displayDrink(movieTitle);

          if (movieTitle === movieData.results.title) {
            chooseMovie(movieTitle);
            movieTitle = "";
          }
          else {
        
            var errorMsg = document.createElement("p");
        
            console.log(errorMsg);
        
            errorMsg.className = "help";
        
            errorMsg.textContent = "Title not available on Netflix";
        
            (searchEl).append.errorMsg;
          };
        }) 
      }
  });
};

// use movieId to get genreID
function movieGenre(movieId){
  var genreSearch ="https://unogs-unogs-v1.p.rapidapi.com/title/genres?netflix_id=" + movieId; 
  console.log(genreSearch)
  fetch(genreSearch, keyAndHost)
  .then(function(response){
    if(response.ok) {
      response.json()
      .then(function(genreData){
        console.log("this is the genre data: ", genreData);
        // genre name or genre id .genre or .genre_id      just the first genre listed [0]
        genreId = genreData.results[0].genre_id;
        console.log(genreId);
        match(genreId);
      }) 
    }
  });
};

//match to alcohol
function match(genreId) {
  if (genreId === 783 || genreId === 4370) { // children and family or sports 
    drinkChooser("beer") }
  else if (genreId === 8883) {//romance
    drinkChooser("champagne") }
  else if (genreId === 1365) { //action and advenure
    drinkChooser("whiskey") }
  else if (genreId === 7424) {//anime
    drinkChooser("amaretto") }
  else if (genreId === 31574) {//classics
    drinkChooser("scotch") }
  else if (genreId === 6548) {//comedies
    drinkChooser("brandy") }
  else if (genreId === 5763) {// dramas
    drinkChooser("wine") }
  else if (genreId === 8711 || genreId === 8933) {//horrors or thrillers
    drinkChooser("tequila") }
  else if (genreId === 1701) {//music
    drinkChooser("vodka") }
  else if (genreId === 1492) {//Sci-fi and Fantasy
    drinkChooser("gin") }              
  else {
    drinkChooser("sweet vermouth") }  
};

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

          localStorage.setItem("savedTitle", chosenDrink);
          displayDrink(chosenDrink);
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
    .text("Ingredients:");

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

// Button click for submit movie search
$(".button").click(function (event) {

  event.preventDefault();

  movieTitle = $(this).siblings(".input").val().trim();
  console.log(movieTitle);

 

});

//display saved
function displayDrink(savedDrink) {
  var savedDrink = localStorage.getItem("savedTitle");
  var savedMovie = localStorage.getItem("savedMovie")
  var pair = savedMovie + " & " + savedDrink
  console.log(pair); 
  $(".column ul").append("<li>" +  pair + "</li>");
}

