import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import vehiclesReducer from "./vehicles/vehicles.slice";
import bookingReducer from "./booking/booking.slice";

export const store = configureStore({
  reducer: {
    vehicles: vehiclesReducer,
    booking: bookingReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
