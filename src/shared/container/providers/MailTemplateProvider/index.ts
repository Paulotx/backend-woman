import { container } from 'tsyringe';

import IMailTemplateProvider from './models/IMailTemplateProvider';

import HandlebarsMailTemplateProviders from './implementations/HandlebarsMailTemplateProviders';

const providers = {
    handlebars: HandlebarsMailTemplateProviders,
};

container.registerSingleton<IMailTemplateProvider>(
    'MailTemplateProvider',
    providers.handlebars,
);
