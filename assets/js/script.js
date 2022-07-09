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
// random movie that matches genre static genre apiurl 




// Thriller
// Romance


//  countries apiurl 
// 37:
// country: "United States"
// countrycode: "US"
// expiring: 70
// id: 78
// nl7: 59
// tmovs: 3784
// tseries: 2127
// tvids: 5911

// chooseGenre(genre) 
//  fetch()
// https://unogs-unogs-v1.p.rapidapi.com/title/genres?netflix_id=70143836 to get genre by netflix id




// var genreAction = '801362'
// var genreAnimation = '4698'
// var genreDrama = '5763'
// var genreScifi = '10853'
// var movieComedies = '6548'





// fetch('https://unogs-unogs-v1.p.rapidapi.com/search/titles?limit=10&order_by=rating&country_list=78&title=' + movieTitle + '&type=movie&audio=english', keyAndHost)
// // https://unogs-unogs-v1.p.rapidapi.com/search/titles?limit=10&order_by=rating&country_list=78&title=seven&type=movie&audio=english  

// 	.then(response => response.json())
// 	.then(response => console.log(response))
// 	.catch(err => console.error(err));

 



// fetch("https://unogs-unogs-v1.p.rapidapi.com/search/titles?limit=10&order_by=rating&country_list=78&title="+ movieTitle +"&type=movie&audio=english", keyAndHost)
// 	.then(response => response.json())
// 	.then(response => console.log(response))
// 	.catch(err => console.error(err));


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
  
               var movieImage = movieData.results[0].img;
               console.log(movieImage);
               var movieId = movieData.results[0].netflix_id;
               console.log("movie id: ",movieId)
           
            movieGenre(movieId)
          }) 
        }
    });
  }
  chooseMovie("hancock")

  function movieGenre(movieId){
    var GenreSearch ="https://unogs-unogs-v1.p.rapidapi.com/title/genres?netflix_id=" + movieId; 
    console.log(genreSearch)
    fetch(genreSearch, keyAndHost)
    .then(function(response){
      if(response.ok) {
        response.json()
        .then(function(genreData){
          console.log("this is the movie data: ", genreData);

            //  var movieImage = genreData.results[0].img;
            //  console.log(movieImage);
            //  var movieId = genreData.results[0].netflix_id;
            //  console.log("movie genre: ", movieId)
        }) 
      }
  });
  }