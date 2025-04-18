import { defineStore } from 'pinia'

class StageNode {
  name: string
  next: StageNode | null

  constructor(name: string) {
    this.name = name
    this.next = null
  }
}

class RouteLinkedList {
  head: StageNode | null = null

  addStage(name: string) {
    const newNode = new StageNode(name)
    if (!this.head) {
      this.head = newNode
      return
    }
    let current = this.head
    while (current.next) {
      current = current.next
    }
    current.next = newNode
  }

  getStageAt(index: number): string {
    let current = this.head
    let count = 0
    while (current && count < index) {
      current = current.next
      count++
    }
    return current ? current.name : 'Trip Completed'
  }

  getAllStages(): string[] {
    const stages: string[] = []
    let current = this.head
    while (current) {
      stages.push(current.name)
      current = current.next
    }
    return stages
  }
}

export const useStageStore = defineStore('stageStore', () => {
  const currentStageIndex = ref(0)
  const route = new RouteLinkedList()

  const initializeRoute = () => {
    route.addStage('CBD')
    route.addStage('Kariokor')
    route.addStage('Ngara')
    route.addStage('Pangani')
    route.addStage('Thika Road')
  }

  const getCurrentStage = computed(() => route.getStageAt(currentStageIndex.value))
  const moveToNextStage = () => {
    currentStageIndex.value++
  }

  const getAllStageNames = () => route.getAllStages()

  return {
    currentStageIndex,
    getCurrentStage,
    moveToNextStage,
    initializeRoute,
    getAllStageNames,
  }
})
