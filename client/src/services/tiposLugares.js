import axios from "axios";

// GET ALL TIPOS LUGARES
export async function getTiposLugares() {
  try {
    const { data } = await axios.get(`/tipoLugar`);
    return data;
  } catch (error) {
    return error;
  }
}
