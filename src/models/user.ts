import {Schema, model, models} from "mongoose";

const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: [true, "Email is required"],
        match: [
            /^(([^<>()\[\]\.,;:\s@\”]+(\.[^<>()\[\]\.,;:\s@\”]+)*)|(\”.+\”))@(([^<>()[\]\.,;:\s@\”]+\.)+[^<>()[\]\.,;:\s@\”]{2,})$/,
            "Email is not valid"
        ]
    },
    password: {
        type: String,
        required: [true, "Email is required"],
        select: false
    },
    fullname: {
        type: String,
        required: [true, "Fullname is required"],
        minLength: [3, "Full name must be at least 3 characters"],
        maxLength: [50, "Full name must be at most 50 characters"]
    },
});

const User = models.User || model("User", userSchema);
export default User;