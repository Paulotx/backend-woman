import { uuid } from 'uuidv4';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IFindAllUsersDTO from '@modules/users/dtos/IFindAllUsersDTO';

import User from '../../infra/typeorm/entities/User';

class FakeUserRepository implements IUsersRepository {
    private users: User[] = [];

    public async findAllUsers(): Promise<User[]> {
        return this.users;
    }

    public async findAllUsersPaginate(page: number): Promise<IFindAllUsersDTO> {
        let limitStart = 1;
        let limitEnd = 0;

        if (page > 1) {
            limitStart = (page - 1) * 10 + 1;
        }

        limitEnd = page * 10;

        const users = this.users.filter(
            (_, index) => index + 1 >= limitStart && index + 1 <= limitEnd,
        );

        return {
            users,
            total: users.length,
        };
    }

    public async findById(id: string): Promise<User | undefined> {
        const findUser = this.users.find(user => user.id === id);

        return findUser;
    }

    public async findByEmail(email: string): Promise<User | undefined> {
        const findUser = this.users.find(user => user.email === email);

        return findUser;
    }

    public async create(data: ICreateUserDTO): Promise<User> {
        const user = new User();

        Object.assign(user, { id: uuid() }, data);

        this.users.push(user);

        return user;
    }

    public async save(user: User): Promise<User> {
        const findIndex = this.users.findIndex(
            findUser => findUser.id === user.id,
        );

        this.users[findIndex] = user;

        return user;
    }

    public async remove(user: User): Promise<void> {
        const findIndex = this.users.findIndex(
            findUser => findUser.id === user.id,
        );

        delete this.users[findIndex];
    }
}

export default FakeUserRepository;
