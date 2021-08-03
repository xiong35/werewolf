<template>
  <div class="review">
    <div class="title">游戏记录</div>
    <div class="events" v-if="records.length">
      <div
        class="record-item"
        v-for="recordBrief in records"
        :key="recordBrief.time"
        @click="
          $router.push({
            name: 'review-detail',
            query: {
              roomNumber: recordBrief.roomNumber,
              time: recordBrief.time,
            },
          })
        "
      >
        <div class="room-number info">
          <span class="key">房间: </span>
          {{ recordBrief.roomNumber }}
        </div>
        <div class="time info">
          <span class="key">时间: </span>
          {{ new Date(recordBrief.time).toLocaleString() }}
        </div>
      </div>
    </div>

    <div class="placeholder" v-else>
      什么都没有呢
    </div>

    <Btn
      :onClick="() => $router.push({ name: 'home' })"
      content="返回主页"
    ></Btn>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, onMounted, ref } from "vue";
  import Btn from "../components/Btn.vue";

  import PlayEventList from "../components/PlayEventList.vue";

  import { showDialog } from "../reactivity/dialog";
  import { refresh } from "../reactivity/game";
  import { useAllRecords } from "../reactivity/record";

  const ReviewPage = defineComponent({
    name: "ReviewPage",
    components: { PlayEventList, Btn },
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

<style lang="scss" scoped>
  .review {
    text-align: center;
    .title {
      font-size: 2rem;
      font-weight: bold;
      padding: 1.5rem;
    }
    .events {
      margin: 0 auto 3rem;
      max-width: 95vw;

      .record-item {
        text-align: left;
        padding: 0.4rem;
        cursor: pointer;
        .info {
          margin: 0.2rem;
        }
        .key {
          font-weight: bold;
        }
      }
    }
    .placeholder {
      margin: 2rem 0 4rem;
      opacity: 0.5;
    }
  }
</style>
