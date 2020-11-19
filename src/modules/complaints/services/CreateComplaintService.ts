import { injectable, inject } from 'tsyringe';
import path from 'path';

import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';

import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import IRegionsRepository from '@modules/regions/repositories/IRegionsRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';
import Complaint from '../infra/typeorm/entities/Complaint';
import IComplaintsRepository from '../repositories/IComplaintsRepository';

interface IRequest {
    type: string;
    victim: string;
    cpf: string;
    birth: Date;
    race: string;
    phone: string;
    cep: string;
    address: string;
    number: number;
    complement?: string;
    neighborhood?: string;
    uf: string;
    city: string;
    subject: string;
    attacker: string;
    identification?: string;
    attacker_sex: string;
    relation: string;
    report: string;
    region_id: string;
}

@injectable()
class CreateComplaintService {
    constructor(
        @inject('ComplaintsRepository')
        private complaintsRepository: IComplaintsRepository,

        @inject('NotificationsRepository')
        private notificationsRepository: INotificationsRepository,

        @inject('RegionsRepository')
        private regionsRepository: IRegionsRepository,

        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('MailProvider')
        private mailProvider: IMailProvider,
    ) {}

    public async execute(data: IRequest): Promise<Complaint> {
        const complaint = await this.complaintsRepository.create({
            type: data.type,
            victim: data.victim,
            cpf: data.cpf,
            birth: data.birth,
            race: data.race,
            phone: data.phone,
            cep: data.cep,
            address: data.address,
            number: data.number,
            complement: data.complement,
            neighborhood: data.neighborhood,
            uf: data.uf,
            city: data.city,
            subject: data.subject,
            attacker: data.attacker,
            identification: data.identification,
            attacker_sex: data.attacker_sex,
            relation: data.relation,
            report: data.report,
            status: 'Nova',
            region_id: data.region_id,
        });

        await this.notificationsRepository.create({
            recipient_id: `${process.env.ID_DELEGATE}`,
            content: `Nova denuncia cadastrada - Vítima: ${complaint.victim} CPF: ${complaint.cpf}`,
        });

        const region = await this.regionsRepository.findById(data.region_id);

        if (!region) {
            throw new AppError('Region not found!');
        }

        const user = await this.usersRepository.findById(region.responsible);

        if (!user) {
            throw new AppError('User not found!');
        }

        const newReportNotificationTemplate = path.resolve(
            __dirname,
            '..',
            'views',
            'new_report_notification.hbs',
        );

        await this.mailProvider.sendMail({
            to: {
                name: user.name,
                email: user.email,
            },
            subject: '[Projeto Bertha] Nova denúncia registrada',
            templateData: {
                file: newReportNotificationTemplate,
                variables: {
                    id: complaint.id,
                    victim: complaint.victim,
                },
            },
        });

        return complaint;
    }
}

export default CreateComplaintService;
