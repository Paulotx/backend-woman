import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticate from '../middlewares/ensureAuthenticated';
import onlyAdmin from '../middlewares/onlyAdmin';
import UsersController from '../controllers/UsersController';
import LinkUserRegionController from '../controllers/LinkUserRegionController';

const usersRouter = Router();

usersRouter.use(ensureAuthenticate);
usersRouter.use(onlyAdmin);

const usersController = new UsersController();
const linkUserRegionController = new LinkUserRegionController();

usersRouter.get('/', usersController.index);

usersRouter.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            perfil: Joi.string().required(),
        },
    }),
    usersController.create,
);

usersRouter.put(
    '/:id',
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        },
    }),
    usersController.update,
);

usersRouter.delete(
    '/:id',
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        },
    }),
    usersController.delete,
);

usersRouter.post(
    '/link-region',
    celebrate({
        [Segments.BODY]: {
            user_id: Joi.string().required(),
            region_id: Joi.string().required(),
        },
    }),
    linkUserRegionController.create,
);

export default usersRouter;
