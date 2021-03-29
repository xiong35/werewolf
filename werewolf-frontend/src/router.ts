import { createRouter, createWebHistory } from "vue-router";

import Home from "./pages/Home.vue";
import CreateRoom from "./pages/CreateRoom.vue";
import JoinRoom from "./pages/JoinRoom.vue";
import Play from "./pages/Play.vue";
import Recon from "./pages/Recon.vue";
import WaitRoom from "./pages/WaitRoom.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/createRoom", component: CreateRoom },
  {
    path: "/joinRoom",
    component: JoinRoom,
    props: (route: any) => ({
      pw: route.query.pw,
      number: route.query.number,
    }),
  },
  { path: "/play", component: Play },
  { path: "/recon", component: Recon },
  { path: "/waitRoom", component: WaitRoom },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
