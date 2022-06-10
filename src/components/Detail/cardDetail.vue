<script setup>
import { computed, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();
const props = defineProps({
  movieInfo: {
    type: Object,
    required: true,
  },
  castCredit: {
    type: Array,
    required: true,
  },
});

const movie = ref({});
const names = ref([]);
const imageUrl = computed(() => {
  return (
    "http://image.tmdb.org/t/p/w500/" + `${props.movieInfo["poster_path"]}`
  );
});

const ConvertedRuntime = computed(() => {
  const totalRuntimeValue = props.movieInfo.runtime;
  const hourValue = Math.floor(totalRuntimeValue / 60);
  const restMinute = totalRuntimeValue - 60 * hourValue;
  return `${hourValue} hr ${restMinute} min`;
});
const calculatedScore = computed(() => {
  const voteAverage = props.movieInfo["vote_average"];
  const totalCount = props.movieInfo["vote_count"];
  return `${voteAverage} (${totalCount}votes)`;
});
</script>

<template>
  <div class="shadow-lg card-container mx-auto flex flex-col w-full p-5">
    <div class="flex w-full">
      <div class="mr-4 w-[400px] h-auto p-2 image-container">
        <img
          class="rounded-lg object-cover w-full max-w-full"
          :src="imageUrl"
          alt="movie"
        />
      </div>
      <div class="info-container flex flex-col w-full">
        <div class="movie-item flex justify-between items-center p-3">
          <!-- movie property name --->
          <p class="text-[1rem] font-bold">Budget</p>
          <!-- movie Property value -->
          <p class="text-gray-600">$&nbsp;{{ props.movieInfo.budget }}</p>
        </div>
        <div class="movie-item flex justify-between items-center p-3">
          <!-- movie property name --->
          <p class="text-[1rem] font-bold">revenue</p>
          <!-- movie Property value -->
          <p class="text-gray-600">$&nbsp;{{ props.movieInfo.revenue }}</p>
        </div>
        <div class="movie-item flex justify-between items-center p-3">
          <!-- movie property name --->
          <p class="text-[1rem] font-bold">Release Date</p>
          <!-- movie Property value -->
          <p class="text-gray-600">
            {{ props.movieInfo["release_date"] }}
          </p>
        </div>
        <div class="movie-item flex justify-between items-center p-3">
          <!-- movie property name --->
          <p class="text-[1rem] font-bold">Runtime</p>
          <!-- movie Property value -->
          <p class="text-gray-600">
            {{ ConvertedRuntime }}
          </p>
        </div>
        <div class="movie-item flex justify-between items-center p-3">
          <!-- movie property name --->
          <p class="text-[1rem] font-bold">Genres</p>
          <!-- movie Property value -->
          <p class="text-gray-600">
            <span
              class="ml-2"
              v-for="genre in props.movieInfo.genres"
              :key="genre"
              >{{ genre.name }}</span
            >
          </p>
        </div>
        <div class="movie-item flex justify-between items-center p-3">
          <!-- movie property name --->
          <p class="text-[1rem] font-bold">Scores</p>
          <!-- movie Property value -->
          <p class="text-gray-600">
            {{ calculatedScore }}
          </p>
        </div>
        <div class="movie-item flex justify-between items-center p-3">
          <!-- movie property name --->
          <p class="text-[1rem] font-bold">Homepage Link</p>
          <!-- movie Property value -->
          <p>
            <a
              class="text-sky-500 hover:underline"
              :href="props.movieInfo.homepage"
              >Link</a
            >
          </p>
        </div>
      </div>
    </div>

    <div class="flex w-full mt-4 p-4">
      <p class="text-[0.85rem]">{{ props.movieInfo.overview }}</p>
    </div>
    <!-- top 10 popular cast -->
    <div class="flex flex-col w-full mt-3 p-4 items-start">
      <h4 class="mr-2 text-[0.75rem] font-bold">Credits:</h4>
      <div class="flex w-full p-2">
        <span
          class="text-[0.65rem] mr-1"
          v-for="(user, index) in props.castCredit"
          :key="index + 1"
          >{{ user }},</span
        >
      </div>
    </div>
  </div>
</template>
