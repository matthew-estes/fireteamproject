import axios from "axios";

export async function getTest() {
  const { data } = await axios.get("/api/test");
  return data;
}