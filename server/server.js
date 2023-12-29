import express from "express"; 
import dotenv from "dotenv";
import cors from 'cors';

// ROUTES
import UserRoutes from "./routes/Users/usersRoutes.js";
import OrderRoutes from "./routes/Orders/orderRoutes.js"

// DATABASE CONNECTION
import { initDatabase } from './database.js'

const app = express();
dotenv.config();  
initDatabase();

const PORT = 5174;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`http://localhost:${PORT}`)
});
app.use(cors({
    origin: [
        'http://localhost:5173'
    ],  // THE HTTP(ORIGIN) THAT WILL ALLOW TO ACCESS THE ROUTES
    credentials: true,
}));

// USE ROUTES
app.use('/api', UserRoutes);
app.use('/api', OrderRoutes);


//MIDDLEWARE
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));