<template>
  <div class="review-detail">
    <h2 class="title">
      对局记录
    </h2>
    <div class="review" v-if="record">
      <div class="room-number info">
        <span class="key">房间: </span>
        {{ record.roomNumber }}
      </div>
      <div class="time info">
        <span class="key">时间: </span>
        {{ new Date(record.time).toLocaleString() }}
      </div>

      <div class="players">
        <div
          class="player-info"
          v-for="p in record.playerBriefs"
          :key="p.index"
        >
          <div class="info">
            <span class="key">昵称: </span>
            {{ p.name }}
          </div>
          <div class="info">
            <span class="key">编号: </span>
            {{ p.index }}
          </div>
          <div class="info">
            <span class="key">角色: </span>
            {{ ChineseNames[p.character] }}
          </div>
        </div>
      </div>

      <h3>详细记录</h3>

      <PlayEventList
        v-for="(events, day) in record.groupedGameEvents"
        :key="day"
        :day="day"
        :events="events"
      ></PlayEventList>
    </div>

    <div v-else>
      未找到对局记录
    </div>

    <Btn
      :onClick="() => $router.push({ name: 'home' })"
      content="返回主页"
    ></Btn>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from "vue";
  import { ChineseNames } from "../../shared/GameDefs";
  import Btn from "../components/Btn.vue";
  import PlayEventList from "../components/PlayEventList.vue";

  import { useRecord } from "../reactivity/record";

  const ReviewDetail = defineComponent({
    name: "ReviewDetail",
    components: { PlayEventList, Btn },
    props: {
      roomNumber: { type: String, required: true },
      time: { type: Number, required: true },
    },
    setup(props) {
      const record = useRecord(props.roomNumber, props.time);
      return { record, ChineseNames };
    },
  });

  export default ReviewDetail;
</script>

<style lang="scss" scoped>
  .review-detail {
    padding: 1rem;
    .info {
      .key {
        font-weight: bold;
      }
    }

    .room-number,
    .time {
      margin: 0.5rem 0;
      font-size: 1.2rem;
    }
    .player-info {
      margin: 0.7rem 0;
    }

    .btn {
      margin: 2rem auto;
      display: block;
      text-align: center;
    }
  }
</style>
