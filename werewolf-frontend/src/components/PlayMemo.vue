<template>
  <UseMenu v-show="showMemo" :onCancel="() => (showMemo = false)">
    <span class="title">备忘录</span>
    <textarea v-model="memoContent" rows="20"></textarea>
  </UseMenu>
</template>

<script lang="ts">
  import { defineComponent, onMounted } from "vue";

  import { showMemo, memoContent } from "../reactivity/playPage";

  import UseMenu from "./UseMenu.vue";

  const Memo = defineComponent({
    name: "Memo",
    components: { UseMenu },
    props: {},
    setup(props) {
      onMounted(() => {
        memoContent.value = localStorage.getItem("memo") || "";
      });
      return { showMemo, memoContent };
    },
  });

  export default Memo;
</script>

<style lang="scss" scoped>
  .use-menu {
    text-align: center;

    .title {
      font-size: 1.3rem;
      font-weight: bold;
    }

    textarea {
      resize: none;
      width: 85%;
      margin: 1rem;
    }
  }
</style>
