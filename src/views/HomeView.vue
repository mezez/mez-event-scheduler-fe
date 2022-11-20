<script setup></script>

<template>
  <main>
    <!-- <Dashboard :loadingAvailabilities="loadingAvailabilities" /> -->
    <Dashboard />
  </main>
</template>

<script>
import Dashboard from "../components/Dashboard.vue";
export default {
  name: "Home",
  props: {
    loadingAvailabilities: Boolean,
  },
  components: {
    Dashboard,
  },
  methods: {},
  created() {},
  setup() {},
};
</script>
