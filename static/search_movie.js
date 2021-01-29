//Olga Krupa
const movieContainerSearch = document.getElementById('movie-ctr');


function getSearchMovie(search){
    valueSearch = String();
    for (const value of search) {
        if(value != ' '){
            valueSearch = valueSearch + value;
        }
        else{
            valueSearch = valueSearch + '+' ;
        }
    };

    return valueSearch;
}


function getGenresInMovie(movie, genres){
    movieGenres = String();
    var str = " ";
    mGenres = Array();
    mGenres = movie.genre_ids
    mGenres.forEach(genre => {

        genres.forEach(gen=> {
        var g = gen.id;
            if (genre == g){
                movieGenres= movieGenres + str + gen.name;
            };
        });
        
    }
    );
    return movieGenres
}

function clearDiv(){
    while (movieContainerSearch.firstChild) {
        movieContainerSearch.removeChild(movieContainerSearch.firstChild);
      }
}

async function loadSearch(searchInput) {
    movies = Array();
    genres = Array();
    clearDiv();
    const inputValue = searchInput;
    if (inputValue == ''){
        return
    }
    
    var search = getSearchMovie(inputValue.value);


    $.ajax({                    
        url: `https://api.themoviedb.org/3/search/movie?api_key=b9e8ab5199d674481be8e14eb992dc6a&query=${search}`,     
        type: 'get',
        async: false, 
        success: function(data)         
        {
        movies = [...data.results];
        } 
    });


    $.ajax({                    
        url: 'https://api.themoviedb.org/3/genre/movie/list?api_key=b9e8ab5199d674481be8e14eb992dc6a&language=en-US',     
        type: 'get', 
        async: false, 
        success: function(data)         
        {
          genres = [...data.genres];
        } 
      });


    if(typeof movies !== 'undefined' && movies.length > 0){
        movies.forEach(async movie => {
            genresInMovie = getGenresInMovie(movie, genres);
    
            createMovie(movie, genresInMovie);
            }
        );
    }
    else{
        createInfo(searchInput);
    }

}
function createInfo(searchInput){
    const movieDiv = document.createElement('div');
    movieDiv.classList.add('info_box');
    movieDiv.innerHTML = `
    <h2>No result found for: ${searchInput.value}</h2>
    <p>Please try to enter something else </p>
        `
        ;
    movieContainerSearch.insertBefore(movieDiv, movieContainerSearch.firstChild)
}

function createMovie(movie, genresInMovie) {
    const movieDiv = document.createElement('div');
    movieDiv.classList.add('movie_box');
    const myUrl = `http://image.tmdb.org/t/p/w185${movie.poster_path}`;
    movieDiv.innerHTML = `
        <div class = "cover "><img src="${myUrl}" style="width: 85%; height: 85%;"  alt="${movie.title}">
            <p id= "styl2">${movie.title}</p>
        </div>
        <div class = "description ">
            <div class = "description_header">
                <h3>${movie.title}
                <button class="dislike">
                    <i class="fa fa-thumbs-o-down" aria-hidden="true"></i>
                </button>
                
                <button class="like" style=”float: right”>
                    <i onclick="addToFavourite(${movie.id})" class="fa fa-thumbs-o-up" aria-hidden="true"></i>
                </button>
                </h3>

                <p>Premiere: ${movie.release_date}</p>
            </div>
            <div class = "description_body">
                <h3>Movie description</h3>
                <p id= "styl1">${movie.overview}</p>
                <p id= "styl1" style="text-align:bottom">Vote: ${movie.vote_average} </p>
            </div>
            <div class = "description_bottom">
                <h3>Genres</h3>
                <p>${genresInMovie}</p>
            </div>
        </div>
        `
        ;
    movieContainerSearch.appendChild(movieDiv);
}

async function addToFavourite(movie){
    add_movie = movie

	$.ajax({
	  url : '/baza_filmowa/addtofav',
      type : 'GET',
      data : {data_movie: add_movie},
      success: function(){
        console.log(this.url);
      }
    });
}

async function searchFilm() {
    	
    // Get the data from each element on the form.
    const searchValue = document.getElementById('searchF');
    loadSearch(searchValue)
  }
