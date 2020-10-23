import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ListUsersService from '@modules/users/services/ListUsersService';
import CreateUserService from '@modules/users/services/CreateUserService';
import UpdateUserService from '@modules/users/services/UpdateUserService';
import DeleteUserService from '@modules/users/services/DeleteUserService';

export default class UsersController {
    public async index(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const listUsers = container.resolve(ListUsersService);

        const users = await listUsers.execute();

        return response.json(classToClass(users));
    }

    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { name, email, perfil } = request.body;

        const createUser = container.resolve(CreateUserService);

        const user = await createUser.execute({
            name,
            email,
            perfil,
        });

        return response.status(201).json(classToClass(user));
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

        return response.json(classToClass(user));
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
