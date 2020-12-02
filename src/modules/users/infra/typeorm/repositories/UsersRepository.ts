import { getRepository, Repository } from 'typeorm';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IFindAllUsersDTO from '@modules/users/dtos/IFindAllUsersDTO';

import User from '../entities/User';

class UserRepository implements IUsersRepository {
    private ormRepository: Repository<User>;

    constructor() {
        this.ormRepository = getRepository(User);
    }

    public async findAllUsers(): Promise<User[]> {
        const users = await this.ormRepository.find();

        return users;
    }

    public async findAllUsersPaginate(page: number): Promise<IFindAllUsersDTO> {
        const [users, total] = await this.ormRepository.findAndCount({
            skip: (page - 1) * 10,
            take: 10,
            order: {
                name: 'ASC',
            },
        });

        return {
            users,
            total,
        };
    }

    public async findById(id: string): Promise<User | undefined> {
        const findUser = await this.ormRepository.findOne(id);

        return findUser;
    }

    public async findByEmail(email: string): Promise<User | undefined> {
        const findUser = await this.ormRepository.findOne({ where: { email } });

        return findUser;
    }

    public async create(data: ICreateUserDTO): Promise<User> {
        const user = this.ormRepository.create(data);

        await this.ormRepository.save(user);

        return user;
    }

    public async save(user: User): Promise<User> {
        return this.ormRepository.save(user);
    }

    public async remove(user: User): Promise<void> {
        await this.ormRepository.remove(user);
    }
}

export default UserRepository;
