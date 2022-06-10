<script setup>
import { ref } from "vue";
import { DatePicker } from "v-calendar";

// Emits
const emits = defineEmits(["submitDate"]);
// Calendar
const range = ref({ start: new Date(2022, 0, 6), end: new Date(2022, 0, 9) });
const date = ref(new Date());
const inputStart = ref("");
const inputEnd = ref("");
const modelConfig = ref({
  start: {
    timeAdjust: "00:00:00",
  },
  end: {
    timeAdjust: "23:59:59",
  },
});
const masks = ref({ input: "YYYY-MM-DD " });
// Function
const display = () => {
  console.log("Start date ", inputStart.value.value);
  console.log("End date", inputEnd.value.value);
};
const filterDate = () => {
  const dates = { start: inputStart.value.value, end: inputEnd.value.value };
  emits("submitDate", dates);
};
</script>

<template>
  <div class="flex w-full flex-col items-center justify-center">
    <form class="rounded-full flex items-center" @submit.prevent="filterDate">
      <div class="flex items-center">
        <!-- <span class="block text-gray-600 text-sm text-left font-bold mb-2"
          >Select Date</span
        > -->
        <DatePicker v-model="range" mode="date" :masks="masks" is-range>
          <template v-slot="{ inputValue, inputEvents, isDragging }">
            <div class="flex flex-col sm:flex-row justify-start items-center">
              <div class="relative flex-grow">
                <svg
                  class="text-gray-600 w-4 h-full mx-2 absolute pointer-events-none"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  ></path>
                </svg>
                <input
                  class="flex-grow pl-8 pr-2 py-1 bg-gray-100 border rounded w-full"
                  :class="isDragging ? 'text-gray-600' : 'text-gray-900'"
                  :value="inputValue.start"
                  v-on="inputEvents.start"
                  ref="inputStart"
                  readonly
                />
              </div>
              <span class="flex-shrink-0 m-2">
                <svg
                  class="w-4 h-4 stroke-current text-gray-600"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </span>
              <div class="relative flex-grow">
                <svg
                  class="text-gray-600 w-4 h-full mx-2 absolute pointer-events-none"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  ></path>
                </svg>
                <input
                  class="flex-grow pl-8 pr-2 py-1 bg-gray-100 border rounded w-full"
                  :class="isDragging ? 'text-gray-600' : 'text-gray-900'"
                  :value="inputValue.end"
                  v-on="inputEvents.end"
                  ref="inputEnd"
                  readonly
                />
              </div>
            </div>
          </template>
        </DatePicker>
        <div class="flex ml-4">
          <button
            class="bg-indigo-500 rounded-lg hover:bg-indigo-600 text-white px-[1.2rem] py-[0.5rem] border-none"
            type="submit"
          >
            Search
          </button>
        </div>
      </div>
    </form>
  </div>
</template>
