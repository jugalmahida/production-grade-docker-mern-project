// interface AsyncState<T> {
//   data: T | null;
//   error: string | null;
//   loading: boolean;
// }

type SetState<T> = {
  setData: (data: T | null) => void;
  setError: (error: string | null) => void;
  setLoading: (loading: boolean) => void;
};

export async function asyncHandler<T>(
  fn: () => Promise<T>,
  { setData, setError, setLoading }: SetState<T>,
): Promise<void> {
  try {
    setError(null);
    setLoading(true);
    const data = await fn();
    setData(data);
  } catch (error) {
    setError(error instanceof Error ? error.message : "An error occurred");
  } finally {
    setLoading(false);
  }
}
