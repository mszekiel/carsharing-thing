import axios from "axios";

const API_URL = `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/api`;

export type CreateBookingDto = {
  vehicle: string | number;
  start: string | Date;
  end: string | Date;
};

export type Booking = {
  id: number;
  vehicle: number;
  start: string;
  end: string;
};

export function createBooking(data: CreateBookingDto) {
  return axios.post(`${API_URL}/booking`, {
    vehicle: parseInt(`${data.vehicle}`),
    start: new Date(data.start).toISOString(),
    end: new Date(data.start).toISOString(),
  });
}

export function fetchBookings() {
  return axios.get<[Booking[], number]>(`${API_URL}/booking`);
}
