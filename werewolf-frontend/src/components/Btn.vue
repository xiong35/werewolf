<template>
  <div class="btn" :class="{ disabled }">
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
      disabled: {
        type: Boolean,
        default: false,
      },
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
    &.disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  }
</style>