import Vue from "vue";
import VueRouter from "vue-router";
import ObservatoryApp from "@/views/ObservatoryApp";
import PlaceApp from "@/views/PlaceApp";
import ConstellationApp from "@/views/ConstellationApp";
import MainApp from "@/views/MainApp";
import store from "@/store";
import Map from "@/components/Map";
Vue.use(VueRouter);

// https://v3.router.vuejs.org/kr/guide/advanced/navigation-guards.html

const onlyAuthUser = async (to, from, next) => {
  const checkUserInfo = store.getters["memberStore/checkUserInfo"];
  const checkToken = store.getters["memberStore/checkToken"];
  let token = sessionStorage.getItem("access-token");

  if (checkUserInfo != null && token) {
    console.log("토큰 유효성 체크하러 가자!!!!");
    await store.dispatch("memberStore/getUserInfo", token);
  }
  if (!checkToken || checkUserInfo === null) {
    alert("로그인이 필요한 페이지입니다..");
    router.push({ name: "login" });
  } else {
    next();
  }
};

const routes = [
  {
    path: "/",
    name: "main",
    component: MainApp,
  },
  {
    path: "/fortune",
    name: "fortune",
    component: ConstellationApp,

    redirect: "/fortune/list",
    children: [
      {
        path: "list",
        name: "fortunelist",
        component: () => import("@/components/fortune/FortuneList"),
      },
    ],
  },
  {
    path: "/constellation",
    name: "constellation",
    component: ConstellationApp,

    redirect: "/constellation/list",
    children: [
      {
        path: "list",
        name: "constellationlist",
        component: () => import("@/components/constellation/ConstellationList"),
      },
    ],
  },
  {
    path: "/observatory",
    name: "observatory",
    component: ObservatoryApp,
    redirect: "/observatory/list",
    children: [
      {
        path: "list",
        name: "observatorylist",

        component: () =>
          import(/* webpackChunkName: "observatory" */ "@/components/observatory/ObservatoryList"),
      },
      {
        path: "view/:id",
        name: "observatoryView",

        component: () =>
          import(/* webpackChunkName: "observatory" */ "@/components/observatory/ObservatoryView"),
      },
    ],
  },
  {
    path: "/camping",
    name: "camping",
    component: ObservatoryApp,
    redirect: "/camping/list",
    children: [
      {
        path: "list",
        name: "campinglist",

        component: () =>
          import(/* webpackChunkName: "camping" */ "@/components/camping/CampingList"),
      },
      {
        path: "view/:id",
        name: "campingView",

        component: () =>
          import(/* webpackChunkName: "camping" */ "@/components/camping/CampingView"),
      },
    ],
  },
  {
    path: "/map",
    name: "map",
    component: Map,
  },
  {
    path: "/place",
    name: "place",
    component: PlaceApp,
    redirect: "/place/list",
    children: [
      {
        path: "list",
        name: "placelist",

        component: () => import(/* webpackChunkName: "place" */ "@/components/place/PlaceList"),
      },
      {
        path: "write",
        name: "placewrite",
        beforeEnter: onlyAuthUser,
        component: () => import(/* webpackChunkName: "place" */ "@/components/place/PlaceWrite"),
      },
      {
        path: "view/:id",
        name: "placeview",
        beforeEnter: onlyAuthUser,
        component: () => import(/* webpackChunkName: "place" */ "@/components/place/PlaceView"),
      },
      {
        path: "modify/:id",
        name: "placemodify",
        beforeEnter: onlyAuthUser,
        component: () => import(/* webpackChunkName: "place" */ "@/components/place/PlaceModify"),
      },
      {
        path: "delete/:articleno",
        name: "placedelete",
        beforeEnter: onlyAuthUser,
        component: () => import(/* webpackChunkName: "place" */ "@/components/place/PlaceDelete"),
      },
    ],
  },
  {
    path: "/member",
    name: "member",
    component: () => import(/* webpackChunkName: "member" */ "@/views/MemberApp"),
    children: [
      {
        path: "login",
        name: "login",
        component: () => import(/* webpackChunkName: "member" */ "@/components/member/MemberLogin"),
      },
      {
        path: "signin",
        name: "signin",
        component: () =>
          import(/* webpackChunkName: "member" */ "@/components/member/MemberSignIn"),
      },
      {
        path: "mypage",
        name: "mypage",
        beforeEnter: onlyAuthUser,
        component: () =>
          import(/* webpackChunkName: "member" */ "@/components/member/MemberMyPage"),
      },
      {
        path: "modify",
        name: "memberModify",
        beforeEnter: onlyAuthUser,
        component: () =>
          import(/* webpackChunkName: "member" */ "@/components/member/MemberModify"),
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
