<template>
  <header>
    <h1>{{ title }}</h1>
    <Button
      @button-click="$emit('toggle-add-mission')"
      :text="showMission ? 'Close' : 'Add Mission'"
      :color="showMission ? 'lightslategray' : '#1c3448'"
    />
  </header>
</template>

<script>
import Button from "./Button";

export default {
  name: "Header",
  props: {
    title: String,
    showMission: Boolean,
  },
  components: {
    Button,
  },
};
</script>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
</style>