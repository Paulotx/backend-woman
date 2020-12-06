import { Router } from 'express';

import ensureAuthenticate from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import ReportsController from '../controllers/ReportsController';

const regionsRouter = Router();
const regionsController = new ReportsController();

regionsRouter.use(ensureAuthenticate);

regionsRouter.get('/', regionsController.index);

export default regionsRouter;
