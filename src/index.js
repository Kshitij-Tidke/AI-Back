import app from "./app.js";
import dotenv from "dotenv";

dotenv.config();
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
}).on("error", (err) => {
  console.error("Server failed to start:", err.message);
});
