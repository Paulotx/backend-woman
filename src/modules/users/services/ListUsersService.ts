import { injectable, inject } from 'tsyringe';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/IChacheProvider';
import IUsersRepository from '../repositories/IUsersRepository';
import User from '../infra/typeorm/entities/User';

@injectable()
class ListUsersService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('CacheProvider')
        private cacheProvider: ICacheProvider,
    ) {}

    public async execute(): Promise<User[]> {
        let users = await this.cacheProvider.recover<User[]>('users-list');

        if (!users) {
            users = await this.usersRepository.findAllUsers();

            await this.cacheProvider.save('users-list', users);
        }

        return users;
    }
}

export default ListUsersService;
