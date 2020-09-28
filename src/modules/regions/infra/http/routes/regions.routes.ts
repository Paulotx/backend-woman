import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticate from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import onlyAdmin from '@modules/users/infra/http/middlewares/onlyAdmin';

import RegionsController from '../controllers/RegionsController';
import LinkUserRegionController from '../controllers/LinkUserRegionController';

const regionsRouter = Router();
const regionsController = new RegionsController();
const linkUserRegionController = new LinkUserRegionController();

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

regionsRouter.post(
    '/link-user',
    celebrate({
        [Segments.BODY]: {
            user_id: Joi.string().required(),
            region_id: Joi.string().required(),
        },
    }),
    linkUserRegionController.create,
);

export default regionsRouter;
