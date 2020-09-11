import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import DeleteUsersService from './DeleteUsersService';

describe('UpdateUsers', () => {
    it('should be able to delete a user', async () => {
        const fakeUsersRepository = new FakeUsersRepository();

        const deleteUsers = new DeleteUsersService(fakeUsersRepository);

        const user = await fakeUsersRepository.create({
            name: 'User Test',
            email: 'user@gmail.com',
            perfil: 'admin',
            password: '123456',
        });

        await expect(
            deleteUsers.execute({
                id: user.id,
            }),
        ).not.toBeInstanceOf(AppError);
    });

    it('should information user not found', async () => {
        const fakeUsersRepository = new FakeUsersRepository();

        const deleteUsers = new DeleteUsersService(fakeUsersRepository);

        await expect(
            deleteUsers.execute({
                id: 'does not exist',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
