import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';

import User from '../infra/typeorm/entities/User';

interface IRequest {
    id: string;
    name: string;
    email: string;
    perfil: string;
}

@injectable()
class UpdateUserService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
    ) {}

    public async execute({ id, name, email, perfil }: IRequest): Promise<User> {
        const user = await this.usersRepository.findById(id);

        if (!user) {
            throw new AppError('User not found.');
        }

        const findUserWithEmail = await this.usersRepository.findByEmail(email);

        if (findUserWithEmail && findUserWithEmail.id !== id) {
            throw new AppError('E-mail already in use.');
        }

        user.name = name;
        user.email = email;
        user.perfil = perfil;
        user.updated_at = new Date();

        return this.usersRepository.save(user);
    }
}

export default UpdateUserService;
