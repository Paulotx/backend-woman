import User from '../infra/typeorm/entities/User';
import ICreateUserDTO from '../dtos/ICreateUserDTO';
import IFindAllUsersDTO from '../dtos/IFindAllUsersDTO';

export default interface IUsersRepository {
    findAllUsers(): Promise<User[]>;
    findAllUsersPaginate(page: number): Promise<IFindAllUsersDTO>;
    findById(id: string): Promise<User | undefined>;
    findByEmail(email: string): Promise<User | undefined>;
    create(data: ICreateUserDTO): Promise<User>;
    remove(user: User): Promise<void>;
    save(user: User): Promise<User>;
}
