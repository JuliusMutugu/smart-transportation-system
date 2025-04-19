const stageQueue = ref<Record<string, string[]>>({})
export function useStageQueue() {
  const enqueuePassenger = (stage: string, passenger: string) => {
    if (!stageQueue.value[stage]) {
      stageQueue.value[stage] = []
    }
    stageQueue.value[stage].push(passenger)
  }

  const dequeuePassenger = (stage: string) => {
    if (stageQueue.value[stage] && stageQueue.value[stage].length > 0) {
      return stageQueue.value[stage].shift()
    }
    return null
  }

  const getQueue = (stage: string) => {
    return stageQueue.value[stage] || []
  }

  return {
    enqueuePassenger,
    dequeuePassenger,
    getQueue
  }
}
