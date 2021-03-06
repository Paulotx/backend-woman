import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/IChacheProvider';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
    id: string;
}

@injectable()
class DeleteUserService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('CacheProvider')
        private cacheProvider: ICacheProvider,
    ) {}

    public async execute({ id }: IRequest): Promise<void> {
        const user = await this.usersRepository.findById(id);

        if (!user) {
            throw new AppError('User not found.');
        }

        await this.usersRepository.remove(user);

        await this.cacheProvider.invalidate('users-list');
    }
}

export default DeleteUserService;
