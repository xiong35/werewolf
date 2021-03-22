<template>
  <h1>{{ result }}</h1>
  <button @click="count++">count is: {{ count }}</button>
  <p>
    Edit <code>components/HelloWorld.vue</code> to test hot module replacement.
  </p>
</template>

<script lang="ts">
  import { defineComponent } from "vue";

  const Component = defineComponent({
    name: "HelloWorld",
    props: {
      message: {
        type: String,
        required: true,
      },
    },
    data() {
      return {
        count: 0,
      };
    },
    setup(props) {
      const result = props.message.split(""); // 正确, 'message' 被声明为字符串
      return { result };
    },
  });
  export default Component;
</script>
