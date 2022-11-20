<template>
  <div>
    <div class="dashboard-title">Welcome</div>
    <br />
  </div>
</template>

<script>
export default {
  name: "Welcome Bar",
  props: {},
  setup() {},
};
</script>

<style scoped>
.dashboard-title {
  font-size: large;
  padding: 2rem;
  /* background-color: rgb(110, 124, 124); */
  background-color: var(--vt-c-text-dark-2);
  /* color: black; */
  color: var(--color-background);
  border-radius: 10px;
}
</style>
