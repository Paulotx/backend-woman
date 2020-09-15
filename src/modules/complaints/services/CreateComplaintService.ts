import { injectable, inject } from 'tsyringe';

import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import Complaint from '../infra/typeorm/entities/Complaint';
import IComplaintsRepository from '../repositories/IComplaintsRepository';

interface IRequest {
    victim: string;
    cpf: string;
    phone: string;
    cep: string;
    address: string;
    number: number;
    complement: string;
    uf: string;
    city: string;
    subject: string;
    attacker: string;
    identification?: string;
    report: string;
}

@injectable()
class CreateComplaintService {
    constructor(
        @inject('ComplaintsRepository')
        private complaintsRepository: IComplaintsRepository,

        @inject('NotificationsRepository')
        private notificationsRepository: INotificationsRepository,
    ) {}

    public async execute(data: IRequest): Promise<Complaint> {
        const complaint = await this.complaintsRepository.create({
            victim: data.victim,
            cpf: data.cpf,
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
            report: data.report,
            status: 'open',
        });

        await this.notificationsRepository.create({
            recipient_id: '5a6c0a19-9986-4706-99d5-6c1a307b0f91',
            content: `Nova denuncia cadastrada - Vítima: ${complaint.victim} CPF: ${complaint.cpf}`,
        });

        return complaint;
    }
}

export default CreateComplaintService;
