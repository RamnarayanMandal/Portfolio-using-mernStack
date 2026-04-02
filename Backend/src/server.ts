import dotenv from "dotenv";
import connectDb from "./db/connection.js";
import { createApp } from "./app.js";

async function main(): Promise<void> {
  dotenv.config();
  await connectDb();
  const app = createApp();
  const PORT = Number(process.env.PORT) || 8080;
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running on port number ${PORT}`);
  });
}

void main();
