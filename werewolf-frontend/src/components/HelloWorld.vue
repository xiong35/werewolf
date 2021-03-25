<template>
  <h1>{{ result }}</h1>
  <button @click="send">count is: {{ count }}</button>
  <p>
    Edit <code>components/HelloWorld.vue</code> to test hot module replacement.
  </p>
</template>

<script lang="ts">
  import { defineComponent, ref } from "vue";
  import io from "socket.io-client";

  const Component = defineComponent({
    name: "HelloWorld",
    props: {
      message: {
        type: String,
        required: true,
      },
    },
    setup(props) {
      const socket = io("http://127.0.0.1:3030", {
        path: "/werewolf-api",
      });

      socket.on("message", (...args: any[]) => {
        console.log(args);
      });

      const count = ref(1);

      const send = () => {
        socket.emit("my event", { this: "is obj" });
        count.value++;
      };

      const result = props.message.split(""); // 正确, 'message' 被声明为字符串
      var a: number = 0;
      return { result, send, count };
    },
  });
  export default Component;
</script>
