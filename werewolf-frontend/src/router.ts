import { createRouter, createWebHistory } from "vue-router";

import CreateRoom from "./pages/CreateRoom.vue";
import Home from "./pages/Home.vue";
import JoinRoom from "./pages/JoinRoom.vue";
import Play from "./pages/Play.vue";
import Recon from "./pages/Recon.vue";
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
  { path: "/recon", name: "recon", component: Recon },
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
