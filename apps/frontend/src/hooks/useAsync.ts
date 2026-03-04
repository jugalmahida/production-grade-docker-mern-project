import { useState } from "react";
import { asyncHandler } from "@/utils/asyncHandler";

export function useAsync<T>() {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const run = (fn: () => Promise<T>) =>
    asyncHandler(fn, { setData, setError, setLoading });

  return { data, error, loading, run };
}
