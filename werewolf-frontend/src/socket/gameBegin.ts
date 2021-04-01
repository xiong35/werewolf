import { gameBegin as begin } from "../reactivity/joinRoom";

export default function gameBegin() {
  console.log("#ws on game begin");

  begin();
}
