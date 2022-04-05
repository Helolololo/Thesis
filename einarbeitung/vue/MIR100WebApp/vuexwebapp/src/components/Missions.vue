<template>
  <div>
    <div class="missions">
      <div v-for="mission in allMissions" :key="mission.id" class="mission">
        <h3>Name: {{ mission.name }}</h3>
        <p>GUID: {{ mission.id }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Missions",
  methods: {
    ...mapActions(["fetchMissions"]),
  },
  computed: mapGetters(["allMissions"]),
  // life-cylce method
  created() {
    this.fetchMissions();
  },
};
</script>

<style scope >
i {
  color: lightslategray;
  cursor: pointer;
}
.mission {
  background: #f4f4f4;
  margin: 5px;
  padding: 15px 20px;
  cursor: pointer;
}
.mission h3 {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>