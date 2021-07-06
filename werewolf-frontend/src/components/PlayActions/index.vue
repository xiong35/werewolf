<script lang="ts">
  import { defineComponent, h, withDirectives, vShow } from "vue";

  import { showActions } from "../../reactivity/playPage";

  import { renderActionList } from "./renderActionList";

  import UseMenu from "../UseMenu.vue";
  import { character } from "../../reactivity/game";

  const PlayActions = defineComponent({
    name: "PlayActions",
    render() {
      const dialogVNode = h(
        UseMenu,
        {
          onCancel: () => (showActions.value = false),
        },
        () =>
          h(
            "div",
            { class: "play__action-list" },
            renderActionList()
          )
      );
      return withDirectives(dialogVNode, [
        [vShow, showActions.value],
      ]);
    },
  });

  export default PlayActions;
</script>

<style lang="scss">
  .play__action-list {
    display: flex;
    flex-direction: column;
    .btn {
      margin: 8px;
    }
  }
</style>
