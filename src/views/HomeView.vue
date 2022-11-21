<script setup></script>

<template>
  <main>
    <!-- <Dashboard :loadingAvailabilities="loadingAvailabilities" /> -->
    <Scheduler />
  </main>
</template>

<script>
import Scheduler from "../components/Scheduler.vue";
export default {
  name: "Home",
  props: {
    loadingAvailabilities: Boolean,
  },
  components: {
    Scheduler,
  },
  methods: {},
  created() {},
  setup() {},
};
</script>
