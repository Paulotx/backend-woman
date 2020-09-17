import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

import User from '../infra/typeorm/entities/User';

interface IRequest {
    id: string;
    name: string;
    email: string;
    old_password?: string;
    password?: string;
}

@injectable()
class UpdateUserService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('HashProvider')
        private hashProvider: IHashProvider,
    ) {}

    public async execute({
        id,
        name,
        email,
        old_password,
        password,
    }: IRequest): Promise<User> {
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
        user.updated_at = new Date();

        if (password && !old_password) {
            throw new AppError(
                'You need to inform the old password to set a new password.',
            );
        }

        if (password && old_password) {
            const checkOldPassword = await this.hashProvider.compareHash(
                old_password,
                user.password,
            );

            if (!checkOldPassword) {
                throw new AppError('Old password does not match.');
            }

            user.password = await this.hashProvider.generateHash(password);
        }

        return this.usersRepository.save(user);
    }
}

export default UpdateUserService;
