import { Router } from 'express';

import CreateUsersService from '../services/CreateUsersService';

const usersRouter = Router();

usersRouter.get('/', async (request, response) => {
    return response.send();
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

        return response.json(user);
    } catch (err) {
        return response.status(400).json({ message: err.message });
    }
});

export default usersRouter;
