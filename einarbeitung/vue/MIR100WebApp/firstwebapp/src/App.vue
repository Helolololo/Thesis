<template>
  <div class="box">
    <Header
      @toggle-add-mission="toggleAddMission"
      title="MIR 100 Missions"
      :showMission="showMission"
    />
    <div v-show="showMission">
      <AddMission @add-mission="addMission" />
    </div>

    <Missions @delete-mission="deleteMission" :missions="missions" />
  </div>
</template>

<script>
import Header from "./components/Header";
import Missions from "./components/Missions";
import AddMission from "./components/AddMission";

export default {
  name: "App",
  components: {
    Header,
    Missions,
    AddMission,
  },
  data() {
    return {
      missions: [],
      showMission: false,
    };
  },
  methods: {
    toggleAddMission() {
      this.showMission = !this.showMission;
    },
    async fetchMissions() {
      const res = await fetch("http://localhost:5000/missions");
      const data = await res.json();

      return data;
    },
    async fetchMission(id) {
      const res = await fetch(`http://localhost:5000/missions/${id}`);
      const data = await res.json();

      return data;
    },
    async addMission(mission) {
      const res = await fetch("http://localhost:5000/missions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(mission),
      });

      const data = await res.json();

      this.missions = [...this.missions, data];
    },

    async deleteMission(id) {
      if (confirm("Delete the task")) {
        const res = await fetch(`http://localhost:5000/missions/${id}`, {
          method: "DELETE",
        });

        res.status === 200
          ? (this.missions = this.missions.filter(
              (mission) => mission.id !== id
            )) // show every mission except the deleted one
          : alert("Error can not delete the mission");
      }
    },
  },
  async created() {
    // life-cycle method used for http requests
    this.missions = await this.fetchMissions();
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
