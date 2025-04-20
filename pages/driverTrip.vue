<template>
  <div class="p-6 min-h-screen bg-gray-50">
    <h1 class="text-2xl font-bold text-lime-600 mb-4">Today's Trips</h1>
    
    <UAlert v-text="alert_message" color="green" v-if="show_alert"/>
    <!-- Operations Controls -->
    <div class="m-4 gap-4 p-3">
      <UButton color="lime" class="p-3 m-2" @click="addTripSection">Add Trip</UButton>
      <UButton color="blue" class="p-3 m-2" @click="searchTrip">Search Trip</UButton>
      <UButton color="red"  class="p-3 m-2"@click="removeLastTrip">Remove Last Trip</UButton>
      <UButton color="orange" class="p-3 m-2" @click="removeTrip">Remove Trip by ID</UButton>
      <UButton color="red" class="float-right" @click="removeAllTrips">Remove All  Trip by ID</UButton>
    </div>
    
    <!-- Search Input -->
    <div class="mb-4">
      <input v-model="searchTerm" class="border rounded p-2" placeholder="Enter route or trip ID to search" />
    </div>
    
    <!-- success modal  -->
     <SuccessModal class="pl-6" title="  Enter Trip Details below !" v-if="isApplying">
      <UButton label="X" color="red"  class="float-right" @click="cancelTripSection"/>
      <UDivider/>
      <Uform @submit.prevent="addTrip" class=" gap-1">
        <UFormGroup>
          <UInput placeholder="destination " v-model="destinationp" requied class="p-3" />
        </UFormGroup>
        <UFormGroup>
          <UInput placeholder="Pickup location " v-model="pickupLocation"  required class="p-2"/>
        </UFormGroup>
        <UFormGroup>
          <UInput placeholder="destination " type="time" v-model="timeToStart" class="p-2" :required="true"/>
        </UFormGroup>
        <UButton type="submit" label="Submit" @click="addTrip"/>
        
      </Uform>
     </SuccessModal>

    <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <UCard
        v-for="trip in tripsArray"
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
            <UButton
              v-if="trip.status === 'Ongoing'"
              color="blue"
              @click="findnext()"
            >
              find next
            </UButton>
            <UBadge v-else color="lime">{{trip.status}}</UBadge>
          </div>
        </template>
      </UCard>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { DoublyLinkedList } from '~/utils/LinkedList'

const { addTriptoServer } = useTrips()


const tripsList = new DoublyLinkedList()
const searchTerm = ref('')
// const starting = ref('')
const destinationp = ref('')
const pickupLocation = ref('')
const timeToStart = ref('')

 const show_alert = ref(true)

const alert_message = ref("")

const isApplying = ref(false) // open application area section


// to add the trip on the api
const trip = reactive({
  id: Math.floor(Math.random() * 1000), // just for local uniqueness
  route: '',
  pickup: '',
  destination: '',
  time: '',
  capacity: 14,
  booked: 0,
  status: 'Pending',
})

const initialTrips = [
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
  
]

// Populate the linked list with the initial data
initialTrips.forEach(trip => tripsList.append(trip))

const tripsArray = ref(tripsList.toArray())

// add the trip section menu
const addTripSection = () =>{
  isApplying.value = true;

}
const cancelTripSection = () =>{
  isApplying.value = false;

}
// Operations  add trip to the list
const addTrip = () => {
    const newTrip = {
    id: Math.floor(Math.random() * 1000),
    route: `${pickupLocation.value} to ${destinationp.value}`,
    pickup: pickupLocation.value,
    destination: destinationp,
    time: timeToStart.value.toString(),
    capacity: 14,
    booked: 0,
    status: 'Pending'
  }
  try {
    addTriptoServer(newTrip)
  } catch (error) {
    alert_message.value = 'Error adding trip to server'
    return
  }
    tripsList.append(newTrip)
  tripsArray.value = tripsList.toArray() // Update the array to re-render
  newTrip.booked +=1
  isApplying.value = false
  alert_message.value = `Trip from ${pickupLocation.value} to ${destinationp.value} added to the list`
  
  // }
}


const startTrip = (id) => {
  if (tripsList.updateTripStatus(id, 'Ongoing')) {
    tripsList.current = tripsList.id
    tripsArray.value = tripsList.toArray()
    alert_message.value = `currently traveling at ${tripsArray  }`
  }
}

const findnext= () =>{
    tripsArray.value = tripsList.peek()
    alert_message( ` ${tripsArray.value}`)
  
}

const completeTrip = (id) => {
  if (tripsList.updateTripStatus(id, 'Completed')) {
    tripsArray.value = tripsList.toArray()
  }
}

const removeTrip = (index) => {
  const tripToRemove = tripsList.find(searchTerm.value)
  if (tripToRemove) {
    tripsList.removeById(tripToRemove.id)
    tripsArray.value = tripsList.toArray()
    alert_message.value = `Removed trip: ${tripToRemove.route}`
  } else {
    alert_message.value = 'Trip not found!'
  }
}

const removeLastTrip = () => {
  const lastTrip = tripsList.removeLast()
  if (lastTrip) {
    tripsArray.value = tripsList.toArray()
    alert_message.value = `Removed last trip: ${lastTrip.route}`
  } else {
    alert_message.value = 'No trip to remove!'
  }
}

const searchTrip = () => {
  const foundTrip = tripsList.find(searchTerm.value)
  if (foundTrip) {
    alert_message.value = `Found trip: ${foundTrip.route}`
  } else {
    alert_message.value = "Trip not Found"
  }
}

const removeAllTrips =() =>{
  tripsList.clearAll()
  tripsArray.value = tripsList.toArray()
  alert_message.value = 'Removed all items '

}

</script>
