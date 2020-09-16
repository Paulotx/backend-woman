import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import ListUsersService from './ListUsersService';

let fakeUsersRepository: FakeUsersRepository;
let fakeCacheProvder: FakeCacheProvider;
let listUsers: ListUsersService;

describe('UpdateProfile', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeCacheProvder = new FakeCacheProvider();

        listUsers = new ListUsersService(fakeUsersRepository, fakeCacheProvder);
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

        const users = await listUsers.execute();

        expect(users).toEqual([user01, user02]);
    });
});
