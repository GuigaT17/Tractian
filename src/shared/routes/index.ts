import { Router } from 'express';
import assetRouter from '../../modules/asset/routes/asset.routes';
import companyRouter from '../../modules/company/router/company.routes';
import unitRouter from '../../modules/unit/routes/unit.routes';
import userRouter from '../../modules/users/routes/user.routes';

const routes = Router();

routes.use('/company', companyRouter);
routes.use('/user', userRouter);
routes.use('/unit', unitRouter);
routes.use('/asset', assetRouter);

export default routes;