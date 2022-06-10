<script setup>
import { ArrowLeftIcon } from "@heroicons/vue/outline";
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  tagline: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div class="flex w-full ml-4">
    <div class="w-full flex items-center justify-start">
      <div class="flex mr-3">
        <router-link
          to="/"
          class="items-center flex bg-indigo-500 rounded-lg hover:bg-indigo-600 text-white px-[1.2rem] py-[0.5rem] border-none"
        >
          <ArrowLeftIcon class="mr-2 text-white h-[20px] w-[20px]" />
          Back
        </router-link>
      </div>

      <div class="flex flex-col ml-4 justify-center items-center">
        <p class="text-[1rem] font-bold">{{ props.title }}</p>
        <p class="text-[0.75rem]">{{ props.tagline }}</p>
      </div>
    </div>
  </div>
</template>
