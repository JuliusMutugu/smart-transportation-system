<template>
  <div class="booking-page">
    <h1 class="text-2xl text-blue-600 bold">Book Your Ride</h1>

    <!-- Booking Form -->
    <form @submit.prevent="handleBooking" class="booking-form">
      <div class="form-group">
        <label for="passengerName">Name:</label>
        <input
          type="text"
          id="passengerName"
          v-model="newBooking.passengerName"
          placeholder="Enter your name"
          required
        />
      </div>

      <div class="form-group">
        <label for="pickupLocation">Pickup Location:</label>
        <input
          type="text"
          id="pickupLocation"
          v-model="newBooking.pickupLocation"
          placeholder="Enter pickup location"
          required
        />
      </div>

      <div class="form-group">
        <label for="destination">Destination:</label>
        <input
          type="text"
          id="destination"
          v-model="newBooking.destination"
          placeholder="Enter destination"
          required
        />
      </div>

      <div class="form-group">
        <Button type="submit" :disabled="isSubmitting" name="AddBooking" />
      </div>
    </form>

    <!-- Booking Confirmation Modal -->
    <SuccessModal v-if="isSubmitting" title="Booking">
      <p>Booking successfully added to the queue!</p>
      <UButton label="close" color="red" @click="closeModal" />
    </SuccessModal>

    <!-- Booking Queue -->
    <UCard v-if="bookingQueue.toArray().length > 0" class="queue-container flex-row">
      <h2>Booking Queue</h2>
      <UCard v-for="(booking, index) in bookingQueue.toArray()" :key="index" class="booking-UCard">
        <h3>{{ booking.passengerName }}</h3>
        <p>Pickup: {{ booking.pickupLocation }}</p>
        <p>Destination: {{ booking.destination }}</p>
        <p>Status: {{ booking.status }}</p>
        <div v-if="booking.status === 'Pending'" class="progress">
          <div class="progress-bar"></div>
        </div>
      </UCard>
    </UCard>

    <!-- Error Message -->
    <div v-if="errorMessage" class="error-message">
      <p>{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { DoublyLinkedList } from '~/utils/LinkedList'

const newBooking = ref({
  passengerName: '',
  pickupLocation: '',
  destination: '',
})

const bookingQueue = ref(new DoublyLinkedList())
const isSubmitting = ref(false)
const showModal = ref(false)
const errorMessage = ref('')

// Function to handle booking form submission
const handleBooking = () => {
  // Input validation (basic checks)
  if (!newBooking.value.passengerName || !newBooking.value.pickupLocation || !newBooking.value.destination) {
    errorMessage.value = 'All fields are required!'
    return
  }

  // Simulate booking submission
  isSubmitting.value = true
  setTimeout(() => {
    // Add the new booking to the linked list with a "Pending" status
    const bookingData = {
      ...newBooking.value,
      status: 'Pending',
    }
    bookingQueue.value.append(bookingData)

    // Reset form
    newBooking.value.passengerName = ''
    newBooking.value.pickupLocation = ''
    newBooking.value.destination = ''

    // Show confirmation modal
    showModal.value = true
    isSubmitting.value = false
  }, 1500) // Simulate delay in booking processing
}

// Function to close the modal
const closeModal = () => {
  showModal.value = false
}

// Add other methods (like removing bookings, etc.) as needed.

</script>

<style scoped>
.booking-page {
  text-align: center;
  margin: 20px;
  font-family: Arial, sans-serif;
}

.booking-form {
  margin: 20px auto;
  width: 50%;
  max-width: 600px;
  background-color: #f8f8f8;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 15px;
}

input {
  width: 100%;
  padding: 10px;
  margin: 5px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.queue-container {
  margin-top: 20px;
}

.booking-UCard {
  background-color: #f1f1f1;
  padding: 15px;
  margin: 10px;
  border-radius: 10px;
  border: 1px solid #ddd;
  text-align: left;
}

.booking-UCard h3 {
  margin: 0;
}

.booking-UCard p {
  margin: 5px 0;
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
  width: 50%;
  border-radius: 5px;
}

.error-message {
  margin-top: 20px;
  color: red;
}

.modal-content Button:hover {
  background-color: #45a049;
}
</style>
