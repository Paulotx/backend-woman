import { Router } from 'express';

import ensureAuthenticate from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import onlyDelegateAndAdmin from '@modules/users/infra/http/middlewares/onlyDelegateAndAdmin';

import ReportsSpecificController from '../controllers/ReportsSpecificController';
import ReportsGeneralController from '../controllers/ReportsGeneralController';

const regionsRouter = Router();
const reportsSpecificController = new ReportsSpecificController();
const reportsGeneralController = new ReportsGeneralController();

regionsRouter.use(ensureAuthenticate);
regionsRouter.use(onlyDelegateAndAdmin);

regionsRouter.get('/specific', reportsSpecificController.index);
regionsRouter.get('/general', reportsGeneralController.index);

export default regionsRouter;
