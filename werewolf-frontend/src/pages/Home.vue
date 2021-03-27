<template>
  <button @click="add">count is: {{ count }}</button>
</template>

<script lang="ts">
  import { defineComponent, ref } from "vue";

  const Home = defineComponent({
    name: "Home",
    props: {},

    setup(props) {
      const count = ref(1);

      const add = () => {
        count.value++;
      };

      return { add, count };
    },
  });
  export default Home;
</script>
