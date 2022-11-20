<template>
  <div v-show="isLoggedIn">
    <WelcomeBar />
    <div>
      <div class="container">
        <div style="display: flex">
          <div v-show="showBuildings" class="container-title">
            Buildings
            <!-- <div title="Create building">
              <add-icon @click="handleOpenBuildingPopup" class="addButton" />
            </div> -->
          </div>
          <div class="button-div">
            <!-- <BackButton
              v-show="showWindows"
              :buttonText="'←Back'"
              :activePage="'windows'"
              @redirectAction="onRedirectAction"
            /> -->
          </div>
        </div>
        <hr />
        <div class="spinner-div" v-show="loadingReservations">
          <fulfilling-bouncing-circle-spinner
            :animation-duration="4000"
            :size="40"
            color="hsla(160, 100%, 37%, 1)"
          />
        </div>
        <div>
          <!-- <Building
            :remoteCall="remoteCall"
            :deleteFromEntity="deleteFromEntity"
            :building="building"
            @toggleChild="toggleChild"
          /> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BackButton from "./BackButton.vue";
import WelcomeBar from "./WelcomeBar.vue";
import {
  CreateWindowPopup,
  CreateBuildingPopup,
  CreateRoomPopup,
  CreateHeaterPopup,
} from "./popups";
import { Room, Building, Window, Heater } from "./display-entities";
import { FulfillingBouncingCircleSpinner } from "epic-spinners";
import AddIcon from "vue-material-design-icons/PlusBoxOutline.vue";
import Toggle from "@vueform/toggle";
export default {
  props: {
    loadingReservations: Boolean,
  },
  components: {
    Building,
    Toggle,
    BackButton,
    FulfillingBouncingCircleSpinner,
    AddIcon,
  },
  data() {
    return {
      activeBuilding: {},
      buildings: [],
      buildingPopupOpen: false,
      buildingConfirmDisable: false,
      roomPopupOpen: false,
      roomConfirmDisable: false,
      windowPopupOpen: false,
      windowConfirmDisable: false,
      heaterPopupOpen: false,
      heaterConfirmDisable: false,
      loadingBuildings: true,
      globalHeatersValue: false,
      toggleHeatersdisabled: false,
      globalWindowsValue: false,
      toggleWindowsdisabled: false,
      rooms: [],
      activeRoom: {},
      heaters: [],
      activeHeater: {},
      windows: [],
      activeWindow: {},
      showBuildings: true,
      showRooms: false,
      showRoom: false,
      showHeaters: false,
      showHeater: false,
      showWindows: false,
      showWindow: false,
      disableToogle: false,
    };
  },

  watch: {
    isLoggedIn(newVal) {
      if (newVal) {
        this.getInitialBuildings();
      }
    },
    windows: {
      handler(newWindows) {
        let total = 0;
        let open = 0;
        if (Array.isArray(newWindows) && newWindows.length > 0)
          newWindows.forEach((window) => {
            if (window.roomId === this.activeRoom.id) {
              total = total + 1;
              if (window.windowStatus === "OPEN") {
                open = open + 1;
              }
            }
          });
        if (total === open) {
          this.globalWindowsValue = true;
        } else {
          this.globalWindowsValue = false;
        }
      },
      deep: true,
    },
    heaters: {
      handler(newHeaters) {
        let total = 0;
        let open = 0;
        if (Array.isArray(newHeaters) && newHeaters.length > 0)
          newHeaters.forEach((heater) => {
            if (heater.roomId === this.activeRoom.id) {
              total = total + 1;
              if (heater.heaterStatus === "ON") {
                open = open + 1;
              }
            }
          });
        if (total === open) {
          this.globalHeatersValue = true;
        } else {
          this.globalHeatersValue = false;
        }
      },
      deep: true,
    },
  },
  methods: {
    handleCloseBuildingPopup() {
      this.buildingPopupOpen = false;
    },
    handleOpenBuildingPopup() {
      this.buildingPopupOpen = true;
    },
    handleCreateNewBuilding(building) {
      const url = `${this.$server_base_url}buildings`;
      const method = this.$POST;
      this.buildingConfirmDisable = true;
      this.remoteCall(url, method, building)
        .then((data) => {
          this.buildings = [...this.buildings, data];
          this.handleCloseBuildingPopup();
        })
        .catch(() => {
          this.$notify({
            title: "Error",
            text: "Error occured while creating new building",
            type: "error",
          });
        })
        .finally(() => (this.buildingConfirmDisable = false));
    },
    handleCloseRoomPopup() {
      this.roomPopupOpen = false;
    },
    handleOpenRoomPopup() {
      this.roomPopupOpen = true;
    },
    handleCreateNewRoom(room) {
      const url = `${this.$server_base_url}rooms`;
      const method = this.$POST;
      this.roomConfirmDisable = true;
      this.remoteCall(url, method, {
        ...room,
        buildingId: this.activeBuilding.id,
      })
        .then((data) => {
          this.rooms = [...this.rooms, data];
          this.handleCloseRoomPopup();
        })
        .catch(() => {
          this.$notify({
            title: "Error",
            text: "Error occured while creating new room",
            type: "error",
          });
        })
        .finally(() => (this.roomConfirmDisable = false));
    },

    handleCloseWindowPopup() {
      this.windowPopupOpen = false;
    },
    handleOpenWindowPopup() {
      this.windowPopupOpen = true;
    },
    handleCreateNewWindow(window) {
      const url = `${this.$server_base_url}windows`;
      const method = this.$POST;
      this.windowConfirmDisable = true;
      this.remoteCall(url, method, {
        ...window,
        roomId: this.activeRoom.id,
      })
        .then((data) => {
          this.windows = [...this.windows, data];
          this.handleCloseWindowPopup();
        })
        .catch(() => {
          this.$notify({
            title: "Error",
            text: "Error occured while creating new window",
            type: "error",
          });
        })
        .finally(() => (this.windowConfirmDisable = false));
    },
    handleCloseHeaterPopup() {
      this.heaterPopupOpen = false;
    },
    handleOpenHeaterPopup() {
      this.heaterPopupOpen = true;
    },
    handleCreateNewHeater(newHeater) {
      const url = `${this.$server_base_url}heaters`;
      const method = this.$POST;
      this.heaterConfirmDisable = true;
      this.remoteCall(url, method, {
        roomId: this.activeRoom.id,
        ...newHeater,
        power: newHeater.heaterPower,
      })
        .then((data) => {
          this.heaters = [...this.heaters, data];
          this.handleCloseHeaterPopup();
        })
        .catch(() => {
          this.$notify({
            title: "Error",
            text: "Error occured while creating new heater",
            type: "error",
          });
        })
        .finally(() => (this.heaterConfirmDisable = false));
    },
    async getInitialBuildings() {
      const url = `${this.$server_base_url}buildings`;
      const method = this.$GET;
      this.remoteCall(url, method).then((data) => {
        if (data.length > 0 && data.id !== null) {
          this.buildings = data;
          this.loadingBuildings = false;
        }
      });
    },
    async reloadEntity(entityName) {
      const url = `${this.$server_base_url}${entityName}`;
      const method = this.$GET;
      const response = await this.remoteCall(url, method);
      if (response) {
        this[entityName] = response;
        return true;
      }
    },

    async deleteFromEntity(entityName, id) {
      let newEntities = this[entityName].filter((entity) => entity.id !== id);
      this[entityName] = newEntities;
      return true;
    },

    async remoteToggleEntity(entityName, id) {
      const url = `${this.$server_base_url}${entityName}/${id}/switch`;
      const method = this.$PUT;
      const response = await this.remoteCall(url, method);
      return response;
    },
    async remoteToggleWindows() {
      const url = `${this.$server_base_url}rooms/${this.activeRoom.id}/switchWindows`;
      const method = this.$PUT;
      this.toggleWindowsdisabled = true;
      this.remoteCall(url, method)
        .then(() => {
          this.windows = this.windows.map((window) => {
            if (window.roomId === this.activeRoom.id) {
              window.windowStatus =
                window.windowStatus === "OPEN" ? "CLOSED" : "OPEN";
              return window;
            }
            return window;
          });
        })
        .catch(() => {
          this.$notify({
            title: "Error",
            text: "Error occured while switching windows statuses in the room",
            type: "error",
          });
        })
        .finally(() => {
          this.toggleWindowsdisabled = true;
        });
    },
    async remoteToggleHeaters() {
      this.toggleHeatersdisabled = true;
      const url = `${this.$server_base_url}rooms/${this.activeRoom.id}/switchHeaters`;
      const method = this.$PUT;
      this.remoteCall(url, method)
        .then(() => {
          this.heaters = this.heaters.map((heater) => {
            if (heater.roomId === this.activeRoom.id) {
              heater.heaterStatus = heater.heaterStatus === "ON" ? "OFF" : "ON";
              return heater;
            }
            return heater;
          });
        })
        .catch(() => {
          this.$notify({
            title: "Error",
            text: "Error occured while switching heaters statuses in the room",
            type: "error",
          });
        })
        .finally(() => {
          this.toggleHeatersdisabled = false;
        });
    },
    async onRedirectAction(activeScreen) {
      if (!activeScreen) {
        // return to home page
        this.activeBuilding = parent;
        this.showBuildings = false;
        this.rooms = buildingRooms;
        this.showRooms = true;
        router.push("home");
      }
      if (activeScreen === "rooms") {
        // go to buildings
        this.toggleChild("rooms", false, "buildings");
      }
      if (activeScreen === "windows") {
        // go to rooms
        this.toggleChild("windows", false, "rooms");
      }
    },
    async toggleChild(childName, status, parent = null) {
      if (this.disableToogle) {
        return;
      }
      if (childName === "rooms") {
        if (status) {
          //   fetchrooms
          if (parent) {
            const url = `${this.$server_base_url}rooms`;
            const method = this.$GET;
            const response = await this.remoteCall(url, method);
            if (response) {
              if (response.length > 0) {
                let buildingRooms = response.filter(
                  (room) => room.buildingId == parent.id
                );
                this.activeBuilding = parent;
                this.showBuildings = false;
                this.rooms = buildingRooms;
                this.showRooms = true;
              }
            }
          }
        } else {
          //   back to buildings
          this.activeBuilding = {};
          this.showBuildings = true;
          this.rooms = [];
          this.showRooms = false;
        }
      } else if (childName === "windows") {
        if (status) {
          //   fetch window
          if (parent) {
            const url = `${this.$server_base_url}windows`;
            const heaterUrl = `${this.$server_base_url}heaters`;
            const method = this.$GET;
            const response = await this.remoteCall(url, method);
            const heaterResponse = await this.remoteCall(heaterUrl, method);
            if (response) {
              if (response.length > 0) {
                let roomWindows = response.filter(
                  (window) => window.roomId == parent.id
                );
                this.activeRoom = parent;
                this.showRooms = false;
                this.windows = roomWindows;
                this.showWindows = true;
              }
            }

            if (heaterResponse) {
              if (heaterResponse.length > 0) {
                let roomHeaters = heaterResponse.filter(
                  (heater) => heater.roomId == parent.id
                );
                this.activeRoom = parent;
                this.showRooms = false;
                this.heaters = roomHeaters;
                this.showHeaters = true;
              }
            }
          }
        } else {
          //   back to rooms
          this.activeRoom = {};
          this.showRooms = true;
          this.windows = [];
          this.showWindows = false;
          this.heaters = [];
          this.showHeaters = false;
        }
      }
    },

    async remoteCall(url, method, payload) {
      this.disableToogle = true;
      const res = await fetch(url, {
        method,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Basic " + this.credentials,
        },
        body: payload ? JSON.stringify(payload) : undefined,
      });
      try {
        let data = await res.json();
        data.responseStatus = res.status;
        this.disableToogle = false;
        return data;
      } catch (err) {
        // likey no response
        let data = {};
        data.responseStatus = res.status;
        this.disableToogle = false;
        return data;
      }
    },
  },
  created() {},
  setup() {},
};
</script>

<style scoped>
.addButton {
  color: hsla(160, 100%, 37%, 1);
  height: 24px;
  cursor: pointer;
  padding-right: 8px;
}
.container {
  border: 1px solid gray;
  border-radius: 4px;
  padding: 2rem;
}

.container-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: large;
  width: 100%;
  padding: 0px 0px 5px 0px;
}
.title {
  width: calc(100% - 60px);
}
.button-div {
  display: block;
  margin-left: auto;
  margin-bottom: 0.5rem;
}
.spinner-div {
  margin: 1rem;
}
.windows-and-heaters {
  display: flex;
}

@media screen and (min-width: 20em) and (max-width: 594px) {
  /* .heater-child:first-child { */
  .windows-and-heaters {
    display: block;
  }
  .wind .heat {
    width: 100%;
    /* display: block; */
    /* width: calc(50% - 0.5em); */
  }
}
</style>
