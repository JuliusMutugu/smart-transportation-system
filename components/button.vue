<template>
  <div>
    <button> {{ name }} <slot> </slot></button>
  </div>
</template>

<script lang="ts" setup>
  defineProps({
    name:String,
    color:String,

  })
</script>


<style scoped>
button {
  width: 100%;
  padding: 12px;
  background-color: purple;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:disabled {
  background-color: #ddd;
}

button:hover {
  background-color: orange;
}

</style>