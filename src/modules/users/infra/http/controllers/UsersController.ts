import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateUserService from '@modules/users/services/CreateUserService';
import UpdateUserService from '@modules/users/services/UpdateUserService';
import DeleteUserService from '@modules/users/services/DeleteUserService';

export default class UserssController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { name, email, perfil, password } = request.body;

        const createUser = container.resolve(CreateUserService);

        const user = await createUser.execute({
            name,
            email,
            perfil,
            password,
        });

        delete user.password;

        return response.json(user);
    }

    public async update(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { id } = request.params;
        const { name, email, perfil } = request.body;

        const updateUser = container.resolve(UpdateUserService);

        const user = await updateUser.execute({
            id,
            name,
            email,
            perfil,
        });

        return response.json(user);
    }

    public async delete(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { id } = request.params;

        const deleteUser = container.resolve(DeleteUserService);

        deleteUser.execute({ id });

        return response.json({ message: 'OK' });
    }
}
