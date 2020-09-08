import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import AppError from '../errors/AppError';

import User from '../models/User';

interface Request {
    name: string;
    email: string;
    perfil: string;
    password: string;
}

class CreateUsersService {
    public async execute({
        name,
        email,
        perfil,
        password,
    }: Request): Promise<User> {
        const usersRepository = getRepository(User);

        const checkUserExists = await usersRepository.findOne({
            where: {
                email,
            },
        });

        if (checkUserExists) {
            throw new AppError('Email address already used.');
        }

        const hashedPassword = await hash(password, 8);

        const user = usersRepository.create({
            name,
            email,
            perfil,
            password: hashedPassword,
        });

        await usersRepository.save(user);

        return user;
    }
}

export default CreateUsersService;
