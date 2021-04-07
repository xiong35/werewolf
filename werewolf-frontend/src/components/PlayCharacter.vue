<template>
  <UseMenu v-show="showCharacter" :onCancel="() => (showCharacter = false)">
    <Avatar :character="character"></Avatar>
    <div class="character">
      你的身份是：<span class="character-name">{{ name }}</span>
    </div>
    <p class="intro">{{ intro }}</p>
  </UseMenu>
</template>

<script lang="ts">
  import { defineComponent, computed } from "vue";

  import { character } from "../reactivity/game";
  import { showCharacter } from "../reactivity/playPage";
  import { ChineseNames, CharacterIntro } from "../../shared/GameDefs";

  import UseMenu from "./UseMenu.vue";
  import Avatar from "./Avatar.vue";

  const PlayCharacter = defineComponent({
    name: "PlayCharacter",
    components: {
      UseMenu,
      Avatar,
    },
    setup(props) {
      const name = computed(() => ChineseNames[character.value]);
      const intro = computed(() => CharacterIntro[character.value]);

      return {
        character,
        name,
        intro,
        showCharacter,
      };
    },
  });

  export default PlayCharacter;
</script>


<style lang="scss" scoped>
  .use-menu {
    text-align: center;
    .avatar {
      width: 40%;
    }
    .character {
      font-size: 1.2rem;
      margin: 1rem;
      .character-name {
        font-weight: bold;
      }
    }
    .intro {
      text-align: left;
    }
  }
</style>