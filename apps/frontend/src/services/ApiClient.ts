import axios from "axios";
import AppConstants from "@/constants/AppConstants";

export const apiClient = axios.create({
  baseURL: AppConstants.productionUrl,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
