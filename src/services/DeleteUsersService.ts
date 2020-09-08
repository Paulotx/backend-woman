import { getRepository } from 'typeorm';

import AppError from '../errors/AppError';

import User from '../models/User';

interface Request {
    id: string;
}

class DeleteUsersService {
    public async execute({ id }: Request): Promise<void> {
        const usersRepository = getRepository(User);

        const user = await usersRepository.findOne(id);

        if (!user) {
            throw new AppError('User not found.');
        }

        await usersRepository.remove(user);
    }
}

export default DeleteUsersService;
