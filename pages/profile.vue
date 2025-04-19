<template>
  <div class="p-6 min-h-screen bg-gray-100 ">
    <h1 class="text-3xl font-semibold text-lime-600 mb-6">My Profile</h1>
    <UButton label="logout" color="red" size="sm" class="float-right" to="/login" />
    
    <UAlert v-text="alert_message" color="green" v-if="show_alert"/>
    <UCard class="max-w-xl mx-auto bg-white lg:w-10/12">
      <template #header>
        <div class="flex items-center gap-4">
          <img
            src="https://i.pravatar.cc/100?img=13"
            alt="Profile picture"
            class="w-16 h-16 rounded-full border border-gray-300"
          />
          <div>
            <h2 class="text-lg font-semibold">{{ user.name }}</h2>
            <p class="text-sm text-gray-500">{{ user.role }}</p>
          </div>
        </div>
      </template>

      <div class="space-y-3">
        <div>
          <span class="text-gray-500">Full Name:</span>
          <div v-if="!editing">{{ user.name }}</div>
          <UInput v-else v-model="user.name" />
        </div>

        <div>
          <span class="text-gray-500">Email:</span>
          <div v-if="!editing">{{ user.email }}</div>
          <UInput v-else v-model="user.email" />
        </div>

        <div>
          <span class="text-gray-500">Phone Number:</span>
          <div v-if="!editing">{{ user.phone }}</div>
          <UInput v-else v-model="user.phone" />
        </div>

        <div>
          <span class="text-gray-500">Role:</span>
          <div v-if="!editing">{{ user.role }}</div>
          <USelect v-else :options="roles" v-model="user.role" />
        </div>
      </div>

      <template #footer>
        <div class="flex justify-end space-x-4">
          <UButton
            color="gray"
            variant="ghost"
            @click="editing = !editing"
          >
            {{ editing ? 'Cancel' : 'Edit Profile' }}
          </UButton>

          <UButton
            v-if="editing"
            color="lime"
            @click="saveProfile"
          >
            Save Changes
          </UButton>
        </div>
      </template>
    </UCard>
  </div>
</template>

<script setup>
const alert_message = ref('')
const show_alert = ref(false)
const editing = ref(false)

const roles = ['Passenger', 'Driver', 'Sacco Admin']

const user = ref({
  name: 'Julius Mutugu',
  email: 'julimore@gmail.com',
  phone: '+254114975752',
  role: 'Passenger'
})
const saveProfile = () => {
  editing.value = false
  
  show_alert.value = true
  alert_message.value = "profile updated successfully ";
  setTimeout(() =>{
    show_alert.value = false   
  },1000)
}

</script>
