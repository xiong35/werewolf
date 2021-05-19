import { ref } from "vue";

export const timeLeft = ref(0);
export const content = ref("");

var timer: NodeJS.Timeout;

/**
 * 展示一个 5s 的弹窗
 * @param toShowContent 显示的文字
 */
export function showDialog(toShowContent: string) {
  clearInterval(timer);
  timeLeft.value = 5;
  content.value = toShowContent;

  timer = setInterval(() => {
    timeLeft.value--;
    if (timeLeft.value <= 0) {
      clearInterval(timer);
    }
  }, 1000);
}
