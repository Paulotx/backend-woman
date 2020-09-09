import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateUsersService from '@modules/users/services/CreateUsersService';
import UpdateUsersService from '@modules/users/services/UpdateUsersService';
import DeleteUsersService from '@modules/users/services/DeleteUsersService';

export default class UserssController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { name, email, perfil, password } = request.body;

        const createUser = container.resolve(CreateUsersService);

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

        const updateUser = container.resolve(UpdateUsersService);

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

        const deleteUser = container.resolve(DeleteUsersService);

        deleteUser.execute({ id });

        return response.json({ message: 'OK' });
    }
}
