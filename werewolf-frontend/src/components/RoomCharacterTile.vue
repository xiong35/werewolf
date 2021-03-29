<template>
  <div class="room-character-tile">
    <img
      :src="`/src/assets/${character.toLowerCase()}.svg`"
      :alt="character"
      class="character"
    />
    <div class="info">{{ name }}</div>
    <div class="controll">
      <div @click="setCharacter(character, -1)" class="down"></div>
      <div class="number">{{ num }}</div>
      <div @click="setCharacter(character, 1)" class="up"></div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, toRef } from "vue";

  import { setCharacter, characters } from "../reactivity/room";

  import { ChineseNames, SetableCharacters } from "../../shared/GameDefs";

  const RoomCharacter = defineComponent({
    name: "RoomCharacter",
    components: {},
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

    .info {
      opacity: 0;
      transition: opacity 0.2s;
      font-size: 0.6rem;
      position: absolute;
      top: -0.8rem;
      left: 0;
      right: 0;
      margin: auto;
      background-color: var(--on-bg);
      color: var(--bg);
      padding: 0.3rem;
      width: min-content;
      border-radius: 5px;
      word-break: keep-all;
      &::before {
        content: "";
        position: absolute;
        width: 0.5rem;
        height: 0.5rem;
        background-color: var(--on-bg);
        transform-origin: 50% 50%;
        left: 0;
        right: 0;
        margin: auto;
        transform: rotate(45deg);
        bottom: -12%;
      }
    }

    .character {
      width: 40%;
      margin: auto;
    }

    .character:hover + .info {
      opacity: 0.7;
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