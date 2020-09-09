import { Router } from 'express';

import ensureAuthenticate from '../middlewares/ensureAuthenticated';
import onlyAdmin from '../middlewares/onlyAdmin';
import UserssController from '../controllers/UsersController';

const usersRouter = Router();

usersRouter.use(ensureAuthenticate);
usersRouter.use(onlyAdmin);

const usersController = new UserssController();

// usersRouter.get('/', async (request, response) => {
//     const users = await usersRepository.find();

//     return response.json(users);
// });

usersRouter.post('/', usersController.create);

usersRouter.put('/:id', usersController.update);

usersRouter.delete('/:id', usersController.delete);

export default usersRouter;
