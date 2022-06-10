import { createApp } from "vue";
import App from "./App.vue";
import { SetupCalendar, Calendar, DatePicker } from "v-calendar";
import router from "./router/index.js";
import store from "./store/store.js";
// Import css
import "./index.css";
import "v-calendar/dist/style.css";
const app = createApp(App);

app.use(router);
app.use(store);
// Setup plugin for defaults or `$screens` (optional)
app.use(SetupCalendar, {});
app.component("Calendar", Calendar);
app.component("DatePicker", DatePicker);
router.isReady().then(() => {
  app.mount("#app");
});
