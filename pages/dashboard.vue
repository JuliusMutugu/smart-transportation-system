<template>
  <div class="m-2 bg-[#dde0e4] p-6 rounded-lg shadow-md">
            <div>
              <UAvatar
                     src="https://avatars.githubusercontent.com/u/739984?v=4"
                     alt="Avatar"/>
            </div>
      <h1 class="font-semibold text-blue-600 max-w-sm">Welcome, {{user.name}}</h1>

    <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3" >
      <Card title="Trip Booking">
        
        <p class="mb-4 text-gray-600">Plan and schedule your trip to any destination.</p>
        <Button class="bg-lime-500 text-white w-full" @click="book">Book Now</Button>
      </Card>

      <Card title="My Trips">
      
        <p class="mb-4 text-gray-600">View your upcoming and past trips, with real-time tracking.</p>
        <Button class="bg-lime-500 text-white w-full" to="/trips" @click="mytrips">View Trips</Button>
      </Card>

      <Card title="My Profile">
        <p class="mb-4 text-gray-600">Manage personal information and preferences.</p>
        <Button class="bg-lime-500 text-white w-full" to="/profile">Go to Profile</Button>
      </Card>
    </div>
  
  </div>
</template>

<script setup>



const router = useRouter()

// Dummy user data – in a real app, you'd use a store or fetch from API
const user = {
  name: 'Angel'
}

const logout = () => {
  // perform logout logic
  navigateTo('/', )
}
const book= () => {
  navigateTo('/book', );
}
const mytrips = () => {
  navigateTo('/trips', )

}
</script>
