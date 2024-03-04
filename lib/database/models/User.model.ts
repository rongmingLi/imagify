//clerkId,email,username,photo,firstName,lastName,planId,creditBalance

import {Schema, model, models} from 'mongoose'; 
// Define the schema for the clerk document
const clerkSchema = new Schema({
    clerkId: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    photo: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    planId: {
        type: Number,
        default:1,
    },
    creditBalance: {
        type: Number,
        default: 10
    }
});

// Create a User model from the schema
const User = models?.User || model('User', clerkSchema);

export default User;
