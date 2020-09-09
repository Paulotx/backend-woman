import { Router } from 'express';

import ensureAuthenticate from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import onlyDelegateAndAdmin from '@modules/users/infra/http/middlewares/onlyDelegateAndAdmin';

import ComplaintsController from '../controllers/ComplaintsController';

const complaintsRouter = Router();
const complaintsController = new ComplaintsController();

complaintsRouter.use(ensureAuthenticate);

complaintsRouter.post('/', complaintsController.create);
complaintsRouter.put('/', onlyDelegateAndAdmin, complaintsController.update);

export default complaintsRouter;
