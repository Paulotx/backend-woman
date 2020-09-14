import { Router } from 'express';

import ensureAuthenticate from '../middlewares/ensureAuthenticated';
import onlyAdmin from '../middlewares/onlyAdmin';
import UsersController from '../controllers/UsersController';

const usersRouter = Router();

usersRouter.use(ensureAuthenticate);
usersRouter.use(onlyAdmin);

const usersController = new UsersController();

usersRouter.get('/', usersController.index);

usersRouter.post('/', usersController.create);

usersRouter.put('/:id', usersController.update);

usersRouter.delete('/:id', usersController.delete);

export default usersRouter;
