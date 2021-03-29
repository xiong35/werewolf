import { ref } from "vue";

export const timeLeft = ref(0);
export const content = ref("");

var timmer: NodeJS.Timeout;

export function showDialog(toShowContent: string) {
  clearInterval(timmer);
  timeLeft.value = 5;
  content.value = toShowContent;

  timmer = setInterval(() => {
    timeLeft.value--;
    if (timeLeft.value <= 0) {
      clearInterval(timmer);
    }
  }, 1000);
}
