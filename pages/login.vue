<template>
  <div class="flex justify-center items-center h-screen bg-gray-100">
    <UCard class="w-96 p-8 shadow-lg rounded-lg bg-white">
      <h1 class="text-2xl font-semibold text-center mb-6">Login</h1>
      <form @submit.prevent="handleLogin">
        <UInput 
          label="Username" 
          v-model="loginData.username"
          type="text" 
          placeholder="Enter your username"
          class="mb-4"
        />
        <UInput 
          label="Password"
          v-model="loginData.password"
          type="password" 
          placeholder="Enter your password"
          class="mb-4"
        />
        <div class="mb-4">
          <UButton 
            type="submit"
            :disabled="isSubmitting"
            class="w-full bg-lime-500 text-white"
          >
            Login
          </UButton>
        </div>
      </form>
      <div v-if="errorMessage" class="text-red-500 text-center text-sm mb-4">
        <p>{{ errorMessage }}</p>
      </div>
    </UCard>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const loginData = ref({
  username: '',
  password: ''
});

const isSubmitting = ref(false);
const errorMessage = ref('');

const handleLogin = () => {
  if (!loginData.value.username || !loginData.value.password) {
    errorMessage.value = "Please fill in both fields.";
    return;
  }
  // Simulating a login process
  isSubmitting.value = true;
  setTimeout(() => {
    if (loginData.value.username === 'user' && loginData.value.password === 'password123') {
      // Redirect or perform the actual login process
      errorMessage.value = '';
    } else {
      errorMessage.value = 'Invalid credentials!';
    }
    isSubmitting.value = false;
  }, 1500);
};
</script>
