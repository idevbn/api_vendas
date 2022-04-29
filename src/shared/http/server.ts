import express from "express";
import cors from "cors";
import { routes } from "./routes";

const app = express();

const url = "http://localhost:";
const PORT = process.env.PORT || 3333;

app.use(cors());
app.use(express.json());

app.use(routes);

app.listen(PORT, () => {
  console.log(
    `Server running on port - ${PORT}. \nGet access here: ${url}${PORT}`,
  );
});
