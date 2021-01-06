const f = document.getElementById('form');
const input = document.getElementById('search-film');

const movieContainerSearch = document.getElementById('movie-ctr');



const optionsG = {
    method: 'GET',
    url: 'https://api.themoviedb.org/3/genre/movie/list?api_key=b9e8ab5199d674481be8e14eb992dc6a&language=en-US',
};

function getSearch(searchVal){
    const optionsM = {
        method: 'GET',
        url: `https://api.themoviedb.org/3/search/movie?api_key=b9e8ab5199d674481be8e14eb992dc6a&query=${searchVal}`,
        };
    return axios.request(optionsM).then(response => response.data.results)
}

function getGenres(){
    return axios.request(optionsG).then(response => response.data.genres)
}

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

async function loadSearch(event) {
    movies = Array();
    genres = Array();
    const inputValue = input.value;
    if (inputValue == ''){
        return
    }

    var search = getSearchMovie(input.value);

    var promiseM = getSearch(search);
    await promiseM.then(function(result) {
        movies = [...result];
    })

    var promiseG = getGenres();
    await promiseG.then(function(result) {
        genres = [...result];
    })

    if (Array.isArray(movies) && movies.length) {
        clearDiv();

        movies.forEach(movie => {
            genresInMovie = getGenresInMovie(movie, genres)

            createMovie(movie, genresInMovie);
            
        }
        );
    }
    else{
        createInfo();
    }
}
function createInfo(){
    const movieDiv = document.createElement('div');
    movieDiv.classList.add('movie_box');
    movieDiv.innerHTML = `
    <h2>No result found for: ${input.value}</h2>
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
                    <i onclick="myFunction(this)" class="fa fa-thumbs-o-up" aria-hidden="true"></i>
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

f.addEventListener('submit', loadSearch);