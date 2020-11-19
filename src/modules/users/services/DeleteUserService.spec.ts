import AppError from '@shared/errors/AppError';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import DeleteUserService from './DeleteUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeCacheProvider: FakeCacheProvider;

let deleteUsers: DeleteUserService;

describe('UpdateUsers', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeCacheProvider = new FakeCacheProvider();

        deleteUsers = new DeleteUserService(
            fakeUsersRepository,
            fakeCacheProvider,
        );
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
