const express = require("express");
const cors = require("cors");
const searchRoutes = require("./routes/search.js");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/search", searchRoutes);

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});