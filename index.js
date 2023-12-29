import { app } from "./app.js";
import connectDB from "./db/index.js";
import ApiError from "./utility/ApiError.js";
const PORT = process.env.PORT || 8000;
connectDB().then(() => {
  app.on("error", (error) => {
    console.log(`Error: ${error.message}`);
    throw new ApiError(500, error.message);
  });
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
