<template>
  <div>
    <h1> transportation system</h1>
    <UFormGroup>
      <UInput v-model="newPassenger" placeholder="Enter passenger name" required class="mb-2" />
    </UFormGroup>
    <select name="stages" id="stage" >
      <option v-for="(value, index) in stages":key=value value="{{ value }}" > {{ value }} </option>
    </select>
    <UButton @click="addStage"> AddStage</UButton>
    <hr>
    <UButton @click="addVehicle"> add vehicle</UButton>
    <hr/>
    <div v-for="(stage, index) in stages":key=stage>
      <li :stage="stage" :index="index"/>
    </div>
  </div>
</template>z

<script lang="js" setup>
// import { useMyTransportationStore } from '~/stores/transportation';

// const store_ = useMyTransportationStore();
// const stages = store_.stages;

// function addStage(){
//   const stageName = `stage ${stages.length + 1}`;
//   store_.addStage(stageName);
// }
// function addVehicle(){
//   const vehicle = {name: `vehicle ${store_.vehicles.length + 1 }`, capacity: 14};
//   store_.addVehicle(vehicle)
// }
</script>

<style>

</style>