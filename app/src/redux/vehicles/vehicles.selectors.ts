import { createSelector } from "reselect";
import { RootState } from "../store";

const vehiclesState = (state: RootState) => state.vehicles;

export const selectVehicles = createSelector(
  vehiclesState,
  (state) => state.vehicles
);

export const selectVehiclesInProgress = createSelector(
  vehiclesState,
  (state) => state.inProgress
);

export const selectVehicleById = (id: string | number) =>
  createSelector(vehiclesState, selectVehicles, ({ vehicles }) =>
    vehicles.find((i) => i.id === parseInt(`${id}`))
  );
