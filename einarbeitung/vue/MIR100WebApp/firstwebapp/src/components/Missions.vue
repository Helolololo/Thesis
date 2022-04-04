<template>
  <div :key="mission.id" v-for="mission in missions">
    <Mission :mission="mission" />
  </div>
</template>

<script>
import Mission from "./Mission";

export default {
  name: "Missions",
  props: {
    missions: Array,
  },
  components: {
    Mission,
  },
};
</script>

<style>
</style>