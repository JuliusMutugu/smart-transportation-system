<template>
  <div class="p-6 min-h-screen bg-gray-100">
    <h1 class="text-3xl font-semibold text-lime-600 mb-6">My Trips</h1>

    <div class="grid gap-6 md:grid-cols-2">
      <UCard
        v-for="(trip, index) in trips"
        :key="trip"
        class="bg-white"
      >
        <template #header>
          <div class="flex justify-between items-center">
            <h2 class="text-lg font-semibold text-gray-800">
              {{ trip.route }}
            </h2>
            <UBadge :color="getBadgeColor(trip.status)">
              {{ trip.status }}
            </UBadge>
          </div>
        </template>

        <div class="text-sm text-gray-700 space-y-1">
          <p><strong>Date:</strong> {{ trip.date }}</p>
          <p><strong>Time:</strong> {{ trip.time }}</p>
          <p><strong>Stage:</strong> {{ trip.stage }}</p>
        </div>

        <template #footer>
          <div class="flex justify-end">
            <UButton
              v-if="trip.status === 'Upcoming'"
              color="red"
              variant="soft"
              @click="cancelTrip(index)"
            
              Cancel
            />
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
    route: 'CBD → Rongai',
    date: '2025-04-18',
    time: '08:30 AM',
    stage: 'Kencom Stage',
    status: 'Upcoming'
  },
  {
    route: 'CBD → Kasarani',
    date: '2025-04-17',
    time: '06:45 PM',
    stage: 'Commercial Stage',
    status: 'Completed'
  },
  {
    route: 'CBD → Embakasi',
    date: '2025-04-16',
    time: '07:15 AM',
    stage: 'Ambassadeur',
    status: 'Completed'
  }
])

const cancelTrip = (index) => {
  trips.value[index].status = 'Cancelled'
}

const getBadgeColor = (status) => {
  switch (status) {
    case 'Upcoming':
      return 'lime'
    case 'Completed':
      return 'gray'
    case 'Cancelled':
      return 'red'
    default:
      return 'gray'
  }
}
</script>
