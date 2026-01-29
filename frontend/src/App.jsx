import { useState } from "react";
import SearchForm from "./components/SearchForm";
import Results from "./components/Results";
import { searchFlights } from "./api/searchApi";

function App() {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");

  const handleSearch = async (params) => {
    setLoading(true);
    setError("");
    setResults([]);

    try {
      const data = await searchFlights(params);
      setResults(data);
    } catch (err) {
      setError(
        err.response?.data?.error || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>SkyPath Flight Search</h2>

      <SearchForm onSearch={handleSearch} loading={loading} />

      {error && <p style={{ color: "red" }}>{error}</p>}

      <Results itineraries={results} />
    </div>
  );
}

export default App;