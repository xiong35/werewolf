<template>
  <div class="avatar">
    <img
      class="icon"
      :src="`/src/assets/${character.toLowerCase()}${theme}.svg`"
      :alt="name"
    />
    <div class="info">{{ name }}</div>
    <!-- TODO change every thing into this -->
  </div>
</template>

<script lang="ts">
  import { defineComponent } from "vue";
  import { ChineseNames, SetableCharacters } from "../../shared/GameDefs";

  import { theme } from "../reactivity/theme";

  const Avatar = defineComponent({
    name: "Avatar",
    props: {
      character: { type: String, required: true },
    },
    setup(props) {
      const name = ChineseNames[props.character as SetableCharacters];

      return { theme, name };
    },
  });

  export default Avatar;
</script>


<style lang="scss" scoped>
  .avatar {
    width: 2rem;
    height: 2rem;
    display: inline-block;

    .icon {
      width: 100%;
    }
    .icon:hover + .info {
      opacity: 0.7;
    }

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
  }
</style>