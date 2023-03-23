<template>
  <div class="container">
    <h3>Add a mission:</h3>
    <div class="add">
      <form @submit="onSubmit">
        <input type="text" v-model="name" placeholder="Add Mission" />
        <input type="submit" value="Submit" />
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "AddMission",
  data() {
    return {
      name: "",
    };
  },
  methods: {
    ...mapActions(["addMission"]),
    onSubmit(e) {
      e.preventDefault();

      // No mission name entered handling
      if (!this.name) {
        alert("Please add a mission");
        return;
      }

      // add new mission
      this.addMission(this.name);

      // clear form
      this.name = "";
    },
  },
};
</script>

<style scoped>
form {
  display: flex;
}
.container {
  margin: 5px;
  margin-top: 30px;
  margin-bottom: 30px;
}
input[type="text"] {
  flex: 10;
  padding: 10px;
  border: 1px solid #1c3448;
  outline: 0;
}
input[type="submit"] {
  flex: 2;
  background: #1c3448;
  color: #fff;
  border: 1px #1c3448 solid;
  cursor: pointer;
}
</style>
© 2022 GitHub, Inc.
Terms
Privacy