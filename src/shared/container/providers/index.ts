import { container } from 'tsyringe';
import mailConfig from '@config/mail';

import IMailProvider from './MailProvider/models/IMailProvider';
import EtherealMailProvider from './MailProvider/implementations/EthearealMailProvider';
import SMTPMailProvider from './MailProvider/implementations/SMTPMailProvider';

import IMailTemplateProvider from './MailTemplateProvider/models/IMailTemplateProvider';
import HandlebarsMailTamplateProvider from './MailTemplateProvider/implementations/HandlebarsMailTemplateProviders';

container.registerSingleton<IMailTemplateProvider>(
    'MailTemplateProvider',
    HandlebarsMailTamplateProvider,
);

container.registerInstance<IMailProvider>(
    'MailProvider',
    mailConfig.driver === 'ethereal'
        ? container.resolve(EtherealMailProvider)
        : container.resolve(SMTPMailProvider),
);
