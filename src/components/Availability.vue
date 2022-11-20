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
        Book
        <!-- <Toggle
          v-model="availaibilityValue"
          @change="toggleAction"
          :diabled="toggledisabled"
        /> -->
      </div>
      <!-- <div class="availaibility-child-delete-button">
        <Delete
          :deleteAction="remoteCall"
          :deleteUrl="deleteUrl"
          :disabled="toggledisabled"
          :updateEntities="deleteFromEntity"
          :entities="'availaibilitys'"
          :itemId="availaibility.id"
        />
      </div> -->
    </div>
  </div>
</template>

<script>
import Toggle from "@vueform/toggle";
export default {
  name: "availaibility",
  props: {
    availability: Object,
  },
  components: {
    // Toggle,
  },
  methods: {
    // async toggleAction() {
    //   this.toggledisabled = true;
    //   //   update remotely
    //   this.remoteToggleEntity("availaibilitys", this.availaibility.id)
    //     .then(() => {
    //       this.availaibility.availaibilityStatus =
    //         this.availaibility.availaibilityStatus === "ON" ? "OFF" : "ON";
    //       // re enable button after update
    //     })
    //     .catch(() => {
    //       this.$notify({
    //         title: "Error",
    //         text: "Error occured while switching availaibility's status",
    //         type: "error",
    //       });
    //     })
    //     .finally(() => {
    //       this.toggledisabled = false;
    //     });
    // },
  },
  setup() {},
  data() {
    // return {
    //   availaibilityValue: true,
    //   toggledisabled: false,
    //   deleteUrl: `${this.$server_base_url}availaibilitys/${this.availaibility.id}`,
    // };
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
  cursor: pointer;
}
.availaibility-child-delete-button {
  padding-top: 20px;
}
</style>
