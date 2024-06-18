import axios from "axios";
import objectToQueryParams from "../utils/objectToQueryParams";

// GET ALL LUGARES
export async function getAllLugares() {
  try {
    const { data } = await axios.get(`/lugares`);
    return data;
  } catch (error) {
    return error;
  }
}
// GET ONE LUGAR
export async function getLugar(query) {
  try {
    const { data } = await axios.get(`/lugares/${objectToQueryParams(query)}`);
    return data;
  } catch (error) {
    return error;
  }
}
