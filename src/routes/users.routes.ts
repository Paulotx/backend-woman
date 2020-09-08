import { Router } from 'express';
import { getRepository } from 'typeorm';

import User from '../models/User';

import CreateUsersService from '../services/CreateUsersService';
import UpdateUsersService from '../services/UpdateUsersService';
import DeleteUsersService from '../services/DeleteUsersService';

import ensureAuthenticate from '../middlewares/ensureAuthenticated';
import onlyAdmin from '../middlewares/onlyAdmin';

const usersRouter = Router();

usersRouter.use(ensureAuthenticate);
usersRouter.use(onlyAdmin);

usersRouter.get('/', async (request, response) => {
    const usersRepository = getRepository(User);
    const users = await usersRepository.find();

    return response.json(users);
});

usersRouter.post('/', async (request, response) => {
    const { name, email, perfil, password } = request.body;

    const createUser = new CreateUsersService();

    const user = await createUser.execute({
        name,
        email,
        perfil,
        password,
    });

    delete user.password;

    return response.json(user);
});

usersRouter.put('/:id', async (request, response) => {
    const { id } = request.params;
    const { name, email, perfil } = request.body;

    const updateUser = new UpdateUsersService();

    const user = await updateUser.execute({
        id,
        name,
        email,
        perfil,
    });

    return response.json(user);
});

usersRouter.delete('/:id', async (request, response) => {
    const { id } = request.params;

    const deleteUser = new DeleteUsersService();

    deleteUser.execute({ id });

    return response.json({ message: 'OK' });
});

export default usersRouter;
