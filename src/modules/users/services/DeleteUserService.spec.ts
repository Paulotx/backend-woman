import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import DeleteUserService from './DeleteUserService';

let fakeUsersRepository: FakeUsersRepository;
let deleteUsers: DeleteUserService;

describe('UpdateUsers', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();

        deleteUsers = new DeleteUserService(fakeUsersRepository);
    });

    it('should be able to delete a user', async () => {
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
        await expect(
            deleteUsers.execute({
                id: 'does not exist',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});