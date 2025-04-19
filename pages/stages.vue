<template>
  <div  class="m-6 justify-center">
    <UCard class="max-w-xl mx-auto">

        <h2 class="text-xl font-bold mb-4">Stage Queue Management</h2>
        <UContainer>
          <li v-for="value, index in queue":key=value i>{{ value }}</li>
        </UContainer>
        <UInput v-model="newPassenger" placeholder="Enter passenger name" required class="mb-2" />
        <select name="stages" id="stage"  >
          <option v-for="value, index in stages":key=value value="{{ selectedStage }}"  > {{ value }} </option>
        </select>
        <UInput type="text" v-model="selectedStage" placeholder="pickup location " />
      
      
        <UButton @click="addToQueue" class="mb-4">Add to Queue</UButton>
        <UDivider/>
        <UBadge color="blue">
          <h3 class="font-semibold" >Queue at:  {{ selectedStage }}</h3>
        </UBadge>

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
