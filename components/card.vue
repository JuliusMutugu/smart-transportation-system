<template>
  <div class="booking-card">
    <h2> {{ title }}</h2>
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  title:String
})
</script>

<style scoped>
.booking-card {
  border: 1px solid #ddd;
  padding: 20px;
  border-radius: 10px;
  background-color: #f9f9f9;
  width: 300px;
  margin: 0 auto;
}

.booking-card h2 {
  margin: 0;
  font-weight: bold;
}


</style>