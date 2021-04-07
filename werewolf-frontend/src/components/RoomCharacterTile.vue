<template>
  <div class="room-character-tile">
    <Avatar :character="character"></Avatar>
    <div class="controll">
      <div @click="setCharacter(character, -1)" class="down"></div>
      <div class="number">{{ num }}</div>
      <div @click="setCharacter(character, 1)" class="up"></div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, toRef } from "vue";

  import { setCharacter, characters } from "../reactivity/createRoom";

  import { ChineseNames, SetableCharacters } from "../../shared/GameDefs";

  import Avatar from "./Avatar.vue";

  const RoomCharacter = defineComponent({
    name: "RoomCharacter",
    components: { Avatar },
    props: {
      character: { type: String, required: true },
    },
    setup(props) {
      const num = toRef(characters, props.character as SetableCharacters);
      const name = ChineseNames[props.character as SetableCharacters];
      return { setCharacter, name, num };
    },
  });

  export default RoomCharacter;
</script>


<style lang="scss" scoped>
  .room-character-tile {
    $size: 0.6rem;
    position: relative;
    text-align: center;

    .avatar {
      width: 40%;
    }

    .controll {
      display: flex;
      justify-content: space-around;

      .up,
      .down {
        box-sizing: border-box;
        color: var(--on-bg);
        cursor: pointer;
        border: $size solid transparent;
        border-bottom-color: currentColor;
        width: $size;
        height: $size;
        position: relative;

        &::before {
          content: "";
          position: absolute;
          background-color: var(--bg);
          width: $size * 0.3;
          height: $size * 0.3;
          border-radius: 50%;
          top: $size * 0.3;
          left: $size * 0.2;
        }
      }
      .up {
        transform: rotate(90deg);
      }
      .down {
        transform: rotate(-90deg);
      }
      .number {
        line-height: $size * 2;
        font-weight: bold;
      }
    }
  }
</style>