import { ref } from "vue";

export const DARK = "-dark";
export const LIGHT = "";
// export const theme = ref(DARK);
export const theme = ref(LIGHT);

export function toggleTheme() {
  theme.value = theme.value === DARK ? LIGHT : DARK;
}
