import { reactive, onMounted } from "vue";
import { createRoom } from "../http/room";
import { CreateRoomRequest } from "../../../shared/httpMsg/CreateRoomMsg";

// export function useCreateRoom() {
//   onMounted(async () => {
//     const res = await createRoom();
//     users.value = res.data;
//     console.log(res);
//   });

//   return async function (data: CreateRoomRequest) {
//     const res = await createRoom(data);

//   };
// }
