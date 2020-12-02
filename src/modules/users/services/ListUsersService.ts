import { injectable, inject } from 'tsyringe';

import IUsersRepository from '../repositories/IUsersRepository';
import IFindAllUsersDTO from '../dtos/IFindAllUsersDTO';
import User from '../infra/typeorm/entities/User';

@injectable()
class ListUsersService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
    ) {}

    public async execute(page: number): Promise<IFindAllUsersDTO | User[]> {
        if (page === 0) {
            const users = await this.usersRepository.findAllUsers();
            return users;
        }
        const users = await this.usersRepository.findAllUsersPaginate(page);
        return users;
    }
}

export default ListUsersService;
