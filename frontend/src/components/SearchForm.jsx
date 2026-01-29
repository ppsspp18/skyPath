import { useState } from "react";

export default function SearchForm({ onSearch, loading }) {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!origin || !destination || !date) {
      setError("All fields are required");
      return;
    }

    if (origin === destination) {
      setError("Origin and destination cannot be the same");
      return;
    }

    setError("");
    onSearch({ origin, destination, date });
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
      <div>
        <input
          placeholder="Origin (e.g. JFK)"
          value={origin}
          onChange={(e) => setOrigin(e.target.value.toUpperCase())}
        />
      </div>

      <div>
        <input
          placeholder="Destination (e.g. LAX)"
          value={destination}
          onChange={(e) => setDestination(e.target.value.toUpperCase())}
        />
      </div>

      <div>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <button type="submit" disabled={loading}>
        {loading ? "Searching..." : "Search Flights"}
      </button>
    </form>
  );
}