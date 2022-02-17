import { Router } from 'express';
import assetRouter from 'src/modules/asset/routes/asset.routes';
import companyRouter from 'src/modules/company/router/company.routes';
import unitRouter from 'src/modules/unit/routes/unit.routes';
import userRouter from 'src/modules/users/routes/user.routes';

const routes = Router();

routes.use('/company', companyRouter);
routes.use('/user', userRouter);
routes.use('/unit', unitRouter);
routes.use('/asset', assetRouter);

export default routes;