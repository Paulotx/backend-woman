import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import UpdateUserService from './UpdateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateUsers: UpdateUserService;

describe('UpdateUsers', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeHashProvider = new FakeHashProvider();

        updateUsers = new UpdateUserService(
            fakeUsersRepository,
            fakeHashProvider,
        );
    });

    it('should be able to update a user', async () => {
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
        await expect(
            updateUsers.execute({
                id: 'does not exist',
                name: 'User Test',
                email: 'userteste@gmail.com',
                perfil: 'admin',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should be able to change to another user email', async () => {
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

    it('should be able to update the password', async () => {
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
            old_password: '123456',
            password: '123123',
        });

        expect(updateUser.password).toBe('123123');
    });

    it('should not be able to update the password with old password', async () => {
        const user = await fakeUsersRepository.create({
            name: 'User Test',
            email: 'user@gmail.com',
            perfil: 'admin',
            password: '123456',
        });

        await expect(
            updateUsers.execute({
                id: user.id,
                name: 'User Test',
                email: 'userteste@gmail.com',
                perfil: 'admin',
                password: '123132',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to update the password with wrong old password', async () => {
        const user = await fakeUsersRepository.create({
            name: 'User Test',
            email: 'user@gmail.com',
            perfil: 'admin',
            password: '123456',
        });

        await expect(
            updateUsers.execute({
                id: user.id,
                name: 'User Test',
                email: 'userteste@gmail.com',
                perfil: 'admin',
                old_password: 'wrong-old-password',
                password: '123132',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
