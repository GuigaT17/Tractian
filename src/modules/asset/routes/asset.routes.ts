import express from "express";
import Company from "../../../modules/company/entity/Company";
import Unit from "../../../modules/unit/entity/Unit";
import Asset from "../entity/Asset";

const assetRouter = express.Router();

assetRouter.post('/', async (request, response) => {
    const companyId = request.body.idCompany;
    const company = await Company.findById(companyId);

    if(!company){
        throw new Error("Company does not exits");
    }

    const unitId = request.body.idUnit;
    const unit = await Unit.findById(unitId);

    if(!unit){
        throw new Error("Unit does not exits");
    }

    if(request.body.healthLevel < 0 || request.body.healthLevel > 100){
        throw new Error("Health level must be between 0 and 100");
    }

    if(unit.idCompany.toString() != company.id){
        throw new Error("Company id has to be the same to unit company id");
    }

    if(!(request.body.status == "Running" || request.body.status == "Alerting" || request.body.status == "Stopped")){
        throw new Error("Status has to be Running, Alerting or Stopped");
    }

    const asset = new Asset({...request.body});
    try {
        asset.save();
        response.status(201).json(asset);
    } catch (error) {
        response.status(400).json(error);
    }
});

assetRouter.get('/:id', async (req, res) => {
    try {
        const asset = await Asset.findById(req.params.id);
        if(asset){
            res.send(asset);
        } else {
            res.status(404).send();
        }
    } catch (error) {
        res.status(500).send(error);
    }
});

assetRouter.get('/', async (req, res) => {
    try {
        const asset = await Asset.find();
        if(asset){
            res.send(asset);
        } else {
            res.status(404).send();
        }
    } catch (error) {
        res.status(500).send(error);
    }
});

assetRouter.put('/:id', async (req, res) => {

    if(req.body.healthLevel < 0 || req.body.healthLevel > 100){
        throw new Error("Health level must be between 0 and 100");
    }

    if(!(req.body.status == "Running" || req.body.status == "Alerting" || req.body.status == "Stopped")){
        throw new Error("Status has to be Running, Alerting or Stopped");
    }
    
    try {
        const asset = await Asset.findById(req.params.id);
        if(asset){
            if(req.body.name){
                asset.name = req.body.name;
            }
            if(req.body.healthLevel){
                asset.healthLevel = req.body.healthLevel;
            }
            if(req.body.status){
                asset.status = req.body.status;
            }
            if(req.body.model){
                asset.model = req.body.model;
            }
            if(req.body.owner){
                asset.owner = req.body.owner;
            }
            await asset.save();
            res.send(asset);
        } else {
            res.status(404).send();
        }
    } catch (error) {
        res.status(500).send(error);
    }
});

assetRouter.delete('/:id', async (req, res) => {
    try {
        const asset = await Asset.findById(req.params.id);
        if(asset){
            await asset.delete();
            res.status(204).send();
        } else {
            res.status(404).send();
        }
    } catch (error) {
        res.status(500).send(error);
    }
});

export default assetRouter;