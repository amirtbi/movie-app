import { createRouter, createWebHistory } from "vue-router";

import Home from "../pages/Home.vue";
import Detail from "../pages/Detail.vue";

const routes = [
  { path: "/", redirect: "/home" },
  {
    path: "/home",
    name: "home-page",
    component: Home,
  },
  {
    path: "/detail/:id",
    name: "detail-page",
    component: Detail,
    props: true,
  },
];

const router = new createRouter({
  history: createWebHistory(),
  routes: routes,
});
export default router;
