<template>
  <div class="spinner-div" v-show="loadingAvailabilities">
    <fulfilling-bouncing-circle-spinner
      :animation-duration="4000"
      :size="40"
      color="hsla(160, 100%, 37%, 1)"
    />
  </div>
  <div v-show="loadingAvailabilities == false">
    <WelcomeBar />
    <div>
      <div class="container">
        <!-- <v-calendar /> -->
        <v-date-picker v-model="date" mode="date" />
        <div class="avail">
          <div :key="availability.id" v-for="availability in availabilties">
            <!-- <Availability
                :window="window"
                @toggleChild="toggleChild"
                :remoteToggleEntity="remoteToggleEntity"
                :remoteCall="remoteCall"
                :deleteFromEntity="deleteFromEntity"
              /> -->
            <Availability :availability="availability" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { FulfillingBouncingCircleSpinner } from "epic-spinners";
import Availability from "./Availability.vue";
export default {
  props: {
    // loadingAvailabilities: Boolean,
  },
  components: {
    FulfillingBouncingCircleSpinner,
    Availability,
  },
  data() {
    return {
      date: new Date(),
      loadingAvailabilities: true,
      availabilties: [],
    };
  },

  methods: {
    async loadAvailabilities() {
      const res = await fetch(
        `${
          this.$server_base_url
        }availabilities-by-date/${this.date.getDate()}/${
          this.date.getMonth() + 1
        }/${this.date.getFullYear()}`,
        {
          method: this.$GET,
          headers: {},
        }
      );

      const data = await res.json();
      if (data) {
        console.log(data);
        this.availabilties = data;
        this.loadingAvailabilities = false;
      }
    },
  },

  async mounted() {
    if (this.date) {
      await this.loadAvailabilities();
    }
  },

  watch: {
    date: {
      async handler(newDate) {
        await this.loadAvailabilities();
      },
      deep: true,
    },
  },
};
</script>

<style scoped>
.avail {
  color: hsla(160, 100%, 37%, 1);
  margin-left: 1em;
  padding: 1em;
  width: 100%;
  overflow-y: scroll;
  border: 1px solid white;
}
.container {
  border: 1px solid gray;
  border-radius: 4px;
  padding: 2rem;
  display: flex;
}

.container-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: large;
  width: 100%;
  padding: 0px 0px 5px 0px;
}
.spinner-div {
  margin: 1rem;
}

@media screen and (min-width: 20em) and (max-width: 594px) {
}
</style>
