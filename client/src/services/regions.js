import axios from "axios";
import objectToQueryParams from "../utils/objectToQueryParams";

// GET ALL REGIONS
export async function getAllRegions() {
  try {
    const { data } = await axios.get(`/regions`);
    return data;
  } catch (error) {
    return error;
  }
}
// GET ONE REGION
export async function getRegion(query) {
  try {
    const { data } = await axios.get(`/regions/${objectToQueryParams(query)}`);
    return data;
  } catch (error) {
    return error;
  }
}
