import mongoose from "mongoose";

const unitSchema = new mongoose.Schema({
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

const Unity = mongoose.model('Unity', unitSchema);

export default Unity;