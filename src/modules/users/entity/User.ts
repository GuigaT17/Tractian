import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    idCompany: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Company'
    },
    name: {
        type: String,
        required: true,
        trim: true,
    }
});

const User = mongoose.model('User', userSchema);

export default User;