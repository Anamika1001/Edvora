import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  nearest_rides: [],
  past_rides: [],
  upcoming_rides: [],
  rides: [],
  states: [],
  city: []
};

export const Reducer = createSlice({
  name: "counter",
  initialState,
  reducers: {
    updateRides: (state, action) => {
      state.rides = action.payload.sort((a, b) => (a.distance > b.distance) ? 1 : -1);
    },
    updateAllRides: (state) => {
      var tempData2 = [];
      var tempData3 = [];
      var tempState = [];
      var tempCity = [];
      var dtToday = new Date();
      var data = state.rides
      for (var i = 0, l = data.length; i < l; i++) {
        if (!tempState.includes(data[i].state)) {
          tempState.push(data[i].state);
        }
        if (!tempCity.includes(data[i].city)) {
          tempCity.push(data[i].city);
        }
        if (new Date(data[i].date) - dtToday > 0) {
          tempData2.push(data[i]);
        } else {
          tempData3.push(data[i]);
        }
      }
      state.upcoming_rides = tempData2
      state.past_rides = tempData3
      state.nearest_rides = state.rides
      state.states = tempState.sort()
      state.city = tempCity.sort()
    },
    updateStateWiseRide: (state, action) => {
      let state_ = action.payload
      let any = action.payload == "State"
      var tempData1 = [];
      var tempData2 = [];
      var tempData3 = [];
      var tempCity = [];
      var dtToday = new Date();
      var data = state.rides
      for (var i = 0, l = data.length; i < l; i++) {
        if(data[i].state == state_ || any){
          tempData1.push(data[i]);
          if (!tempCity.includes(data[i].city)) {
            tempCity.push(data[i].city);
          }
          if (new Date(data[i].date) - dtToday > 0) {
            tempData2.push(data[i]);
          } else {
            tempData3.push(data[i]);
          }
        }
      }
      state.upcoming_rides = tempData2
      state.past_rides = tempData3
      state.nearest_rides = tempData1
      state.city = tempCity.sort()
      
    },
    updateCityWiseRide: (state, action) => {
      let city = action.payload
      let any = action.payload == "City"
      var tempData1 = [];
      var tempData2 = [];
      var tempData3 = [];
      var dtToday = new Date();
      var data = state.rides
      for (var i = 0, l = data.length; i < l; i++) {
        if(data[i].city == city || any){
          tempData1.push(data[i]);
          if (new Date(data[i].date) - dtToday > 0) {
            tempData2.push(data[i]);
          } else {
            tempData3.push(data[i]);
          }
        }
      }
      state.upcoming_rides = tempData2
      state.past_rides = tempData3
      state.nearest_rides = tempData1
      
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  updateRides,
  updateAllRides,
  updateStateWiseRide,
  updateCityWiseRide
} = Reducer.actions;

export default Reducer.reducer;
