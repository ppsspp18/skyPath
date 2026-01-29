import axios from "axios";

const API_BASE = "http://localhost:4000";

export const searchFlights = async ({ origin, destination, date }) => {
  const response = await axios.get(`${API_BASE}/search`, {
    params: { origin, destination, date },
  });
  return response.data;
};