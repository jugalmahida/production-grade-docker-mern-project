import { useEffect } from "react";
import "./App.css";
import { useHealth } from "./hooks/useHealth";

function App() {
  const { checkHealth, error, loading, result } = useHealth();
  useEffect(() => {
    checkHealth();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p>
        Docker MERN project | Backend Status :- {loading ? "Loading ..." : " "}
        {result?.status}
      </p>
      <div className="mt-12">
        <p> </p>
        {error && (
          <div>
            <p>{error}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
