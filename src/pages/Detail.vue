<script setup>
import TheHeader from "../components/layouts/TheHeader.vue";
import CardDetail from "../components/Detail/cardDetail.vue";
import TheLoader from "../components/UI/Loader.vue";
import { computed, onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import { findMovie, getCredits } from "../api/movie/movie.js";

const router = useRouter();
const route = useRoute();
const store = useStore();
const props = defineProps({
  id: {
    type: [String, Number],
    required: true,
  },
});
const isLoading = ref(true);
const detail = ref({});
const popularCasts = ref(null);
const castsNames = ref([]);
async function Search(movieId) {
  await store.dispatch("searchMovie", movieId);
}
async function getCrews(movieId) {
  await store.dispatch("orderPopularCrews", movieId);
}
onMounted(async () => {
  await Search(route.params.id);
  await getCrews(route.params.id);
  detail.value = store.getters.movieDetail;
  popularCasts.value = store.getters.orderedPopularCasts;
  popularCasts.value.forEach((element) => {
    castsNames.value.push(element.name);
  });
  isLoading.value = false;
  console.log("popular cast", popularCasts.value);
});
watch(route.params.id, async (routeId, newRoute) => {
  if (routeId !== newRoute) {
    await Search(route.params.id);
    detail.value = store.getters.movieDetail;
  }
});
</script>

<template>
  <the-header
    is-home="false"
    :title="detail.title"
    :tagline="detail.tagline"
  ></the-header>
  <section v-if="isLoading" class="mx-auto w-full my-[2rem]">
    <div class="flex items-center justify-center">
      <the-loader></the-loader>
    </div>
  </section>
  <section v-else class="mx-auto w-[1200px] my-[3rem]">
    <card-detail :movie-info="detail" :cast-credit="castsNames"></card-detail>
  </section>
</template>
