import mongoose from "mongoose";

const userSchema = mongoose.Schema({

    username : {
        type: String,
        required: true
    },
    phone : {
        type: String,
        required: true
    },
    location  : [{
        locName:{
            type: String,
        
        },
        address: {
            type: String,
            required: true
        },
        latitude: {
            type: Number,
            required: true
        },
        longitude: {
            type: Number,
            required: true
        },
        isSelected: {
            type: Boolean,
            required: true
        }
    }],
    picture : {
        type: String,
        required: true
    },
});

const userModel = mongoose.model("Users", userSchema);

export default userModel;