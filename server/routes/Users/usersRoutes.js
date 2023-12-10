import { Router } from "express";
import userModel from "../../models/Users.js";

const UserRoutes = Router()


UserRoutes.get('/users', async (req, res)=>{
    try {
        
        const getUsers = await userModel.find({});
        console.log(getUsers)
        res.send(getUsers);
        console.log("Successfully get the Users")
        
    } catch (error) {
        res.status(500).json({ message: "Fetch Users Failed " , error });
        console.log("Fetch Users")
    }
});



export default UserRoutes