<template>
  <div class="p-6 bg-gray-100 min-h-screen">
    <h1 class="text-3xl font-semibold mb-6 text-lime-600">Welcome, {{ user.name }}</h1>

    <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <UCard>
        <template #header>
          <p class="font-medium text-lg">Book a Trip</p>
        </template>
        <p class="mb-4 text-gray-600">Plan and schedule your trip to any destination.</p>
        <UButton class="bg-lime-500 text-white w-full" to="/booking">Book Now</UButton>
      </UCard>

      <UCard>
        <template #header>
          <p class="font-medium text-lg">My Trips</p>
        </template>
        <p class="mb-4 text-gray-600">View your upcoming and past trips, with real-time tracking.</p>
        <UButton class="bg-lime-500 text-white w-full" to="/trips">View Trips</UButton>
      </UCard>

      <UCard>
        <template #header>
          <p class="font-medium text-lg">My Profile</p>
        </template>
        <p class="mb-4 text-gray-600">Manage personal information and preferences.</p>
        <UButton class="bg-lime-500 text-white w-full" to="/profile">Go to Profile</UButton>
      </UCard>
    </div>

    <div class="mt-10 text-center">
      <UButton class="bg-gray-700 text-white" @click="logout">Logout</UButton>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

// Dummy user data – in a real app, you'd use a store or fetch from API
const user = {
  name: 'Angel'
}

const logout = () => {
  // perform logout logic
  router.push('/login')
}
</script>
