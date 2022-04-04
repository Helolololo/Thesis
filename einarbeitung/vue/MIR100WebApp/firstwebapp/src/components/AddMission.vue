<template>
  <form @submit="onSubmit" class="add-form">
    <div class="form-control">
      <label>Mission name</label>
      <input type="name" v-model="name" name="name" placeholder="Add Mission" />
    </div>
    <input type="submit" value="Save Mission" class="btn btn-block" />
  </form>
</template>

<script>
export default {
  name: "AddMission",
  data() {
    return {
      name: "",
    };
  },
  methods: {
    onSubmit(e) {
      e.preventDefault(); // prevent Default from happening

      if (!this.name) {
        alert("Please add a mission");
        return;
      }

      // add new mission
      const newMission = {
        id: Math.floor(Math.random() * 100000),
        name: this.name,
      };

      this.$emit("add-mission", newMission);

      // clear form
      this.text = "";
    },
  },
};
</script>

<style scoped>
.add-form {
  margin-bottom: 40px;
}
.form-control {
  margin: 20px 0;
}
.form-control label {
  display: block;
}
.form-control input {
  width: 100%;
  height: 40px;
  margin: 5px;
  padding: 3px 7px;
  font-size: 17px;
}
</style>