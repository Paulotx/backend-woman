import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticate from '../middlewares/ensureAuthenticated';
import onlyAdmin from '../middlewares/onlyAdmin';
import UsersController from '../controllers/UsersController';

const usersRouter = Router();

usersRouter.use(ensureAuthenticate);
usersRouter.use(onlyAdmin);

const usersController = new UsersController();

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

export default usersRouter;
