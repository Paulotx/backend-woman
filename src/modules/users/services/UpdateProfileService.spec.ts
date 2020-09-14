import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import UpdateProfileService from './UpdateProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;

describe('UpdateProfile', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeHashProvider = new FakeHashProvider();

        updateProfile = new UpdateProfileService(
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

        const updateUser = await updateProfile.execute({
            id: user.id,
            name: 'User Test',
            email: 'userteste@gmail.com',
            perfil: 'admin',
        });

        expect(updateUser.email).toBe('userteste@gmail.com');
    });

    it('should information user not found', async () => {
        await expect(
            updateProfile.execute({
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
            updateProfile.execute({
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

        const updateUser = await updateProfile.execute({
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
            updateProfile.execute({
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
            updateProfile.execute({
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
