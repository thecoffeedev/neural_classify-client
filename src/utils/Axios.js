import axios from "axios";
import ENVS from "../../env.config";

export default axios.create({
  baseURL: ENVS.BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
