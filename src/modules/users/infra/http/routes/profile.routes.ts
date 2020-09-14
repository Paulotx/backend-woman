import { Router } from 'express';

import ensureAuthenticate from '../middlewares/ensureAuthenticated';
import ProfileController from '../controllers/ProfileController';

const profileRouter = Router();
const usersController = new ProfileController();

profileRouter.use(ensureAuthenticate);

profileRouter.get('/', usersController.show);
profileRouter.put('/', usersController.update);

export default profileRouter;
