import { injectable, inject } from 'tsyringe';
import path from 'path';
import crypto from 'crypto';

import AppError from '@shared/errors/AppError';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/IChacheProvider';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';

import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import User from '../infra/typeorm/entities/User';

interface IRequest {
    name: string;
    email: string;
    perfil: string;
}

@injectable()
class CreateUserService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('HashProvider')
        private hashProvider: IHashProvider,

        @inject('MailProvider')
        private mailProvider: IMailProvider,

        @inject('CacheProvider')
        private cacheProvider: ICacheProvider,
    ) {}

    public async execute({ name, email, perfil }: IRequest): Promise<User> {
        const checkUserExists = await this.usersRepository.findByEmail(email);

        if (checkUserExists) {
            throw new AppError('Email address already used.');
        }

        const password = crypto.randomBytes(3).toString('hex');

        const hashedPassword = await this.hashProvider.generateHash(password);

        const user = await this.usersRepository.create({
            name,
            email,
            perfil,
            password: hashedPassword,
        });

        await this.cacheProvider.invalidate('users-list');

        const sendPasswordTemplate = path.resolve(
            __dirname,
            '..',
            'views',
            'send_password.hbs',
        );

        await this.mailProvider.sendMail({
            to: {
                name: user.name,
                email: user.email,
            },
            subject: '[Stagerun] Recuperação de senha',
            templateData: {
                file: sendPasswordTemplate,
                variables: {
                    name: user.name,
                    password,
                },
            },
        });

        return user;
    }
}

export default CreateUserService;
