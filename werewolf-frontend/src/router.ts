import { createRouter, createWebHistory } from "vue-router";

import CreateRoom from "./pages/CreateRoom.vue";
import Home from "./pages/Home.vue";
import JoinRoom from "./pages/JoinRoom.vue";
import Play from "./pages/Play.vue";
import Review from "./pages/Review.vue";
import ReviewDetail from "./pages/ReviewDetail.vue";
import WaitRoom from "./pages/WaitRoom.vue";

const routes = [
  { path: "/", name: "home", component: Home },
  {
    path: "/createRoom",
    name: "createRoom",
    component: CreateRoom,
  },
  {
    path: "/joinRoom",
    name: "joinRoom",
    component: JoinRoom,
    props: (route: any) => ({
      pw: route.query.pw,
      number: route.query.number,
    }),
  },
  { path: "/play", name: "play", component: Play },
  {
    path: "/review-detail",
    name: "review-detail",
    component: ReviewDetail,
    props: (route: any) => ({
      roomNumber: route.query.roomNumber,
      time: route.query.time,
    }),
  },
  {
    path: "/review",
    name: "review",
    component: Review,
  },
  {
    path: "/waitRoom",
    name: "waitRoom",
    component: WaitRoom,
    props: (route: any) => ({
      pw: route.query.pw,
      number: route.query.number,
    }),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
