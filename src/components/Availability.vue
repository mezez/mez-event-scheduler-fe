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
        <div @click="reserveAction" class="reserve">Book</div>
        <!-- <Toggle
          v-model="availaibilityValue"
          @change="toggleAction"
          :diabled="toggledisabled"
        /> -->
      </div>
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
      //   update remotely
      const res = await this.bookSlot(this.availability.id, "cve@gmail.com");
      if (res) {
        if (res.message === "successful") {
          this.availability.reserved = true;
        }
      }
    },
  },
  setup() {},
  data() {
    return {};
  },
  watch: {
    //   "availaibility.availaibilityStatus"(newVal) {
    //     if (newVal === "ON") {
    //       this.availaibilityValue = true;
    //     } else {
    //       this.availaibilityValue = false;
    //     }
    //   },
    // },
    // async created() {
    //   if (this.availaibility.availaibilityStatus === "ON") {
    //     this.availaibilityValue = true;
    //   } else {
    //     this.availaibilityValue = false;
    //   }
  },
};
</script>

<style scoped>
.availaibility {
  background: #251a1a;
  color: var(--vt-c-text-dark-2);
  margin: 5px;
  padding: 10px 10px;
  /* cursor: pointer; */
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
  /* .availaibility-child:first-child { */
  .availaibility-child {
    width: 100%;
    /* display: block; */
    /* width: calc(50% - 0.5em); */
  }

  .availaibility {
    display: block;
    width: 15em;
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
.availaibility-child-delete-button {
  padding-top: 20px;
}
</style>
