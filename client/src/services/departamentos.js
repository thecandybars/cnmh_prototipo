import axios from "axios";
import objectToQueryParams from "../utils/objectToQueryParams";

// GET ALL DEPARTAMENTOS
export async function getAllDepartamentos() {
  try {
    const { data } = await axios.get(`/departamentos`);
    return data;
  } catch (error) {
    return error;
  }
}
// GET ONE DEPARTAMENTO
export async function getDepartamento(query) {
  try {
    const { data } = await axios.get(
      `/departamentos/${objectToQueryParams(query)}`
    );
    return data;
  } catch (error) {
    return error;
  }
}
