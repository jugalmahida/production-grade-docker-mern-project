import { useEffect } from "react";
import "./App.css";
import { useHealth } from "./hooks/useHealth";

function App() {
  const { checkHealth, error, loading, result } = useHealth();
  useEffect(() => {
    checkHealth();
  }, []);

  return (
    <div className="min-h-screen flex flex-col gap-5 items-center justify-center bg-gray-100">
      <div>
        Docker MERN project | Backend Status :- {loading ? "Loading ..." : " "}
        {result?.status}
      </div>
      <div>
        <a href="https://jugalmahida.com" target="_blank" className="bg-white px-3 py-2 rounded-2xl">
          Don't Click
        </a>
      </div>
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
