<template>
  <div class="review">
    <div class="title">游戏结束</div>
    <div class="events" v-if="records.length">
      {{ records }}
    </div>

    <div class="place-holder" v-else>
      什么都没有呢
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, onMounted, ref } from "vue";
  import PlayEventList from "../components/PlayEventList.vue";

  import { showDialog } from "../reactivity/dialog";
  import { refresh } from "../reactivity/game";
  import { useAllRecords } from "../reactivity/record";

  const ReviewPage = defineComponent({
    name: "ReviewPage",
    components: { PlayEventList },
    setup(props) {
      const records = useAllRecords();

      return {
        showDialog,
        records,
      };
    },
  });

  export default ReviewPage;
</script>
<style lang="scss" scoped></style>
