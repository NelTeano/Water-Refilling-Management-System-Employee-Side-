import express from "express"; 
import dotenv from "dotenv";
import cors from 'cors';

// DATABASE CONNECTION
import { initDatabase } from './database.js'

const app = express();
dotenv.config();  
initDatabase();

const PORT = 5174;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
app.use(cors({
    origin: [
        'http://localhost:5173'
    ],  // THE HTTP(ORIGIN) THAT WILL ALLOW TO ACCESS THE ROUTES
    credentials: true,
}));


//MIDDLEWARE
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));