<template>
  <div id="app">
    <div class="box">
      <h1>MIR 100 Missions</h1>
      <Missions />
    </div>
  </div>
</template>

<script>
import Missions from "./components/Missions.vue";

export default {
  name: "app",
  components: {
    Missions,
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400&display=swap");
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
body {
  font-family: "Poppins", sans-serif;
}
.box {
  max-width: 1200px;
  margin: 30px auto;
  overflow: auto;
  min-height: 800px;
  border: 10px solid lightsteelblue;
  padding: 30px;
  border-radius: 5px;
}
.btn {
  display: inline-block;
  background: #000;
  color: #fff;
  border: none;
  padding: 10px 20px;
  margin: 5px;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
  font-size: 15px;
  font-family: inherit;
}
.btn:focus {
  outline: none;
}
.btn:active {
  transform: scale(0.98);
}
.btn-block {
  display: block;
  background: #1c3448;
  width: 100%;
}
</style>