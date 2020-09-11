import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import CreateUsersService from './CreateUsersService';

describe('CreateUsers', () => {
    it('should be able to create a new user', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeHashProvider = new FakeHashProvider();

        const createUsers = new CreateUsersService(
            fakeUsersRepository,
            fakeHashProvider,
        );

        const user = await createUsers.execute({
            name: 'User Test',
            email: 'user@gmail.com',
            perfil: 'admin',
            password: '123456',
        });

        expect(user).toHaveProperty('id');
    });

    it('should not be able to create a new user with same email from another', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeHashProvider = new FakeHashProvider();

        const createUsers = new CreateUsersService(
            fakeUsersRepository,
            fakeHashProvider,
        );

        await createUsers.execute({
            name: 'User Test',
            email: 'user@gmail.com',
            perfil: 'admin',
            password: '123456',
        });

        expect(
            createUsers.execute({
                name: 'User Test',
                email: 'user@gmail.com',
                perfil: 'admin',
                password: '123456',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
