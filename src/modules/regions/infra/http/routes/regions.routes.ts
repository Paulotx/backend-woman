import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticate from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import onlyAdmin from '@modules/users/infra/http/middlewares/onlyAdmin';

import RegionsController from '../controllers/RegionsController';

const regionsRouter = Router();
const regionsController = new RegionsController();

regionsRouter.use(ensureAuthenticate);
regionsRouter.use(onlyAdmin);

regionsRouter.post(
    '/',
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

export default regionsRouter;
