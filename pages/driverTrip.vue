<template>
  <div class="p-6 min-h-screen bg-gray-50">
    <h1 class="text-2xl font-bold text-lime-600 mb-4">Today's Trips</h1>

    <!-- Alert Message -->
    <UAlert v-text="alertMessage" color="green" v-if="showAlert" />

    <!-- Operations Controls -->
    <div class="m-4 gap-4 p-3">
      <UButton color="lime" class="p-3 m-2" @click="openAddTripSection">Add Trip</UButton>
      <UButton color="blue" class="p-3 m-2" @click="searchTrip">Search Trip</UButton>
      <UButton color="red" class="p-3 m-2" @click="removeLastTrip">Remove Last Trip</UButton>
      <UButton color="orange" class="p-3 m-2" @click="removeTrip">Remove Trip by ID</UButton>
      <UButton color="red" class="float-right" @click="removeAllTrips">Remove All Trips</UButton>
    </div>

    <!-- Search Input -->
    <div class="mb-4">
      <input
        v-model="searchTerm"
        class="border rounded p-2"
        placeholder="Enter route or trip ID to search"
      />
    </div>

    <!-- Add Trip Modal -->
    <SuccessModal class="pl-6" title="Enter Trip Details Below!" v-if="isAddingTrip">
      <UButton label="X" color="red" class="float-right" @click="closeAddTripSection" />
      <UDivider />
      <UForm @submit.prevent="addTrip" class="gap-1">
        <UFormGroup>
          <UInput
            placeholder="Destination"
            v-model="newTrip.destination"
            required
            class="p-3"
          />
        </UFormGroup>
        <UFormGroup>
          <UInput
            placeholder="Pickup Location"
            v-model="newTrip.pickup"
            required
            class="p-2"
          />
        </UFormGroup>
        <UFormGroup>
          <UInput
            placeholder="Time to Start"
            type="time"
            v-model="newTrip.time"
            required
            class="p-2"
          />
        </UFormGroup>
        <UButton type="submit" label="Submit" />
      </UForm>
    </SuccessModal>

    <!-- Trips List -->
    <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <UCard v-for="trip in tripsArray" :key="trip.id" class="bg-white">
        <template #header>
          <div class="flex justify-between items-center">
            <h2 class="text-lg font-semibold text-gray-800">{{ trip.route }}</h2>
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
            <UBadge v-else color="lime">{{ trip.status }}</UBadge>
          </div>
        </template>
      </UCard>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { DoublyLinkedList } from '~/utils/LinkedList';
// import { useTrips } from '~/composables/useTrips';

// Reactive State
const tripsList = new DoublyLinkedList();
const tripsArray = ref(tripsList.toArray());
const searchTerm = ref('');
const alertMessage = ref('');
const showAlert = ref(false);
const isAddingTrip = ref(false);

// New Trip Form Data
const newTrip = reactive({
  id: null,
  route: '',
  pickup: '',
  destination: '',
  time: '',
  capacity: 14,
  booked: 0,
  status: 'Pending',
});

// Initialize with Sample Data
const initialTrips = [
  {
    id: 1,
    route: 'CBD → Westlands',
    pickup: 'Kencom Stage',
    destination: 'Sarit Center',
    time: '08:30 AM',
    capacity: 14,
    booked: 10,
    status: 'Pending',
  },
];
initialTrips.forEach((trip) => tripsList.append(trip));
tripsArray.value = tripsList.toArray();

// Functions
const openAddTripSection = () => {
  isAddingTrip.value = true;
};

const closeAddTripSection = () => {
  isAddingTrip.value = false;
};

const addTrip = () => {
  if (!newTrip.pickup || !newTrip.destination || !newTrip.time) {
    alertMessage.value = 'Please fill in all fields!';
    showAlert.value = true;
    return;
  }

  const trip = {
    ...newTrip,
    id: Math.floor(Math.random() * 1000),
    route: `${newTrip.pickup} → ${newTrip.destination}`,
  };

  tripsList.append(trip);
  tripsArray.value = tripsList.toArray();
  alertMessage.value = `Trip from ${trip.pickup} to ${trip.destination} added successfully!`;
  showAlert.value = true;

  // Reset Form
  Object.assign(newTrip, {
    id: null,
    route: '',
    pickup: '',
    destination: '',
    time: '',
    capacity: 14,
    booked: 0,
    status: 'Pending',
  });

  isAddingTrip.value = false;
};

const startTrip = (id) => {
  if (tripsList.updateTripStatus(id, 'Ongoing')) {
    tripsArray.value = tripsList.toArray();
    alertMessage.value = 'Trip started successfully!';
    showAlert.value = true;
  }
};

const completeTrip = (id) => {
  if (tripsList.updateTripStatus(id, 'Completed')) {
    tripsArray.value = tripsList.toArray();
    alertMessage.value = 'Trip marked as completed!';
    showAlert.value = true;
  }
};

const searchTrip = () => {
  const foundTrip = tripsList.find(searchTerm.value);
  if (foundTrip) {
    alertMessage.value = `Found trip: ${foundTrip.route}`;
  } else {
    alertMessage.value = 'Trip not found!';
  }
  showAlert.value = true;
};

const removeLastTrip = () => {
  const lastTrip = tripsList.removeLast();
  if (lastTrip) {
    tripsArray.value = tripsList.toArray();
    alertMessage.value = `Removed last trip: ${lastTrip.route}`;
  } else {
    alertMessage.value = 'No trip to remove!';
  }
  showAlert.value = true;
};

const removeTrip = () => {
  const tripToRemove = tripsList.find(searchTerm.value);
  if (tripToRemove) {
    tripsList.removeById(tripToRemove.id);
    tripsArray.value = tripsList.toArray();
    alertMessage.value = `Removed trip: ${tripToRemove.route}`;
  } else {
    alertMessage.value = 'Trip not found!';
  }
  showAlert.value = true;
};

const removeAllTrips = () => {
  tripsList.clearAll();
  tripsArray.value = tripsList.toArray();
  alertMessage.value = 'All trips removed!';
  showAlert.value = true;
};
</script>

<style scoped>
/* Add any necessary styles here */
</style>