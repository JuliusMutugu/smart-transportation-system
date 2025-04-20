<template>
  <div class="p-2 text-xl font-serif mx-3 inline text-blue-500">
    <slot></slot>
    
    {{ title }}

    
  </div>
</template>

<script lang="ts" setup>

defineProps({
  title:String,
})

</script>

<style>

</style>