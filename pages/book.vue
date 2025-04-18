<template>
  <div class="booking-page">
    <h1>Book Your Ride</h1>
    
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
        <button type="submit" :disabled="isSubmitting">Add Booking</button>
      </div>
    </form>

    <!-- Booking Confirmation Modal -->
    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <h2>Booking Confirmation</h2>
        <p>Booking successfully added to the queue!</p>
        <button @click="closeModal">Close</button>
      </div>
    </div>

    <!-- Booking Queue -->
    <div v-if="bookingQueue.length > 0" class="queue-container">
      <h2>Booking Queue</h2>
      <div v-for="(booking, index) in bookingQueue" :key="index" class="booking-card">
        <h3>{{ booking.passengerName }}</h3>
        <p>Pickup: {{ booking.pickupLocation }}</p>
        <p>Destination: {{ booking.destination }}</p>
        <p>Status: {{ booking.status }}</p>
        <div v-if="booking.status === 'Pending'" class="progress">
          <div class="progress-bar"></div>
        </div>
      </div>
    </div>

    <!-- Error Message -->
    <div v-if="errorMessage" class="error-message">
      <p>{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    // Reactive references for booking form data
    const newBooking = ref({
      passengerName: "",
      pickupLocation: "",
      destination: "",
    });

    // Reactive state for booking queue and UI elements
    const bookingQueue = ref([]);
    const isSubmitting = ref(false);
    const showModal = ref(false);
    const errorMessage = ref("");

    // Function to handle booking form submission
    const handleBooking = () => {
      // Input validation (basic checks)
      if (!newBooking.value.passengerName || !newBooking.value.pickupLocation || !newBooking.value.destination) {
        errorMessage.value = "All fields are required!";
        return;
      }

      // Simulate booking submission
      isSubmitting.value = true;
      setTimeout(() => {
        // Add the new booking to the queue with a "Pending" status
        bookingQueue.value.push({
          ...newBooking.value,
          status: "Pending",
        });

        // Reset form
        newBooking.value.passengerName = "";
        newBooking.value.pickupLocation = "";
        newBooking.value.destination = "";

        // Show confirmation modal
        showModal.value = true;
        isSubmitting.value = false;
      }, 1500); // Simulate delay in booking processing
    };

    // Function to close the modal
    const closeModal = () => {
      showModal.value = false;
    };

    return {
      newBooking,
      bookingQueue,
      isSubmitting,
      showModal,
      errorMessage,
      handleBooking,
      closeModal,
    };
  },
};
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

button {
  width: 100%;
  padding: 12px;
  background-color: limegreen;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:disabled {
  background-color: #ddd;
}

button:hover {
  background-color: #45a049;
}

.queue-container {
  margin-top: 20px;
}

.booking-card {
  background-color: #f1f1f1;
  padding: 15px;
  margin: 10px;
  border-radius: 10px;
  border: 1px solid #ddd;
  text-align: left;
}

.booking-card h3 {
  margin: 0;
}

.booking-card p {
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

.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: white;
  padding: 30px;
  border-radius: 8px;
  text-align: center;
  max-width: 400px;
}

.modal-content button {
  background-color: limegreen;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.modal-content button:hover {
  background-color: #45a049;
}
</style>
