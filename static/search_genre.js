//Olga Krupa
const movieContainer = document.getElementById('movie-ctr');

const optionsGen = {
    method: 'GET',
    url: 'https://api.themoviedb.org/3/genre/movie/list?api_key=b9e8ab5199d674481be8e14eb992dc6a&language=en-US',
};

function getByGenre(genre){
    const options = {
        method: 'GET',
        url: `https://api.themoviedb.org/3/discover/movie?api_key=b9e8ab5199d674481be8e14eb992dc6a&with_genres=${genre}`,
        }; 
    return axios.request(options).then(response => response.data.results)
}

function getGenres(){
    return axios.request(optionsGen).then(response => response.data.genres)
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

async function searchByGenre(genre) {
    movies = Array();
    genres = Array();
    clearDiv();
    var promise = getByGenre(genre);
    await promise.then(function(result) {
        movies = [...result];
    })

    var promiseG = getGenres();
    await promiseG.then(function(result) {
        genres = [...result];
    })


    movies.forEach(async movie => {
        genresInMovie = getGenresInMovie(movie, genres)

        createMovie(movie, genresInMovie);
        
    }
    );
}

function createMovie(movie, genresInMovie) {
    const movieDiv = document.createElement('div');
    movieDiv.classList.add('movie_box');
    const myUrl = `http://image.tmdb.org/t/p/w185${movie.poster_path}`;
    movieDiv.innerHTML = `
        <div class = "cover "><img src="${myUrl}" style="width: 75%; height: 85%;"  alt="${movie.title}">
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
    movieContainer.appendChild(movieDiv);
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