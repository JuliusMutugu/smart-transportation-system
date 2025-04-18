<template>
  <div class="p-6 min-h-screen bg-gray-50">
    <h1 class="text-2xl font-bold text-lime-600 mb-4">Today's Trips</h1>

    <div class="grid gap-4 md:grid-cols-2">
      <UCard
        v-for="trip in trips"
        :key="trip.id"
        class="bg-white"
      >
        <template #header>
          <div class="flex justify-between items-center">
            <h2 class="text-lg font-semibold text-gray-800">
              {{ trip.route }}
            </h2>
            <UBadge color="gray">{{ trip.status }}</UBadge>
          </div>
        </template>

        <div class="space-y-2 text-sm text-gray-700">
          <p><strong>Pickup:</strong> {{ trip.pickup }}</p>
          <p><strong>Destination:</strong> {{ trip.destination }}</p>
          <p><strong>Departure:</strong> {{ trip.time }}</p>
          <p><strong>Booked Seats:</strong> {{ trip.booked }}/{{ trip.capacity }}</p>
        </div>

        <template #footer>
          <div class="flex justify-end space-x-2">
            <UButton
              v-if="trip.status === 'Pending'"
              color="lime"
              @click="startTrip(trip.id)"
            >
              Start Trip
            </UButton>
            <UButton
              v-else-if="trip.status === 'Ongoing'"
              color="gray"
              @click="completeTrip(trip.id)"
            >
              Mark Complete
            </UButton>
            <UBadge v-else color="lime">Completed</UBadge>
          </div>
        </template>
      </UCard>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const trips = ref([
  {
    id: 1,
    route: 'CBD → Westlands',
    pickup: 'Kencom Stage',
    destination: 'Sarit Center',
    time: '08:30 AM',
    capacity: 14,
    booked: 10,
    status: 'Pending'
  },
  {
    id: 2,
    route: 'CBD → Rongai',
    pickup: 'Railways Stage',
    destination: 'Maasai Lodge',
    time: '10:00 AM',
    capacity: 14,
    booked: 14,
    status: 'Ongoing'
  },
  {
    id: 3,
    route: 'CBD → Kasarani',
    pickup: 'Commercial Stage',
    destination: 'Kasarani Stadium',
    time: '12:00 PM',
    capacity: 14,
    booked: 5,
    status: 'Completed'
  }
])

const startTrip = (id) => {
  const trip = trips.value.find(t => t.id === id)
  if (trip) trip.status = 'Ongoing'
}

const completeTrip = (id) => {
  const trip = trips.value.find(t => t.id === id)
  if (trip) trip.status = 'Completed'
}
</script>
