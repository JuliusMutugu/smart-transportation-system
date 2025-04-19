<template>
  <div>
    <div class="navsection my-2 rounded-md text-right  p-2">
      <NuxtLink to="/"> <NavSection>Home</NavSection></NuxtLink>
      <NuxtLink to="/dashboard"> <NavSection>Dashboard</NavSection></NuxtLink>
      <!-- <NuxtLink to="/Booking"> <NavSection>Bookings</NavSection></NuxtLink> -->
      <NuxtLink to="/profile"> <NavSection>Profile</NavSection></NuxtLink>
      <!-- <NuxtLink to="/book"> book</NuxtLink> -->
      <NuxtLink to="/trips"> <NavSection>Trips</NavSection></NuxtLink>
      <!-- <NuxtLink to="/transport"> transport</NuxtLink> -->
      <!-- <NuxtLink to="/stages"> stages</NuxtLink> -->
      <NuxtLink to="/driverTrip"><NavSection>DriverTrips </NavSection></NuxtLink>
    </div>
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>

</script>

<style scoped>

  
</style>