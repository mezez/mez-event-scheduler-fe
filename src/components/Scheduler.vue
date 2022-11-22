<template>
  <div class="spinner-div" v-show="loadingAvailabilities">
    <fulfilling-bouncing-circle-spinner
      :animation-duration="4000"
      :size="40"
      color="hsla(160, 100%, 37%, 1)"
    />
  </div>
  <div v-show="loadingAvailabilities == false">
    <div>
      <div class="container">
        <v-date-picker v-model="date" mode="date" />
        <div class="avail">
          <h4 v-show="availabilties.length == 0">No slots available</h4>
          <div :key="availability.id" v-for="availability in availabilties">
            <Availability :availability="availability" :bookSlot="bookSlot" />
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
  props: {},
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
      try {
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
          if (Array.isArray(data)) {
            this.availabilties = data;
            this.loadingAvailabilities = false;
          }
        }
      } catch (error) {
        console.log("Error occurred while fetching");
      }
    },

    async bookSlot(availability_id, email) {
      try {
        const res = await fetch(`${this.$server_base_url}reservations/create`, {
          method: this.$POST,
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: `reservervation for ${email}`,
            email,
            availability_id,
          }),
        });

        const data = await res.json();
        if (data) {
          return data;
        }
      } catch (error) {
        console.log("Error occurred while booking slot");
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
        if (newDate.getTime() > new Date().getTime()) {
          await this.loadAvailabilities();
        } else {
          this.availabilties = [];
        }
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
  max-height: 30rem;
  overflow-y: scroll;
  border: 1px solid white;
}
.container {
  border: 1px solid gray;
  border-radius: 4px;
  padding: 2rem;
  display: flex;
}
.spinner-div {
  margin: 1rem;
}

@media screen and (min-width: 20em) and (max-width: 594px) {
}
</style>
