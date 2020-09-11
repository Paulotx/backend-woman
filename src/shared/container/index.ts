import { container } from 'tsyringe';

import '@modules/users/providers';

import IComplaintsRepository from '@modules/complaints/repositories/IComplaintsRepository';
import ComplaintsRepository from '@modules/complaints/infra/typeorm/repositories/ComplaintsRepository';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

container.registerSingleton<IComplaintsRepository>(
    'ComplaintsRepository',
    ComplaintsRepository,
);

container.registerSingleton<IUsersRepository>(
    'UsersRepository',
    UsersRepository,
);
