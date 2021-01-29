//Olga Krupa
const movieContainerPremiere = document.getElementById('movie-ctr');

const optionsPremiere = {
method: 'GET',
url: 'https://api.themoviedb.org/3/movie/upcoming?api_key=b9e8ab5199d674481be8e14eb992dc6a&language=en-US&page=1',
};



const optionsGenre = {
    method: 'GET',
    url: 'https://api.themoviedb.org/3/genre/movie/list?api_key=b9e8ab5199d674481be8e14eb992dc6a&language=en-US',
};

function getPremiers(){
    return axios.request(optionsPremiere).then(response => response.data.results)
}

function getGenres(){
    return axios.request(optionsGenre).then(response => response.data.genres)
}

function getSuggestions(movie){
    movies_arr = Array();
    $.ajax({
        url: `https://api.themoviedb.org/3/movie/${movie}/recommendations?api_key=b9e8ab5199d674481be8e14eb992dc6a&language=en-US&page=1`,
        type: 'get',
        async: false,
        success: function(data)
        {
        movies_arr = [...data.results];
        }
    });

    var s_movies  = movies_arr.slice(0, 3);
    return s_movies
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
    while (movieContainer.firstChild) {
        movieContainer.removeChild(movieContainer.firstChild);
      }
}

async function loadSuggestions() {
    movies = Array();
    genres = Array();
    clearDiv();
    fav_movies = Array();

    $.ajax({
			url: '/baza_filmowa/suggestions',
			data: $('form').serialize(),
			type: 'POST',
			async: false,
			success: function(response){
				fav_movies = [...response.favmovies];
			},
			error: function(error){
				console.log(error);
			}
		});

	var promiseG = getGenres();
    await promiseG.then(function(result) {
        genres = [...result];
    })


    if (typeof fav_movies !== 'undefined' && fav_movies.length > 0) {
        fav_movies.forEach(async f_movie => {
            var s_movies = getSuggestions(f_movie);
            movies.unshift(...s_movies)

    }
    );
    }
    else {
        var promise = getPremiers();
        await promise.then(function(result) {
            movies = [...result];
        })
    }

    movies.forEach(async movie => {
        genresInMovie = getGenresInMovie(movie, genres)

        createMovie(movie, genresInMovie);

    }
    );
}

function createMovie(movie, genresInMovie) {
    const movieDiv = document.createElement('div');
    movieDiv.classList.add('movie_box');
    const url = new URL(movie.poster_path, 'http://image.tmdb.org/t/p/w185');

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
        movieContainerPremiere.appendChild(movieDiv);
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


window.onload = loadSuggestions();