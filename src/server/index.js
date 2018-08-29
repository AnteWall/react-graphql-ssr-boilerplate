import dotenv from "dotenv";
import express from "express";
import chalk from "chalk";
dotenv.config();
import ServerRoot from "./ServerRoot";

const app = express();

const serveFolders = ["build/client", "public"];

serveFolders.forEach(folder => {
  app.use(express.static(folder));
});

app.get("*", ServerRoot);

if (!process.env.DEV_SERVER) {
  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => {
    console.log(
      chalk`{green
  🚀 Started Production Server 🚀
  ____________________________

}`
    );
  });
}

export default app;
