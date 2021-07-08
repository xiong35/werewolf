import { ShowMsg } from "../../shared/WSMsg/ShowMsg";
import { showDialog } from "../reactivity/dialog";

export default function showWSMsg(msg: ShowMsg) {
  showDialog(msg.innerHTML, msg.showTime);
}
