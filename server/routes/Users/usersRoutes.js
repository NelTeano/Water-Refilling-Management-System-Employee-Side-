import { Router } from "express";
import userModel from "../../models/Users.js";

const UserRoutes = Router()

// GET ALL THE USERS
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

// FIND ONE USER
UserRoutes.get('/users/:username', async (req, res) => {

    const username = req.params.username;

    try {
        
        const findUser = await userModel.findOne({username: username});

        if(!findUser){
            res.status(500).json({ message: "Fetch Users Failed " });
            console.log("Cant find User")
        }

        console.log(findUser)
        res.send(findUser);
        console.log("Successfully get the User")
        
    } catch (error) {
        res.status(500).json({ message: "Fetch User Failed " , error });
        console.log("Fetch User")
    }
})



export default UserRoutes