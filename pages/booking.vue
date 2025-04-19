<template>
  <div class="booking-queue grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-1"">
    <h1>Booking Queue</h1>
    <div class="queue-container">
      <div
        v-for="(booking, index) in bookingQueue"
        :key="index"
        class="booking-card"
      >
        <h2>{{ booking.passengerName }}</h2>
        <p>Pickup: {{ booking.pickupLocation }}</p>
        <p>Destination: {{ booking.destination }}</p>
        <p>Status: {{ booking.status }}</p>
        <div v-if="booking.status !== 'Completed'" class="progress">
          <div
            class="progress-bar"
            :style="{ width: progressBarWidth(booking.status) + '%' }"
          ></div>
        </div>
      </div>
    </div>
    <button @click="processBookings">Process Next Booking</button>
  </div>
</template>

<script>
export default {
  setup() {
    // Reactive reference for booking queue
    const bookingQueue = ref([
      {
        passengerName: 'John Doe',
        pickupLocation: 'Kenya Cinema',
        destination: 'Westlands',
        status: 'Pending',
      },
      {
        passengerName: 'Jane Smith',
        pickupLocation: 'Nairobi Central',
        destination: 'JKIA',
        status: 'Pending',
      },
      {
        passengerName: 'Mike Johnson',
        pickupLocation: 'Uhuru Park',
        destination: 'Lang\'ata',
        status: 'Pending',
      },
    ]);

    // Function to process the booking queue
    const processBookings = () => {
      if (bookingQueue.value.length > 0) {
        // Get the first booking in the queue
        const nextBooking = bookingQueue.value[0];
        nextBooking.status = 'Assigned to Driver'; // Update status to 'Assigned to Driver'

        // Simulate delay before moving the booking from queue
        setTimeout(() => {
          bookingQueue.value.shift(); // Dequeue the booking after processing
          updateStatusAfterDispatch();
        }, 2000); // Simulate processing delay of 2 seconds
      }
    };

    // Update the status to 'Completed' after the booking is dispatched
    const updateStatusAfterDispatch = () => {
      if (bookingQueue.value.length > 0) {
        const nextBooking = bookingQueue.value[0];
        nextBooking.status = 'Completed'; // Mark as completed
      }
    };

    // Dynamically adjust the width of the progress bar based on booking status
    const progressBarWidth = (status) => {
      switch (status) {
        case 'Pending':
          return 25;
        case 'Assigned to Driver':
          return 50;
        case 'Completed':
          return 100;
        default:
          return 0;
      }
    };

    return {
      bookingQueue,
      processBookings,
      progressBarWidth,
    };
  },
};
</script>

<style scoped>
.booking-queue {
  text-align: center;
  margin: 20px;
}

.queue-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

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
}

.progress {
  margin-top: 10px;
  height: 10px;
  background-color: #ddd;
  border-radius: 5px;
}

.progress-bar {
  height: 100%;
  background-color: limegreen;
  border-radius: 5px;
  transition: width 1s ease;
}

button {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}
</style>
