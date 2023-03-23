<template>
  <div v-for="mission in missions" :key="mission.id">
    <Mission
      @delete-mission="$emit('delete-mission', mission.id)"
      :mission="mission"
    />
  </div>
</template>

<script>
import Mission from "./Mission";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Missions",
  props: {
    missions: Array,
  },
  components: {
    Mission,
  },
  emits: ["delete-mission"],
  computed: mapGetters(["showMissions"]),
};
</script>

<style>
</style>