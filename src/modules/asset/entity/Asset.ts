import mongoose from "mongoose";
import Status from "./Status";

const assetSchema = new mongoose.Schema({
    idCompany: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Company'
    },
    idUnit: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Unit'
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    model: {
        type: String,
        required: true,
        trim: true,
    },
    owner: {
        type: String,
        required: true,
        trim: true,
    },
    status: {
        type: String,
        enum: ["Running", "Alerting", "Stopped"],
        required: true,
    },
    healthLevel: {
        type: Number,
        validate(value: number){
            if(value < 0 || value > 100){
                throw new Error('Health value must be between 0 and 100')
            }
        }
    }
});

const Asset = mongoose.model('Asset', assetSchema);

export default Asset;