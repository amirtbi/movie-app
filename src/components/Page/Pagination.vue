<script setup>
const props = defineProps({
  pageRange: {
    type: String,
    default: "1-20",
  },
});
const emits = defineEmits(["emitChanegPage"]);

const changePage = (commandTyep) => {
  if (commandTyep === "next") {
    emits("emitChanegPage", "next");
  } else {
    emits("emitChanegPage", "prev");
  }
};
</script>

<template>
  <div class="flex items-center justify-between">
    <div @click="changePage('prev')">
      <span
        class="text-[1.2rem] cursor-pointer text-gray-500 hover:text-sky-500"
        >Previous Page</span
      >
    </div>
    <div class="mx-4 text-[1.2rem]"><span>|</span></div>
    <div
      @click="changePage('next')"
      class="text-[1.2rem] cursor-pointer text-gray-500 hover:text-sky-500"
    >
      <span>Next Page</span>
    </div>
  </div>
  <div class="list-result w-full items-center justify-center">
    <p class="text-gray-400 text-center mt-4">
      showing result {{ props.pageRange }}
    </p>
  </div>
</template>
