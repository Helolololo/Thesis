<template>
  <div class="mission">
    <h3>
      Name: {{ mission.name }}
      <i class="fas fa-trash-alt"></i>
    </h3>
    <p>GUID: {{ mission.id }}</p>
  </div>
</template>

<script>
export default {
  name: "Mission",
  props: {
    mission: Object,
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