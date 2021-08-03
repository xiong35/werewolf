<template>
  <div class="review-detail">
    {{ record }}
  </div>
</template>

<script lang="ts">
  import { defineComponent } from "vue";
  import { useRecord } from "../reactivity/record";

  const ReviewDetail = defineComponent({
    name: "ReviewDetail",
    components: {},
    props: {
      roomNumber: { type: String, required: true },
      time: { type: Number, required: true },
    },
    setup(props) {
      const record = useRecord(props.roomNumber, props.time);

      return { record };
    },
  });

  export default ReviewDetail;
</script>

<style lang="scss" scoped>
  .review-detail {
  }
</style>
