<script setup>
// Import Composables and Components
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { defineAsyncComponent } from "vue";
import { getMovies } from "../api/movie/movie.js";
import PaginationButton from "../components/Page/Pagination.vue";
import TheHeader from "../components/layouts/TheHeader.vue";
import DateInput from "../components/Date/datePicker.vue";
import TheLoader from "../components/UI/Loader.vue";
const MovieCard = defineAsyncComponent(() =>
  import("../components/Movie/MovieCard.vue")
);
const route = useRoute();
const router = useRouter();
// Varibales
const movieLists = ref([]);
const currentPage = ref(1);
const initialPage = ref(1);
const isLoading = ref(false);
const filteredMovies = ref(null);
const nofFoundMovie = ref(false);
const calculatePageRange = computed(() => {
  if (currentPage.value === 1) {
    return "1-20";
  } else {
    const lastNumber = currentPage.value * 20;
    const firstNumber = currentPage.value * 20 - 19;
    return `${firstNumber} - ${lastNumber}`;
  }
});

const displayChangeCommand = async (command) => {
  isLoading.value = true;
  if (currentPage.value <= 0) {
    currentPage.value = 1;
  }
  if (command === "next") {
    currentPage.value = currentPage.value + 1;
    movieLists.value = await getMovies(currentPage.value, movieLists.value);
    isLoading.value = false;
  } else if (command === "prev" && currentPage.value > 0) {
    currentPage.value = currentPage.value - 1;
    if (currentPage.value > 0) {
      movieLists.value = await getMovies(currentPage.value, movieLists.value);
      isLoading.value = false;
    } else {
      currentPage.value = 1;
      return;
    }
  }
};
const filterMovie = async (dates) => {
  nofFoundMovie.value = false;
  console.log(dates);
  const startDate = dates.start;
  const endDate = dates.end;

  const movies = await getMovies(currentPage.value, movieLists.value);

  const foundMovies = movies.filter((movie, index) => {
    if (movie.releaseDate >= startDate && movie.releaseDate <= endDate) {
      return movie;
    }
    return false;
  });
  if (foundMovies.length === 0) {
    nofFoundMovie.value = true;
  }
  filteredMovies.value = foundMovies;
  movieLists.value = foundMovies;
};

const resetPage = async () => {
  movieLists.value = await getMovies(currentPage.value, movieLists.value);
  nofFoundMovie.value = false;
  filteredMovies.value = null;
};
onMounted(async () => {
  isLoading.value = true;
  if (filteredMovies.value) {
    movieLists.value = filteredMovies.value;
  } else {
    movieLists.value = await getMovies(currentPage.value, movieLists.value);
  }
  isLoading.value = false;
});
</script>

<template>
  <header class="w-full flex justify-center items-center p-4 bg-indigo-300">
    <!-- Date picker --->
    <DateInput @submitDate="filterMovie" />
  </header>
  <section class="mt-4" v-if="filteredMovies && !nofFoundMovie">
    <div class="flex items-center w-full justify-center">
      <button @click="resetPage" class="text-xl font-bold text-black">
        Reset filter
      </button>
    </div>
  </section>
  <section class="flex mx-auto my-[2rem]">
    <div v-if="isLoading" class="w-full flex justify-center items-start">
      <the-loader></the-loader>
    </div>

    <div
      class="flex w-full flex-col justify-center items-center"
      v-else-if="nofFoundMovie"
    >
      <h1 class="text-center text-3xl font-bold">Not found any movies</h1>
      <button
        class="text-2xl mt-4 font-bold hover:underline text-orange-500"
        @click="resetPage"
      >
        Back to Page
      </button>
    </div>

    <div v-else class="flex w-full flex-wrap mx-auto justify-center">
      <movie-card
        v-for="movie in movieLists"
        :key="movie.id"
        :id="movie.id"
        :title="movie.title"
        :image-url="movie.imageUrl"
      >
        <template #title> {{ movie.title }} </template>
        <template #date> {{ movie.releaseDate }} </template>
        <template #genre>
          <ul class="flex flex-wrap mt-2">
            <li
              v-for="genre in movie.genres"
              :key="genre"
              class="text-gray-500 mr-2 text-[0.75rem]"
            >
              {{ genre }}
            </li>
          </ul>
        </template>
      </movie-card>
    </div>
  </section>
  <footer v-if="movieLists.length > 0">
    <div
      class="w-full flex-col mx-auto py-[4rem] mt-4 flex items-center justify-center"
    >
      <PaginationButton
        @emitChanegPage="displayChangeCommand"
        :page-range="calculatePageRange"
      />
    </div>
  </footer>
</template>
