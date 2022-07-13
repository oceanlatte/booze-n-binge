var movieTitle = document.querySelector(".input").textContent;
var searchEl = document.querySelector("#movie-search");
var movieInfoEl = $(".movie-info");
var storagePairs = [];
var currentPairArr = [];

// host and key in one variable 
var keyAndHost = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "5259f56577mshcc2e50fa11e554dp1d2517jsn803a2737221e",
    "X-RapidAPI-Host": "unogs-unogs-v1.p.rapidapi.com"
  }
};

//Getting the movie from the API
function chooseMovie(movieTitle) {
  var movieSearch = "https://unogs-unogs-v1.p.rapidapi.com/search/titles?limit=10&order_by=rating&country_list=78&title=" + movieTitle + "&type=movie&audio=english";
  
  fetch(movieSearch, keyAndHost)
    .then(function (response) {
      if (response.ok) {
        response.json()
        .then(function (movieData) {
          displayMovie(movieTitle, movieData);
        }) 
      } 
  });
};

// find correct movie index to bring up correct poster
function displayMovie(movieTitle, movieData) {
  var movieInfoEl = $(".movie-info");
  //error message for invalid movie title
  if (movieData.results === null || !movieData) {
    var errorMsg = document.createElement("p");
    errorMsg.className = "help is-danger";
    errorMsg.textContent = "Title not available on Netflix";
    movieInfoEl.append(errorMsg);
  };

  for (var i = 0; i < movieData.results.length; i++) {
    var findMovie = movieData.results[i].title;
    if (findMovie.toLowerCase() == movieTitle.toLowerCase()) {
      //display searched title
      var displayTitle = $("<h3>")
        .addClass("is-size-5")
        .text(movieTitle + " is available!")
      ;
      movieInfoEl.append(displayTitle);
      // display correct poster
      var posterContainer = $("<div>")
      .addClass("is-flex is-justify-content-center");
      var displayPoster = $("<img>")
      .attr("src", movieData.results[i].poster)
      .addClass("is-centered");
      posterContainer.append(displayPoster);
      movieInfoEl.append(posterContainer);
      // find correct movie and send netflix ID to genre function
      var findMovieId = movieData.results[i].netflix_id;
      match(findMovieId);
      currentPairArr.push(movieTitle);
    };
  };
};

//match to alcohol
function match(genreId) {
  if (genreId === 783 || genreId === 4370) { // children and family or sports 
    drinkChooser("beer")
  }
  else if (genreId === 8883) {//romance
    drinkChooser("champagne")
  }
  else if (genreId === 1365) { //action and advenure
    drinkChooser("whiskey")
  }
  else if (genreId === 7424) {//anime
    drinkChooser("amaretto")
  }
  else if (genreId === 31574) {//classics
    drinkChooser("scotch")
  }
  else if (genreId === 6548) {//comedies
    drinkChooser("brandy")
  }
  else if (genreId === 5763) {// dramas
    drinkChooser("wine")
  }
  else if (genreId === 8711 || genreId === 8933) {//horrors or thrillers
    drinkChooser("tequila")
  }
  else if (genreId === 1701) {//music
    drinkChooser("vodka")
  }
  else if (genreId === 1492) {//Sci-fi and Fantasy
    drinkChooser("gin")
  }
  else {
    drinkChooser("sweet vermouth")
  }
};

// once they choose a movie genre then the cocktail functions will be ran
function drinkChooser(drink) {
  var drinkByName = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=" + drink;
  fetch(drinkByName)
    .then(function (response) {
      if (response.ok) {
        response.json()
          .then(function (drinkData) {
            // use get a random index for which drink to choose
            var randomizer = Math.floor(Math.random() * drinkData.drinks.length);
            // get drink name and drink ID #
            var drinkName = drinkData.drinks[randomizer].strDrink;
            var drinkId = drinkData.drinks[randomizer].idDrink;
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
    .then(function (response) {
      if (response.ok) {
        response.json()
          .then(function (data) {
            var chosenDrink = data.drinks[0].strDrink;
            var drinkImage = data.drinks[0].strDrinkThumb;
            let ingredientarray = new Array(data.drinks[0].strIngredient1, data.drinks[0].strIngredient2, data.drinks[0].strIngredient3, data.drinks[0].strIngredient4, data.drinks[0].strIngredient5, data.drinks[0].strIngredient6, data.drinks[0].strIngredient7, data.drinks[0].strIngredient8, data.drinks[0].strIngredient9, data.drinks[0].strIngredient10, data.drinks[0].strIngredient11, data.drinks[0].strIngredient12, data.drinks[0].strIngredient13, data.drinks[0].strIngredient14, data.drinks[0].strIngredient15)
            //results will give only valid ingredients
            let results = []
            ingredientarray.forEach(element => {
              if (element !== null || element == "") {
                results.push(element)
              }
            });
            var instructions = data.drinks[0].strInstructions;
            drinkDisplayer(chosenDrink, drinkImage, results, instructions);
            currentPairArr.push(chosenDrink);
            saveStorage();
          })
      };
    });
};

// display cocktal information to page
function drinkDisplayer(drink, image, ingredients, instructions) {
  var displayDrink = $(".drink-container");
  //Name
  var displayTitle = $("<h3>")
    .addClass("is-size-5")
    .text(drink);
  //Image
  var displayImage = $("<img>")
    .attr("src", image);
  //Ingredients
  var ingredientsHeader = $("<h4>")
    .text("Ingredients:");
  var ingredientsContainer = $("<ul>");
  for (var i = 0; i < ingredients.length; i++) {
    var displayingredients = $("<li>").text(ingredients[i]);
    ingredientsContainer.append(displayingredients);
  }
  //Instructions
  var instructionsHeader = $("<h4>")
    .addClass("mt-2")
    .text("Instructions: ");
  var displayInstructions = $("<p>")
    .text(instructions);
  //Adding cocktail information to card
  displayDrink.append(displayTitle, displayImage, ingredientsHeader, ingredientsContainer, instructionsHeader, displayInstructions);
}

// Button click for submit movie search
$(".button").click(function (event) {
  event.preventDefault();
  
  var hiddenEl = document.querySelector("#hidden");
  hiddenEl.setAttribute("style", "visibility: visible");

  $(".movie-info").empty();
  $(".drink-container").empty();
  
  movieTitle = $(this).siblings(".input").val().trim();
  chooseMovie(movieTitle);

  displayStorage();
});

function saveStorage() {
  // format data to new array for localStorage
  storagePairs.push({
    movie: currentPairArr[0],
    drink: currentPairArr[1]
  });

  // save formatted data to localStorage
  localStorage.setItem("previousPairing", JSON.stringify(storagePairs));
}

//Getting and Displaying Previous Drink and Movie Pairings from Local Storage
function displayStorage() {
  var savedPairArr = JSON.parse(localStorage.getItem("previousPairing"));
  // display to Previous Pairings
  if (savedPairArr === null ) {
    return;
  }
  else {
    for (var i = 0; i < savedPairArr.length; i++)
    var displayPair = $("<li>")
    .text(savedPairArr[i].movie + " & " + savedPairArr[i].drink);
    $("#storage-container").append(displayPair);
  }
};

// found while researching. used to use "enter" key as well as search button 
// var inputEnter = document.getElementById("input");
// inputEnter.addEventListener("keypress", function(event) {
//   if (event.key === "Enter") {
//     event.preventDefault();
//     document.getElementById("submit").click();
//   }
// }); new
