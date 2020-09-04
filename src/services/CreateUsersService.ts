import { getRepository } from 'typeorm';

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
            throw new Error('Email address already used.');
        }

        const user = usersRepository.create({
            name,
            email,
            perfil,
            password,
        });

        await usersRepository.save(user);

        return user;
    }
}

export default CreateUsersService;
