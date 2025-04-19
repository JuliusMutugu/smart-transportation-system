<template>
  <div>
    <div class="navsection">
      <NuxtLink to="/dashboard"> Dashboard</NuxtLink>
      <NuxtLink to="/Booking"> Bookings</NuxtLink>
      <NuxtLink to="/profile"> profile</NuxtLink>
      <NuxtLink to="/book"> book</NuxtLink>
      <NuxtLink to="/trips"> trips</NuxtLink>
      <NuxtLink to="/transport"> transport</NuxtLink>
      <NuxtLink to="/stages"> stages</NuxtLink>
      <NuxtLink to="/driverTrip"> driverTrip</NuxtLink>
    </div>
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>

</script>

<style scoped>
  .navsection{
    padding: 17px;
    margin: 12px;
    text-decoration: none;
    color: white;
    background-color: rgb(60, 147, 158);
    font-family: 'Times New Roman', Times, serif;
    font-size: 18px;

  }
  
</style>