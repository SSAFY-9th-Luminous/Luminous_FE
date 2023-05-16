import Vue from "vue";
import VueRouter from "vue-router";
import MainApp from "@/views/MainApp";
import ObservatoryApp from "@/views/ObservatoryApp";
import PlaceApp from "@/views/PlaceApp";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "main",
    component: MainApp,
  },

  {
    path: "/observatory",
    name: "observe",
    component: ObservatoryApp,
  },
  {
    path: "/place",
    name: "place",
    component: PlaceApp,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
