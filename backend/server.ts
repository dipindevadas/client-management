import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import clientRouter from "./routes/clients";


const app = express();
dotenv.config();

app.use(cors()); // Enable CORS for all routes
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.send('Hello world');
});

app.use('/api/v1/clients', clientRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});




