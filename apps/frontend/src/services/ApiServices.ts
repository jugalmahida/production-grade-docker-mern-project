import { apiClient } from "@/services/ApiClient";

class ApiService {
  async healthCheck() {
    const result = await apiClient.get("/health");
    return result.data;
  }
}

export const apiService = new ApiService();
