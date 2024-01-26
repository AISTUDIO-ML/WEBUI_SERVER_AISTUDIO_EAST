import mongoose, { Schema } from "mongoose"

mongoose.connect("mongodb://localhost:27017/aistudio")

const UserSchema = new Schema({
    fullName: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    company: {
        type: String,
        required: true
    },
    country:{
        type: String,
        required: true
    },
    contact: {
        type: Number,
        required: true,
        default: 0
    },
    billing: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    currentPlan: {
        type: String, 
        required: true
    },
    avatar: {
        type: String,
        default: "8.png"
    },
    tax_id: {
        type: String,
    },
    language: {
        type: Array<String>,
        required: true,
        default: [ "English" ]
    },
    status: {
        type: String,
        required: true,
        default: "pending"
    },
    start_date: {
        type: Date,
        required: true,
        default: Date.now()
    },
    last_login: {
        type: Date,
        required: true,
        default: Date.now()
    }
})


export default mongoose.models.User || mongoose.model("User", UserSchema, "users")