import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  Vehicle,
  getVehicles,
  getDetails,
} from "../../services/vehicle.service";

interface VehiclesState {
  inProgress: boolean;
  error: string | null | undefined;
  vehicles: Vehicle[];
}

const initialState: VehiclesState = {
  inProgress: false,
  error: null,
  vehicles: [],
};

export const fetchAll = createAsyncThunk("vehicles/fetchAll", async () => {
  const vehicles = await getVehicles();
  return vehicles;
});

export const fetchDetails = createAsyncThunk(
  "vehicles/fetchDetails",
  async (id: number | string) => {
    const details = await getDetails(id);
    return details;
  }
);

export const vehiclesSlice = createSlice({
  name: "vehicles",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAll.pending, (state) => {
      state.inProgress = true;
    });
    builder.addCase(fetchAll.fulfilled, (state, { payload }) => {
      state.vehicles = payload.vehicles;
      state.inProgress = false;
    });
    builder.addCase(fetchAll.rejected, (state, { error }) => {
      state.error = error.message;
      state.inProgress = false;
    });
    builder.addCase(fetchDetails.fulfilled, (state, { payload }) => {
      const index = state.vehicles.findIndex((i) => i.id === payload.id);
      if (index > -1) {
        state.vehicles.splice(index, 1, payload);
      } else {
        state.vehicles.push(payload);
      }
    });
  },
});

// export const {} = vehiclesSlice.actions;

export default vehiclesSlice.reducer;
