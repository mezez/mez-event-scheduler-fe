<template>
  <div class="availaibility">
    <div class="availaibility-child">
      <div class="availaibility-box-title">From {{ availability.start }}</div>
    </div>
    <div class="availaibility-child">
      <div class="availaibility-box-title">To {{ availability.end }}</div>
    </div>
    <div class="availaibility-child">
      <div class="availaibility-box-title">
        {{ availability.reserved ? "Booked" : "Available" }}
      </div>
    </div>
    <div class="availaibility-child availaibility-child-actions">
      <div v-show="availability.reserved == false">
        <div @click="showEmail = true" class="reserve">Book</div>
      </div>
    </div>
  </div>
  <div v-show="showEmail" style="padding: 0.5rem; display: flex">
    <div>
      <input
        v-model="email"
        class="input textInput"
        placeholder="Please enter your email"
        type="email"
        id="emal"
        name="emal"
        required
      />
    </div>
    <div
      @click="reserveAction"
      style="margin-left: 0.5rem; color: azure; cursor: pointer"
    >
      Save Booking |
    </div>

    <div
      @click="
        showEmail = false;
        email = '';
      "
      style="margin-left: 0.5rem; color: gray; cursor: pointer"
    >
      Cancel
    </div>
  </div>
</template>

<script>
import Toggle from "@vueform/toggle";
export default {
  name: "availaibility",
  props: {
    availability: Object,
    bookSlot: Function,
  },
  components: {
    // Toggle,
  },
  methods: {
    async reserveAction() {
      if (this.email.length > 3 && this.email.includes("@")) {
        // create reservation
        const res = await this.bookSlot(this.availability.id, this.email);
        if (res) {
          if (res.status_code === 200) {
            this.availability.reserved = true;
            this.showEmail = false;
            this.email = "";
          }
        }
      }
    },

    async formatTime() {
      try {
        if (this.availability.start.toString().length === 3) {
          this.availability.start =
            (await this.availability.start.toString().substr(0, 1)) +
            ":" +
            this.availability.start.toString().substr(1);
        } else if (this.availability.start.toString().length === 4) {
          this.availability.start =
            (await this.availability.start.toString().substr(0, 2)) +
            ":" +
            this.availability.start.toString().substr(2);
        }

        if (this.availability.end.toString().length === 3) {
          this.availability.end =
            (await this.availability.end.toString().substr(0, 1)) +
            ":" +
            this.availability.end.toString().substr(1);
        } else if (this.availability.end.toString().length === 4) {
          this.availability.end =
            (await this.availability.end.toString().substr(0, 2)) +
            ":" +
            this.availability.end.toString().substr(2);
        }
      } catch (error) {
        console.log("Failed to format availability");
      }
    },
  },
  async beforeMount() {
    await this.formatTime();
  },
  data() {
    return {
      showEmail: false,
      email: "",
    };
  },
  watch: {},
};
</script>

<style scoped>
.availaibility {
  background: #251a1a;
  color: var(--vt-c-text-dark-2);
  margin: 5px;
  padding: 10px 10px;
  display: flex;
}
.availaibility-child {
  width: 25%;
  min-height: 50px;
  padding: 1rem 2rem;
  border: 1px solid gray;
  margin: 1rem;
  border-radius: 5px;
}
/*  */
@media screen and (min-width: 20em) and (max-width: 880px) {
  .availaibility-child {
    width: 100%;
  }

  .availaibility {
    display: block;
    width: 15em;
    padding: 1px 1px;
  }
}

.availaibility-box-title {
  font-weight: bold;
}

.availaibility-child-actions {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #52bc92;
}

.reserve {
  cursor: pointer;
}

.input {
  color: white;
  font-size: 14px;
  margin-bottom: 8px;
}
.textInput {
  display: block;
  width: 100%;
  height: 40px;
  padding-left: 8px;
  border-radius: 5px;
  background: rgb(18, 18, 18);
  border-color: hsla(160, 100%, 37%, 1);
}
</style>
