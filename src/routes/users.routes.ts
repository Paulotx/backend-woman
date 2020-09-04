import { Router } from 'express';
import { getRepository } from 'typeorm';

import User from '../models/User';

import CreateUsersService from '../services/CreateUsersService';
import UpdateUsersService from '../services/UpdateUsersService';
import DeleteUsersService from '../services/DeleteUsersService';

const usersRouter = Router();

usersRouter.get('/', async (request, response) => {
    const usersRepository = getRepository(User);
    const users = await usersRepository.find();

    return response.json(users);
});

usersRouter.post('/', async (request, response) => {
    try {
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
    } catch (err) {
        return response.status(400).json({ message: err.message });
    }
});

usersRouter.put('/:id', async (request, response) => {
    try {
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
    } catch (err) {
        return response.status(400).json({ message: err.message });
    }
});

usersRouter.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;

        const deleteUser = new DeleteUsersService();

        deleteUser.execute({ id });

        return response.json({ message: 'OK' });
    } catch (err) {
        return response.status(400).json({ message: err.message });
    }
});

export default usersRouter;
