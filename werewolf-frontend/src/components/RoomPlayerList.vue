<template>
  <div class="room-player-list">
    <div
      v-for="item in playerList"
      :key="item.index"
      class="player"
    >
      <div
        v-if="item.name !== undefined"
        class="box"
        :style="{ cursor: isActing ? 'pointer' : 'inherit' }"
        :class="{
          isDead: !item.isAlive,
          isChosen: item.index === target && isActing,
        }"
        @click="
          () => setTarget(target === item.index ? 0 : item.index)
        "
      >
        {{
          item.name.slice(0, 3) +
          (item.name.length > 3 ? "..." : "")
        }}
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
          :class="{ isDying: item.isDying }"
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
  import { defineComponent, computed, PropType } from "vue";
  import { PublicPlayerDef } from "../../shared/ModelDefs";

  import {
    setTarget,
    isActing,
    target,
  } from "../reactivity/playAction";

  import { theme } from "../reactivity/theme";

  const RoomPlayerList = defineComponent({
    name: "RoomPlayerList",
    props: {
      playerList: {
        type: Object as PropType<PublicPlayerDef[]>,
        required: true,
      },
    },
    components: {},
    setup(props) {
      return { theme, setTarget, target, isActing };
    },
  });

  export default RoomPlayerList;
</script>

<style lang="scss">
  .room-player-list {
    display: flex;
    flex-wrap: wrap;
    .player {
      display: flex;
      margin: 5% 0;
      flex: 1 1 33%;
      justify-content: center;
      .box {
        $size: 6rem;
        width: $size;
        height: $size;

        display: flex;
        align-items: center;
        justify-content: center;

        border-radius: 5px;
        border: 2px solid;
        background-color: var(--secondary);
        position: relative;
        $icon-size: 0.25 * $size;
        font-size: 1.5rem;
        .index,
        .sherrif,
        .dead {
          position: absolute;
          width: $icon-size;
          height: $icon-size;
          text-align: center;
          box-sizing: border-box;
          &.isDying {
            @keyframes shine {
              from {
                opacity: 0;
              }
              to {
                opacity: 1;
              }
            }
            animation: shine 0.7s linear infinite alternate;
          }
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
      .box.isChosen {
        filter: brightness(1.7);
        box-shadow: var(--on-bg) 2px 2px 0px 0px;
      }
    }
  }
</style>
