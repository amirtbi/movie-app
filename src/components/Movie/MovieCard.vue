<script setup>
import { CalendarIcon } from "@heroicons/vue/outline";
import { useRouter, useRoute } from "vue-router";
import { computed } from "vue";
const router = useRouter();
const route = useRoute();
const props = defineProps({
  imageUrl: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  id: {
    type: [String, Number],
    required: false,
  },
});
</script>

<template>
  <router-link
    :to="'/detail' + `/${props.id}`"
    class="transition-all hover:shadow-lg border-2 border-gray-300 m-[2rem] shadow-md w-[400px] bg-gray-200 rounded-mg max-w-[550px] flex"
  >
    <div class="image-container w-[400px] flex">
      <img
        class="object-cover max-h-full"
        :src="'http://image.tmdb.org/t/p/w500/' + `${imageUrl}`"
        alt="movie"
      />
    </div>
    <div class="info flex w-full">
      <div
        class="movie-info flex-col flex w-full p-3 items-start justify-between"
      >
        <!-- title -->
        <div class="title-container">
          <p class="text-[1rem] font-bold w-full mb-2">
            <slot name="title"></slot>
          </p>
        </div>
        <!-- info  -->
        <div class="flex flex-col items-start w-full text-gray-700">
          <div class="flex items-center w-full">
            <span class="mr-2"
              ><CalendarIcon class="w-[30px] h-[30px] text-gray-700"
            /></span>
            <p class="text-[0.75rem]">
              <slot name="date"></slot>
            </p>
          </div>

          <!-- genre -->
          <div class="genre-container w-full flex itmes-end">
            <slot name="genre"></slot>
          </div>
        </div>
      </div>
    </div>
  </router-link>
</template>
