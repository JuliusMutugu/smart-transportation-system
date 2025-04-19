<template>
  <div class = 'modal'>
    <div class="modal-content"> 
      <h2 class="text-emerald-500"> Success{{ title }}</h2>
      <slot></slot>
     
    </div>
  </div>
</template>

<script lang="ts" setup>
 const isSubmitting = ref(false);
 const showModal = ref(false);

defineProps({
  title:String,

})

</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: white;
  padding: 30px;
  border-radius: 8px;
  text-align: center;
  max-width: 400px;
}

.modal-content button {
  background-color: limegreen;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}


</style>