<script setup>
defineProps({
  msg: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div class="catchphrase">
    <h1 class="green">{{ msg }}</h1>
    <!-- <h3>Event scheduling made easy...</h3> -->
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.catchphrase h1,
.catchphrase h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .catchphrase h1,
  .catchphrase h3 {
    text-align: left;
  }
}
</style>
