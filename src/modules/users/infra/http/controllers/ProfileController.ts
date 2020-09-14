import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateProfileService from '@modules/users/services/UpdateProfileService';
import ShowProfileService from '@modules/users/services/ShowProfileService';

export default class ProfileController {
    public async show(request: Request, response: Response): Promise<Response> {
        const { id } = request.user;

        const showProfile = container.resolve(ShowProfileService);

        const user = await showProfile.execute({ id });

        delete user.password;

        return response.json(user);
    }

    public async update(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { id } = request.user;
        const { name, email, perfil, old_password, password } = request.body;

        const updateProfile = container.resolve(UpdateProfileService);

        const user = await updateProfile.execute({
            id,
            name,
            email,
            perfil,
            old_password,
            password,
        });

        delete user.password;

        return response.json(user);
    }
}
