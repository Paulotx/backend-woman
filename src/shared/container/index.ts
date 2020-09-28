import { container } from 'tsyringe';

import './providers';
import '@modules/users/providers';

import IComplaintsRepository from '@modules/complaints/repositories/IComplaintsRepository';
import ComplaintsRepository from '@modules/complaints/infra/typeorm/repositories/ComplaintsRepository';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IUserTokensRepository from '@modules/users/repositories/IUserTokenRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';

import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import NotificationsRepository from '@modules/notifications/infra/typeorm/repositories/NotificationsRepository';

import IRegionsRepository from '@modules/regions/repositories/IRegionsRepository';
import RegionsRepository from '@modules/regions/infra/typeorm/repositories/RegionRepository';

import ILinkUserRegionRepository from '@modules/regions/repositories/ILinkUserRegionRepository';
import LinkUserRegionRepository from '@modules/regions/infra/typeorm/repositories/LinkUserRegionRepository';

container.registerSingleton<IComplaintsRepository>(
    'ComplaintsRepository',
    ComplaintsRepository,
);

container.registerSingleton<IUsersRepository>(
    'UsersRepository',
    UsersRepository,
);

container.registerSingleton<IUserTokensRepository>(
    'UserTokenRepository',
    UserTokensRepository,
);

container.registerSingleton<INotificationsRepository>(
    'NotificationsRepository',
    NotificationsRepository,
);

container.registerSingleton<IRegionsRepository>(
    'RegionsRepository',
    RegionsRepository,
);

container.registerSingleton<ILinkUserRegionRepository>(
    'LinkUserRegionRepository',
    LinkUserRegionRepository,
);
