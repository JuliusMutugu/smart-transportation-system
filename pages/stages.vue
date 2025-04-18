<template>
  <div class="p-6">
    <UCard class="max-w-xl mx-auto">
      <h2 class="text-xl font-bold mb-4">Stage Queue Management</h2>
      
      <UInput v-model="newPassenger" placeholder="Enter passenger name" class="mb-2" />
      <USelect v-model="selectedStage" :options="stages" class="mb-2" />
      
      <UButton @click="addToQueue" class="mb-4">Add to Queue</UButton>

      <div v-if="selectedStage">
        <h3 class="font-semibold">Queue at {{ selectedStage }}:</h3>
        <ul class="list-disc list-inside">
          <li v-for="(p, i) in queue" :key="i">{{ p }}</li>
        </ul>
      </div>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const { enqueuePassenger, getQueue } = useStageQueue()

const newPassenger = ref('')
const selectedStage = ref('')

const stages = ['CBD', 'Westlands', 'Thika', 'Kasarani']

const queue = ref<string[]>([])

const addToQueue = () => {
  if (selectedStage.value && newPassenger.value) {
    enqueuePassenger(selectedStage.value, newPassenger.value)
    newPassenger.value = ''
    updateQueue()
  }
}

const updateQueue = () => {
  if (selectedStage.value) {
    queue.value = getQueue(selectedStage.value)
  }
}

watch(selectedStage, updateQueue)
</script>
