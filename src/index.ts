import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./services/routes";
import errorHandler from "./services/middlewares/errorHandler";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use(routes);
app.use(errorHandler);


app.listen(PORT, () => {
    console.log(`Service is running on Port : ${PORT}`);
});