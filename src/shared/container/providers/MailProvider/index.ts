import { container } from 'tsyringe';

import mailConfig from '@config/mail';

import IMailProvider from './models/IMailProvider';

import EthearealMailProvider from './implementations/EthearealMailProvider';
import SMTPMailProvider from './implementations/SMTPMailProvider';

const providers = {
    ethereal: container.resolve(EthearealMailProvider),
    smtp: container.resolve(SMTPMailProvider),
};

container.registerInstance<IMailProvider>(
    'MailProvider',
    providers[mailConfig.driver],
);
