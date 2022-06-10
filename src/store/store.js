import { createStore } from "vuex";
import { findMovie, getCredits } from "../api/movie/movie.js";
function sortPopulartCrews(crews) {
  const crewsList = crews.map((crew) => {
    return { [crew.name]: crew.popularity };
  });
  const values = [];
  for (const user of crewsList) {
    values.push(Object.values(user)[0]);
  }

  // Sort popularity values

  values.sort((a, b) => {
    if (a - b > 0) {
      return 1;
    } else if (a - b < 0) {
      return -1;
    } else {
      return 0;
    }
  });

  const listArrays = new Array(values.length);
  crews.forEach((crew, index) => {
    for (let i = 0; i < values.length; i++) {
      if (values[i] == crew.popularity) {
        listArrays[i] = crew;
        break;
      }
    }
  });
  return listArrays.reverse();
}
const store = createStore({
  state() {
    return {
      movies: [],
      foundMovie: {},
      popularCasts: [],
    };
  },
  actions: {
    async searchMovie(context, movieId) {
      const response = await findMovie(movieId);
      if (response) {
        context.commit("setFoundMovie", response);
      }
    },
    async orderPopularCrews(contex, movieId) {
      const response = await getCredits(movieId);

      const crewsInfo = response.cast.map((cast, index) => {
        return {
          id: cast["cast_id"],
          name: cast.name,
          popularity: cast.popularity,
        };
      });
      const sortedCrews = sortPopulartCrews(crewsInfo);
      if (response) {
        contex.commit("orderCrews", sortedCrews);
      }
    },
  },
  mutations: {
    setFoundMovie(state, payload) {
      state.foundMovie = payload;
    },
    orderCrews(state, payload) {
      state.popularCasts = payload;
    },
  },
  getters: {
    movieDetail(state) {
      return state.foundMovie;
    },
    orderedPopularCasts(state) {
      if (state.popularCasts.length >= 10) {
        return state.popularCasts.slice(0, 10);
      } else {
        return state.popularCasts;
      }
    },
  },
});

export default store;
