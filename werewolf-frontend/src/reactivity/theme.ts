import { computed } from "vue";
import { date } from "./game";

export const DARK = "-dark";
export const LIGHT = "";

export const theme = computed(() =>
  date.value % 2 === 0 ? DARK : LIGHT
);
