import axiosClient from "../axios/config.js";
const API_KEY = "f62f750b70a8ef11dad44670cfb6aa57";
let listOfGenres = [];
let foundNames = [];
async function getMoviesGenres() {
  const queryUrl = `/genre/movie/list?api_key=${API_KEY}&language=en-US`;
  const response = await axiosClient.get(queryUrl);

  // const genresLists = [];
  listOfGenres = response.data.genres;
  return response.data.genres;
}
async function findGenresName(genArray) {
  const totalGenres = await getMoviesGenres();
  foundNames = [];
  totalGenres.forEach((genre, index) => {
    for (let genreId of genArray) {
      if (genreId == genre.id) {
        foundNames.push(genre.name);
      }
    }
  });
  return foundNames;
}

export async function getMovies(currPage = 1, movieList = null) {
  const queryUrl = `/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${currPage}&with_watch_monetization_types=flatrate`;
  const response = await axiosClient.get(queryUrl);
  if (response) {
    const foundMovies = response.data.results;

    movieList = foundMovies.map((movie) => {
      return {
        id: movie.id,
        title: movie.title,
        genres: movie["genre_ids"],
        imageUrl: movie["poster_path"],
        releaseDate: movie["release_date"],
        popularity: movie.popularity,
      };
    });

    for (let movie of movieList) {
      const foudngenres = await findGenresName(movie.genres);
      movie.genres = [...foudngenres];
    }

    return movieList;
  }
}

export async function findMovie(movieId) {
  const url = `movie/${movieId}?api_key=${API_KEY}&language=en-US`;
  const response = await axiosClient.get(url);
  return response.data;
}
export async function getCredits(movieId) {
  const url = `movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`;
  const response = await axiosClient.get(url);
  console.log(response);
  return response.data;
}
