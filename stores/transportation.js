import { defineStore } from 'pinia'

export const useMyTransportationStore = defineStore({
  id: 'myTransportationStore',
  state: () => ({ 
    stages:[],
    vehicles:[],
  }),
  actions: {
    addStage(stageName){
      const newStage = {
        name:stageName,
        passagersQueue : [],
        vehicleQueue:[],
      };
      this.stages.push();
    },
    addVehicle(vehicle){
      this.vehicles.push(vehicle);
    },
    addPassangerToStage(stageIndex, passenger){
      if (this.stages[stageIndex]){
        this.stages[stageIndex].passagersQueue.push(passenger);
      }
    },
    dispatchVehicle(startIndex){
      const stage = this.stage[startIndex];
      if(stage){
        const vehicle = this.vehicles.shift(); // get the first vehicle in this shift 

        if (vehicle && stage.passagersQueue.length >0)
        {
          console.log(`${vehicle.name} picking up ${stage.passagersQueue.length} passangers at ${stage.name} `);
          stage.passagersQueue=[];
        }

      }
    }
    
  }
})
