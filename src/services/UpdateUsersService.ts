import { getRepository } from 'typeorm';

import AppError from '../errors/AppError';
import User from '../models/User';

interface Request {
    id: string;
    name: string;
    email: string;
    perfil: string;
}

class UpdateUserService {
    public async execute({ id, name, email, perfil }: Request): Promise<User> {
        const usersRepository = getRepository(User);

        const user = await usersRepository.findOne(id);

        if (!user) {
            throw new AppError('User not found.');
        }

        const findUserWithEmail = await usersRepository.findOne({
            where: {
                email,
            },
        });

        if (findUserWithEmail && findUserWithEmail.id !== id) {
            throw new AppError('E-mail already in use.');
        }

        user.name = name;
        user.email = email;
        user.perfil = perfil;
        user.updated_at = new Date();

        await usersRepository.save(user);

        return user;
    }
}

export default UpdateUserService;
