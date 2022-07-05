import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  Booking,
  createBooking,
  CreateBookingDto,
  fetchBookings,
} from "../../services/booking.service";

interface BookingState {
  inProgress: boolean;
  error: string | null | undefined;
  data: {
    vehicle: string | number;
    start: string;
    end: string;
  };
  bookings: Booking[];
}

export const makeBooking = createAsyncThunk(
  "booking/makeBooking",
  async (data: CreateBookingDto) => {
    return createBooking(data);
  }
);

export const getAllBookings = createAsyncThunk(
  "booking/getAllBookings",
  async () => {
    return fetchBookings();
  }
);

const initialState: BookingState = {
  inProgress: false,
  error: null,
  data: {
    vehicle: -1,
    start: "",
    end: "",
  },
  bookings: [],
};

export const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setVehicle(state, action: PayloadAction<number | string>) {
      state.data.vehicle = action.payload;
    },
    setStart: {
      reducer(state, action: PayloadAction<string>) {
        state.data.start = action.payload;
      },
      prepare(date) {
        return {
          payload: date.toString() || "",
        };
      },
    },
    setEnd: {
      reducer(state, action: PayloadAction<string>) {
        state.data.end = action.payload;
      },
      prepare(date) {
        return {
          payload: date.toString() || "",
        };
      },
    },
  },
  extraReducers: (builder) => {
    builder.addCase(makeBooking.pending, (state) => {
      state.inProgress = true;
    });
    builder.addCase(makeBooking.fulfilled, (state) => {
      state.inProgress = false;
    });
    builder.addCase(makeBooking.rejected, (state, { error }) => {
      state.error = error.message;
      state.inProgress = false;
    });
    builder.addCase(getAllBookings.fulfilled, (state, { payload }) => {
      state.bookings = payload.data[0];
      state.inProgress = false;
    });
    builder.addCase(getAllBookings.rejected, (state, { error }) => {
      state.error = error.message;
      state.inProgress = false;
    });
  },
});

export const { setVehicle, setStart, setEnd } = bookingSlice.actions;

export default bookingSlice.reducer;
