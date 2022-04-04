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
    addMission(mission) {
      this.missions = [...this.missions, mission];
    },
    deleteMission(id) {
      if (confirm("Delete the task")) {
        this.missions = this.missions.filter((mission) => mission.id !== id); // show every mission except the deleted one
        console.log(this.mission);
      }
    },
  },
  created() {
    // life-cycle method used for http requests
    this.missions = [
      {
        id: "6e8dbeaa-79f2-11ec-95f0-94c691a3e2dc",
        name: "Laden fahren",
        url: "/v2.0.0/missions/6e8dbeaa-79f2-11ec-95f0-94c691a3e2dc",
      },
      {
        id: "56f192d2-a45b-11ec-8ad2-94c691a3e2dc",
        name: "Gebinde Aufnahme Abgabe Test",
        url: "/v2.0.0/missions/56f192d2-a45b-11ec-8ad2-94c691a3e2dc",
      },
      {
        id: "ad397606-a5bd-11ec-afc4-94c691a3e2dc",
        name: "Gebindeabgabe",
        url: "/v2.0.0/missions/ad397606-a5bd-11ec-afc4-94c691a3e2dc",
      },
    ];
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
