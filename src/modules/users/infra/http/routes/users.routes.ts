import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticate from '../middlewares/ensureAuthenticated';
import onlyAdmin from '../middlewares/onlyAdmin';
import UsersController from '../controllers/UsersController';
import LinkUserRegionController from '../controllers/LinkUserRegionController';

const usersRouter = Router();

usersRouter.use(ensureAuthenticate);

const usersController = new UsersController();
const linkUserRegionController = new LinkUserRegionController();

usersRouter.get('/', onlyAdmin, usersController.index);
usersRouter.get('/:id', onlyAdmin, usersController.show);

usersRouter.post(
    '/',
    onlyAdmin,
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
    onlyAdmin,
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        },
    }),
    usersController.update,
);

usersRouter.delete(
    '/:id',
    onlyAdmin,
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        },
    }),
    usersController.delete,
);

usersRouter.post(
    '/link-region',
    onlyAdmin,
    celebrate({
        [Segments.BODY]: {
            user: Joi.string().required(),
            region: Joi.string().required(),
        },
    }),
    linkUserRegionController.create,
);

usersRouter.get('/link-region/:id', linkUserRegionController.index);
usersRouter.delete(
    '/link-region/:user_id/:region_id',
    onlyAdmin,
    linkUserRegionController.delete,
);

export default usersRouter;
