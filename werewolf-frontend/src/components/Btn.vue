<template>
  <div class="btn">
    <UseBorder>
      <span class="content">{{ content }}</span>
    </UseBorder>
  </div>
</template>

<script lang="ts">
  //  TODO  水波纹效果?
  import { defineComponent } from "vue";

  import UseBorder from "./UseBorder.vue";

  const Btn = defineComponent({
    name: "Btn",
    components: { UseBorder },
    props: {
      content: String,
    },
  });

  export default Btn;
</script>


<style lang="scss" scoped>
  .btn {
    cursor: pointer;
    display: inline-block;
    .content {
      padding: 0.5rem;
      display: inline-block;
    }
  }
</style>