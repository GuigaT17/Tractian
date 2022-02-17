import express from "express";
import Company from "../../../modules/company/entity/Company";
import User from "../entity/User";

const userRouter = express.Router();

userRouter.post('/', async (request, response) => {
    const companyId = request.body.idCompany;
    const company = await Company.findById(companyId);

    if(!company){
        throw new Error("Company does not exits");
    }

    const user = new User({...request.body});
    try {
        await user.save();
        response.status(201).json(user);
    } catch (error) {
        response.status(400).json(error);
    }
});

userRouter.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if(user){
            res.send(user);
        } else {
            res.status(404).send();
        }
    } catch (error) {
        res.status(500).send(error);
    }
});

userRouter.get('/', async (req, res) => {
    try {
        const user = await User.find();
        if(user){
            res.send(user);
        } else {
            res.status(404).send();
        }
    } catch (error) {
        res.status(500).send(error);
    }
})

userRouter.put('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if(user){
            user.name = req.body.name;
            await user.save();
            res.send(user);
        } else {
            res.status(404).send();
        }
    } catch (error) {
        res.status(500).send(error);
    }
});

userRouter.delete('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if(user){
            await user.delete();
            res.status(204).send();
        } else {
            res.status(404).send();
        }
    } catch (error) {
        res.status(500).send(error);
    }
});

export default userRouter;