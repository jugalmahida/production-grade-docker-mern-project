import { useAsync } from "@/hooks/useAsync";
import { apiService } from "@/services/ApiServices";

interface HealthResult {
  status: string;
}

export const useHealth = () => {
  const { data, error, loading, run } = useAsync<HealthResult>();

  const checkHealth = () => run(() => apiService.healthCheck());

  return { checkHealth, result: data, error, loading };
};
