import AppError from '@shared/errors/AppError';

import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import CreateUserService from './CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let fakeCacheProvider: FakeCacheProvider;
let fakeMailProvider: FakeMailProvider;
let createUsers: CreateUserService;

describe('CreateUsers', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeHashProvider = new FakeHashProvider();
        fakeCacheProvider = new FakeCacheProvider();
        fakeMailProvider = new FakeMailProvider();

        createUsers = new CreateUserService(
            fakeUsersRepository,
            fakeHashProvider,
            fakeMailProvider,
            fakeCacheProvider,
        );
    });

    it('should be able to create a new user', async () => {
        const user = await createUsers.execute({
            name: 'User Test',
            email: 'user@gmail.com',
            perfil: 'admin',
        });

        expect(user).toHaveProperty('id');
    });

    it('should not be able to update a user with same email from another', async () => {
        await createUsers.execute({
            name: 'User Test',
            email: 'user@gmail.com',
            perfil: 'admin',
        });

        await expect(
            createUsers.execute({
                name: 'User Test',
                email: 'user@gmail.com',
                perfil: 'admin',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
