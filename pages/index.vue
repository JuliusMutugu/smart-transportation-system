<template>
  <div class="min-h-screen flex flex-col items-center justify-center  bg-[#f1f1f1f1]"">
   

    <!-- Hero Section -->
    <div class="relative z-10   text-center px-4 py-10">
      <h1 class="text-5xl font-bold leading-tight mb-4">Apply Smart. Travel Fast. </h1>
      <p class="text-lg mb-6">Your everyday manager of trip management and accountability check.</p>

      <!-- Ride navigation section -->
        <UButton  color="orange" size="lg"  label="Book" padded="true" class="px-3" to="/book"/>
      <p class="text-sm">Already have an account? <NuxtLink to="/login" class="text-blue-400">Log in</NuxtLink></p>
      <p class="text-sm mt-2">New here? <NuxtLink to="/" class="text-blue-400">Sign up</NuxtLink></p>
    </div>

    <!-- App Features Section -->
    <div class="py-20 bg-gray-50 text-center cursor-pointer" >
      <h2 class="text-3xl font-semibold mb-8">Why Choose SmartTransit?</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <!-- Feature 1 -->
        <UCard class="p-6 shadow-lg rounded-lg ">
          <h3 class="text-xl font-bold mb-3">Real-Time Tracking</h3>
          <p class="text-gray-600">Track your ride and drivers in real-time for a seamless experience.</p>
        </UCard>

        <!-- Feature 2 -->
        <UCard class="p-6 shadow-lg rounded-lg">
          <h3 class="text-xl font-bold mb-3">Easier cancellation</h3>
          <p class="text-gray-600">We allow last minute cancellation and trip management .</p>
        </UCard>

        <!-- Feature 3 -->
        <UCard class="p-6 shadow-lg rounded-lg">
          <h3 class="text-xl font-bold mb-3"> Faster Trip application</h3>
          <p class="text-gray-600">Easily apply for a trip and make necessary processing in minutes </p>
        </UCard>
      </div>
    </div>
  </div>
</template>

<script setup>
// coming soon 
</script>

<style scoped>

</style>
