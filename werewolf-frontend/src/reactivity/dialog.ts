import { ref } from "vue";

export const dialogTimeLeft = ref(0);
export const content = ref("");

var timer: NodeJS.Timeout;

/**
 * 展示一个出现 showTime 秒数(默认5s) 的弹窗
 * @param toShowContent 显示的文字(支持 html)
 * @param showTime 显示的秒数
 */
export function showDialog(
  toShowContent: string,
  showTime?: number
) {
  clearInterval(timer);
  dialogTimeLeft.value = showTime || 5;
  content.value = toShowContent;

  timer = setInterval(() => {
    dialogTimeLeft.value--;
    if (dialogTimeLeft.value <= 0) {
      clearInterval(timer);
    }
  }, 1000);
}
