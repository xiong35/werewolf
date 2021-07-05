<script lang="ts">
  import { defineComponent, h, withDirectives, vShow } from "vue";

  import { showActions } from "../../reactivity/playPage";

  import { char2Action } from "./char2Action";

  import UseMenu from "../UseMenu.vue";
  import { character } from "../../reactivity/game";

  const PlayActions = defineComponent({
    name: "PlayActions",
    components: {
      UseMenu,
    },
    render() {
      const dialogVNode = h(
        UseMenu,
        {
          onCancel: () => (showActions.value = false),
        },
        () => h(char2Action[character.value] || "div")
      );
      return withDirectives(dialogVNode, [
        [vShow, showActions.value],
      ]);
    },
  });

  export default PlayActions;
</script>

<style lang="scss" scoped>
  .use-menu {
  }
</style>
