import express from "express";
import Asset from "src/modules/asset/entity/Asset";
import Unity from "src/modules/unit/entity/Unit";
import User from "src/modules/users/entity/User";
import Company from "../entity/Company";

const companyRouter = express.Router();

companyRouter.post('/', async (request, response) => {
    const company = new Company({...request.body});
    try {
        company.save();
        response.status(201).json(company);
    } catch (error) {
        response.status(400).json(error);
    }
});

companyRouter.get('/:id', async (req, res) => {
    try {
        const company = await Company.findById(req.params.id)
        if(company){
            if(req.query.show){
                const query = {"idCompany": company.id};
                const assets = await Asset.find(query);

                const units = await Unity.find(query);

                return res.json({company, assets, units});
            } else {
                res.send(company)
            }
        }
        res.status(404).send()
    } catch (error) {
        res.status(500).send(error)
    }
});

companyRouter.get('/', async (req, res) => {
    try {
        const company = await Company.find()
        if(company){
            res.send(company)
        } else {
            res.status(404).send()
        }
    } catch (error) {
        res.status(500).send(error)
    }
})

companyRouter.put('/:id', async (req, res) => {
    try {
        const company = await Company.findById(req.params.id);
        if(company){
            company.name = req.body.name;
            await company.save();
            res.send(company);
        } else {
            res.status(404).send();
        }
    } catch (error) {
        res.status(500).send(error);
    }
});

companyRouter.delete('/:id', async (req, res) => {
    try {
        const company = await Company.findById(req.params.id);
        if(company){
            await Asset.deleteMany({"idCompany": company.id})
            await User.deleteMany({"idCompany": company.id})
            await Unity.deleteMany({"idCompany": company.id})
            await company.delete();
            res.status(204).send();
        } else {
            res.status(404).send();
        }
    } catch (error) {
        res.status(500).send(error);
    }
});

export default companyRouter;