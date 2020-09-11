import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateUsersService from './UpdateUsersService';

describe('UpdateUsers', () => {
    it('should be able to update a user', async () => {
        const fakeUsersRepository = new FakeUsersRepository();

        const updateUsers = new UpdateUsersService(fakeUsersRepository);

        const user = await fakeUsersRepository.create({
            name: 'User Test',
            email: 'user@gmail.com',
            perfil: 'admin',
            password: '123456',
        });

        const updateUser = await updateUsers.execute({
            id: user.id,
            name: 'User Test',
            email: 'userteste@gmail.com',
            perfil: 'admin',
        });

        expect(updateUser.email).toBe('userteste@gmail.com');
    });

    it('should information user not found', async () => {
        const fakeUsersRepository = new FakeUsersRepository();

        const updateUsers = new UpdateUsersService(fakeUsersRepository);

        await expect(
            updateUsers.execute({
                id: 'does not exist',
                name: 'User Test',
                email: 'userteste@gmail.com',
                perfil: 'admin',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should be able to update a user', async () => {
        const fakeUsersRepository = new FakeUsersRepository();

        const updateUsers = new UpdateUsersService(fakeUsersRepository);

        await fakeUsersRepository.create({
            name: 'User',
            email: 'user@gmail.com',
            perfil: 'admin',
            password: '123456',
        });

        const user = await fakeUsersRepository.create({
            name: 'User 2',
            email: 'user2@gmail.com',
            perfil: 'admin',
            password: '123456',
        });

        await expect(
            updateUsers.execute({
                id: user.id,
                name: 'User 2',
                email: 'user@gmail.com',
                perfil: 'admin',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
