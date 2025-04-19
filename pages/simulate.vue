<template>
  <div class="m-6 text-center">
    <li v-for="(list, index) in linkedlistArray":key='list'> {{ list  }} </li>
    <UInput v-model="value_to_add" placeholder="name" size="sm" class="w-1/2"/>
    <UButton label="add" @click="addtoEnd"/>
    <UButton label="remove head" color="red" @click="removeElementHead"/>
  </div>
</template>

<script lang="ts" setup>


 const linkedList = new SingleLinkedList()
 const searchItem = ref('')
 const value_to_add = ref('')
 const linkedlistArray = ref(linkedList.toArray())
 const sizeOfList = 5;

 //operations 
 const addtoEnd = () =>{
  const newPerson = {
    name: `${value_to_add.value}`
  }
  if(linkedList.length < sizeOfList ){
    linkedList.append(newPerson)
    
    linkedlistArray.value = linkedList.toArray()
    alert(`succcessful you have ${linkedList.length}`)
  }

  else alert("The linked list is full ! ")
 }

 const removeElementHead = () => {
  if(linkedList.isEmpty()) alert("the list is empty ")
  const removed_element = linkedList.removeHead()
  if(removed_element) {
  alert(`you have removed ${removed_element}`)
  linkedlistArray.value = linkedList.toArray()
  }

 }

</script>

<style>

</style>