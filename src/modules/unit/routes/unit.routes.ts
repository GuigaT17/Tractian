import express from "express";
import Company from "src/modules/company/entity/Company";
import Unit from "../entity/Unit";

const unitRouter = express.Router();

unitRouter.post('/', async (request, response) => {
    const companyId = request.body.idCompany;
    const company = await Company.findById(companyId);

    if(!company){
        throw new Error("Company does not exits");
    }
    const unit = new Unit({...request.body});
    try {
        unit.save();
        response.status(201).json(unit);
    } catch (error) {
        response.status(400).json(error);
    }
});

unitRouter.get('/:id', async (req, res) => {
    try {
        const unit = await Unit.findById(req.params.id)
        if(unit){
            res.send(unit)
        } else {
            res.status(404).send()
        }
    } catch (error) {
        res.status(500).send(error)
    }
});

unitRouter.get('/', async (req, res) => {
    try {
        const unit = await Unit.find()
        if(unit){
            res.send(unit)
        } else {
            res.status(404).send()
        }
    } catch (error) {
        res.status(500).send(error)
    }
})

export default unitRouter;