<template>
  <div class="roomplayerlist">
    <div v-for="item in playerList" :key="item.index" class="player">
      <div
        v-if="item.name !== undefined"
        class="box"
        :class="{ isDead: !item.isAlive }"
      >
        {{ item.name.slice(0, 3) + (item.name.length > 3 ? "..." : "") }}
        <div class="index">
          <span class="index-content">{{ item.index }}</span>
        </div>
        <img
          v-show="item.isSheriff"
          alt="警长"
          :src="`/src/assets/sheriff${theme}.svg`"
          class="sherrif"
        />
        <img
          class="dead"
          v-show="!item.isAlive"
          alt="骷髅"
          :src="`/src/assets/dead${theme}.svg`"
        />
      </div>
      <div v-else class="box empty">
        <span class="index">{{ item.index }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from "vue";

  import { playerList } from "../reactivity/players";

  import { theme } from "../reactivity/theme";

  const RoomPlayerList = defineComponent({
    name: "RoomPlayerList",
    components: {},
    setup(props) {
      return { playerList, theme };
    },
  });

  export default RoomPlayerList;
</script>


<style lang="scss" scoped>
  .roomplayerlist {
    display: flex;
    flex-wrap: wrap;
    .player {
      display: flex;
      margin: 5% 0;
      flex: 1 1 33%;
      justify-content: center;
      .box {
        $size: 20vmin;
        width: $size;
        height: $size;
        line-height: $size;
        text-align: center;
        border-radius: 5px;
        border: 2px solid;
        background-color: var(--secondary);
        position: relative;
        $icon-size: 0.25 * $size;
        font-size: 4.5vmin;
        .index,
        .sherrif,
        .dead {
          position: absolute;
          width: $icon-size;
          height: $icon-size;
          text-align: center;
          box-sizing: border-box;
        }
        $offset: -0.5 * $icon-size;

        .index {
          top: $offset;
          left: $offset;
          border: 1px solid;
          font-size: 0.5em;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          .index-content {
            background-color: transparent;
            line-height: 1em;
          }
        }
        .dead {
          bottom: $offset;
          right: $offset;
          background-color: transparent;
        }
        .sherrif {
          top: $offset;
          right: $offset;
          background-color: transparent;
        }
      }
      .box.empty {
        background-color: rgb(131, 131, 131);
        opacity: 30%;
      }
      .box.isDead {
        opacity: 50%;
      }
    }
  }
</style>