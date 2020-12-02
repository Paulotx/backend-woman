import User from '../infra/typeorm/entities/User';

export default interface IFindAllUsers {
    users: User[];
    total: number;
}
