import { createSelector } from "reselect";
import { RootState } from "../store";

const bookingState = (state: RootState) => state.booking;

export const selectData = createSelector(bookingState, ({ data }) => ({
  ...data,
  start: data.start ? new Date(data.start) : "",
  end: data.end ? new Date(data.end) : "",
}));

export const selectBookings = createSelector(
  bookingState,
  (state) => state.bookings
);
