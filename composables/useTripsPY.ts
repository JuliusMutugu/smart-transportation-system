// this is the logic to fetch data and also addtrips trough the api(hosted on port:5000)
import type { Trip } from "~/types/trips"

export const useTrips = () => {
  const trips = ref<any[]>([])

  const loadTrips = async () => {
    const res = await fetch('http://127.0.0.1:5000/trips')
    trips.value = await res.json()
  }

  const addTriptoServer = async (tripData:any) => {
    const res = await fetch('http://127.0.0.1:5000/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(tripData),
    })

    if (!res.ok) {
      throw new Error('Failed to add trip')
    }

    const newTrip = await res.json()
    trips.value.push(newTrip)
  }

  return {
    trips,
    loadTrips,
    addTriptoServer,
  }
}
