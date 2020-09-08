import { getCustomRepository } from 'typeorm';

import Complaint from '../models/Complaint';
import ComplaintsRepository from '../repositories/ComplaintsRepository';

interface Request {
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
    note?: string;
    status?: string;
}

class CreateComplaintsService {
    public async execute(data: Request): Promise<Complaint> {
        const complaintsRepository = getCustomRepository(ComplaintsRepository);

        const complaint = complaintsRepository.create({
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
            note: data.note,
            status: 'open',
        });

        await complaintsRepository.save(complaint);

        return complaint;
    }
}

export default CreateComplaintsService;
