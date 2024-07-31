import axios from "axios";
import objectToQueryParams from "../utils/objectToQueryParams";

// GET ONE EXHIBICION
export async function getExhibicion(exhibicionId) {
  try {
    const { data } = await axios.get(
      `/exhibiciones/${objectToQueryParams({ exhibicionId })}`
    );
    return data;
  } catch (error) {
    return error;
  }
}
