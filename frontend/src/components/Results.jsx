import { formatDateTime, formatDuration } from "../utils/dateTime";

export default function Results({ itineraries }) {
  if (!itineraries.length) {
    return <p>No results found.</p>;
  }



  return (
    <div>
      {itineraries.map((itinerary, idx) => {
        const totalPrice = itinerary.totalPrice;
        const totalDuration = formatDuration(itinerary.totalDurationMinutes);

        return (
          <div
            key={idx}
            style={{
              border: "1px solid #ccc",
              marginBottom: 20,
              padding: 15,
              borderRadius: 6,
            }}
          >
            <h3>
              Total Duration: {totalDuration}
            </h3>
            <h3>
              Total Price: ${totalPrice}
            </h3>

            {itinerary.segments.map((segment, i) => (
              <div key={i} style={{ marginBottom: 10 }}>
                <strong>{segment.flightNumber}</strong>
                <div>
                  {segment.origin} ({formatDateTime(segment.departureTime)}) {"====>"} {segment.destination} ({formatDateTime(segment.arrivalTime)})
                </div>

                {i < itinerary.length - 1 && (
                  <p style={{ fontStyle: "italic", color: "#555" }}>
                    Layover at {segment.destination}
                  </p>
                )}
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}