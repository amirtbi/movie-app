<script setup>
import SearchInput from "../UI/Search.vue";
import MovieNav from "../Detail/NavBanner.vue";
const props = defineProps({
  isHome: {
    type: Boolean,
    required: true,
  },
  title: {
    type: String,
    required: false,
  },
  tagline: {
    type: String,
    required: false,
  },
});
</script>

<template>
  <header class="p-4 w-full bg-indigo-300 header-contaienr">
    <div class="flex w-full justify-center items-center">
      <SearchInput v-if="props.isHome === true" />
      <MovieNav v-else :title="props.title" :tagline="props.tagline" />
    </div>
  </header>
</template>
