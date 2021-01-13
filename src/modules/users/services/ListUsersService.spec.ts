import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import ListUsersService from './ListUsersService';

let fakeUsersRepository: FakeUsersRepository;
let listUsers: ListUsersService;

describe('UpdateProfile', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();

        listUsers = new ListUsersService(fakeUsersRepository);
    });

    it('should be able to list the users', async () => {
        const user01 = await fakeUsersRepository.create({
            name: 'User',
            email: 'user@gmail.com',
            perfil: 'admin',
            password: '123456',
        });

        const user02 = await fakeUsersRepository.create({
            name: 'User 02',
            email: 'user02@gmail.com',
            perfil: 'admin',
            password: '123456',
        });

        const users = await listUsers.execute(1);

        expect(users).toEqual({ total: 2, users: [user01, user02] });
    });

    it('should not be able to list the users with page 0', async () => {
        const user01 = await fakeUsersRepository.create({
            name: 'User',
            email: 'user@gmail.com',
            perfil: 'admin',
            password: '123456',
        });

        const user02 = await fakeUsersRepository.create({
            name: 'User 02',
            email: 'user02@gmail.com',
            perfil: 'admin',
            password: '123456',
        });

        const users = await listUsers.execute(0);

        expect(users).toEqual([user01, user02]);
    });
});
