import { injectable, inject } from 'tsyringe';
import path from 'path';

import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';

import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
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
    uf: string;
    city: string;
    subject: string;
    attacker: string;
    identification?: string;
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
            uf: data.uf,
            city: data.city,
            subject: data.subject,
            attacker: data.attacker,
            identification: data.identification,
            relation: data.relation,
            report: data.report,
            status: 'open',
            region_id: data.region_id,
        });

        await this.notificationsRepository.create({
            recipient_id: `${process.env.ID_DELEGATE}`,
            content: `Nova denuncia cadastrada - Vítima: ${complaint.victim} CPF: ${complaint.cpf}`,
        });

        const newReportNotificationTemplate = path.resolve(
            __dirname,
            '..',
            'views',
            'new_report_notification.hbs',
        );

        await this.mailProvider.sendMail({
            to: {
                name: `${process.env.NAME_DELEGATE}`,
                email: `${process.env.EMAIL_DELEGATE}`,
            },
            subject: '[Stagerun] Nova denúncia registrada',
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
