# SkyPath

SkyPath is a flight search engine that helps users find itineraries between airports, handling direct flights and connections with valid layover logic.

## How to Run the Application

To set up and run the application locally, follow these steps:

1.  **Clone the repository**
    ```bash
    git clone https://github.com/ppsspp18/skyPath
    ```

2.  **Navigate to the project directory**
    ```bash
    cd skyPath
    ```

3.  **Start the application**
    Run the following command to build and start the Docker containers for both the frontend and backend:
    ```bash
    docker-compose up --build
    ```

The application will be accessible at:
* **Frontend:** `http://localhost:3000`
* **Backend API:** `http://localhost:4000`

---

## Architecture Decisions

### 1. Backend: Node.js & Express
* **Decision:** Built using a lightweight Express server to handle API requests.
* **Why:** Provides a simple, non-blocking environment suitable for handling I/O operations like reading flight data and processing search requests.

### 2. Search Algorithm: Depth-First Search (DFS)
* **Decision:** The core search logic uses a recursive Depth-First Search algorithm `dfs(path)` to explore potential flight connections.
* **Why:** DFS allows us to easily track the current "path" (itinerary) being built. It enables straightforward validation of constraints at each step (e.g., checking if the layover time is valid before proceeding to the next flight).

### 3. Data Storage: In-Memory JSON
* **Decision:** Flight and airport data is loaded directly from a JSON file into memory at startup.
* **Why:** This eliminates the need for database setup for this prototype, ensuring fast read access and simplifying the deployment process.

### 4. Constraints & Validation
* **Decision:** Implemented strict business logic for connections:
    * **Maximum segments:** Limited to 3 segments (2 stops) to prevent infinite loops and unrealistic itineraries.
    * **Layover Times:** Enforced minimum connection times (45 mins domestic, 90 mins international) and a maximum layover of 6 hours.
* **Why:** Ensures that the generated itineraries are physically flyable and practical for passengers.

---

## Trade-offs Considered

* **In-Memory vs. Database:**
    * *Trade-off:* Loading `flights.json` into memory is extremely fast for small datasets but is not scalable. It consumes server RAM and requires a restart to update data.
    * *Decision:* For the current scope, simplicity and read-speed were prioritized over scalability.

* **DFS vs. Graph Database/Shortest Path Algorithms:**
    * *Trade-off:* DFS explores all possibilities and can be computationally expensive (`O(b^d)`). Algorithms like Dijkstra's or A* are better for finding the *shortest* path, but we needed *all* valid paths sorted by duration.
    * *Decision:* Given the depth limit of 3, DFS is performant enough and easier to implement with custom layover logic than configuring a graph database (like Neo4j).

* **Filtering Strategy:**
    * *Trade-off:* We filter flights by date and origin *before* starting the DFS.
    * *Decision:* This reduces the search space significantly compared to traversing the entire flight list, trading a small upfront cost for faster search execution.

---

## Future Improvements

If more time were available, the following improvements would be prioritized:

1.  **Database Integration:** Migrate from `flights.json` to a relational database (PostgreSQL) or a graph database to handle thousands of flights efficiently.
2.  **Caching:** Implement Redis caching for popular search queries (e.g., "NYC to LON") to reduce server load.
3.  **Enhanced Sorting & Filtering:** Allow users to sort by price or number of stops, not just duration (currently hardcoded to sort by duration).
4.  **Unit & Integration Tests:** Add a test suite (using Jest) to verify the layover logic and search algorithm edge cases.
