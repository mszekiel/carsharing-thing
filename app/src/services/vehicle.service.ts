import axios from "axios";

const API_URL = `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/api`;

export type Vehicle = {
  readonly id: number;
  readonly name: string;
  readonly shortDescription: string;
  readonly description?: string;
  readonly image: string;
};

export type FindVehiclesDto = {
  readonly vehicles: Vehicle[];
  readonly count: number;
};

type QueryLimit = {
  limit?: number;
  offset?: number;
};

export function getVehicles(query?: QueryLimit) {
  return axios
    .get<FindVehiclesDto>(`${API_URL}/vehicles`, {
      params: query,
      headers: { "Access-Control-Allow-Origin": "*" },
    })
    .then((res) => res.data);
}

export function getDetails(id: number | string) {
  return axios
    .get<Vehicle>(`${API_URL}/vehicles/${id}`, {
      headers: { "Access-Control-Allow-Origin": "*" },
    })
    .then((res) => res.data);
}
