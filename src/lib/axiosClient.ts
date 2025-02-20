import { env } from "@/config/env";
import axios from "axios";

export const axiosClient = axios.create({
  baseURL: env.apiUrl,
});
