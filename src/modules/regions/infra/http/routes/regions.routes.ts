import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticate from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import onlyAdmin from '@modules/users/infra/http/middlewares/onlyAdmin';
import onlyDelegateAndAdmin from '@modules/users/infra/http/middlewares/onlyDelegateAndAdmin';

import RegionsController from '../controllers/RegionsController';

const regionsRouter = Router();
const regionsController = new RegionsController();

regionsRouter.use(ensureAuthenticate);

regionsRouter.get('/', onlyAdmin, regionsController.index);
regionsRouter.get('/:id', onlyDelegateAndAdmin, regionsController.show);

regionsRouter.post(
    '/',
    onlyAdmin,
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            city: Joi.string().required(),
            uf: Joi.string().required().min(2).max(2),
            responsible: Joi.string().required(),
        },
    }),
    regionsController.create,
);

regionsRouter.put('/:id', onlyAdmin, regionsController.update);
regionsRouter.delete('/:id', onlyAdmin, regionsController.delete);

export default regionsRouter;
