<template>
  <div class="min-h-screen flex flex-col items-center justify-center  bg-[#f1f1f1f1]"">
   

    <!-- Hero Section -->
    <div class="relative z-10   text-center px-4 py-10">
      <h1 class="text-5xl font-bold leading-tight mb-4">Ride Smart. Travel Fast. </h1>
      <p class="text-lg mb-6">Your everyday commute made easy with real-time tracking and dynamic pricing.</p>

      <!-- Ride Booking Button -->
        <UButton  color="orange" size="lg"  label="Book" padded="true" class="px-3" to="/login"/>
      <p class="text-sm">Already have an account? <NuxtLink to="/login" class="text-blue-400">Log in</NuxtLink></p>
      <p class="text-sm mt-2">New here? <NuxtLink to="/signup" class="text-blue-400">Sign up</NuxtLink></p>
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
          <h3 class="text-xl font-bold mb-3">Dynamic Pricing</h3>
          <p class="text-gray-600">Our pricing adapts to traffic, demand, and other factors to ensure fairness.</p>
        </UCard>

        <!-- Feature 3 -->
        <UCard class="p-6 shadow-lg rounded-lg">
          <h3 class="text-xl font-bold mb-3">Secure Payments</h3>
          <p class="text-gray-600">Easily pay for your rides using digital wallets or cards, ensuring security.</p>
        </UCard>
      </div>
    </div>
  </div>
</template>

<script setup>
// You can add any additional logic here for handling dynamic content
</script>

<style scoped>

</style>
