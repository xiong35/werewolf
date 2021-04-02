import { ref, watch } from "vue";

export const showMemo = ref(true);
export const memoContent = ref("");
watch(memoContent, () => {
  localStorage.setItem("memo", memoContent.value);
});

export const showActions = ref(true);
export const showCharacter = ref(true);
