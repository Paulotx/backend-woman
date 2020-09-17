import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticate from '../middlewares/ensureAuthenticated';
import ProfileController from '../controllers/ProfileController';

const profileRouter = Router();
const usersController = new ProfileController();

profileRouter.use(ensureAuthenticate);

profileRouter.get('/', usersController.show);
profileRouter.put(
    '/',
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            old_password: Joi.string().optional(),
            password: Joi.string(),
            password_confirmation: Joi.string().valid(Joi.ref('password')),
        },
    }),
    usersController.update,
);

export default profileRouter;
