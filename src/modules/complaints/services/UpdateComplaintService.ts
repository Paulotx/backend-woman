import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Complaint from '../infra/typeorm/entities/Complaint';
import IComplaintsRepository from '../repositories/IComplaintsRepository';

interface Request {
    id: number;
    victim: string;
    cpf: string;
    phone: string;
    cep: string;
    address: string;
    number: number;
    complement?: string;
    neighborhood: string;
    uf: string;
    city: string;
    race: string;
    gender: string;
    birth: Date;
    subject: string;
    attacker: string;
    relation: string;
    identification?: string;
    attacker_sex: string;
    report: string;
    note?: string;
    status?: string;
    type: string;
    region_id: string;
}

@injectable()
class UpdateComplaintService {
    constructor(
        @inject('ComplaintsRepository')
        private complaintsRepository: IComplaintsRepository,
    ) {}

    public async execute(data: Request): Promise<Complaint> {
        let complaint = await this.complaintsRepository.findById(data.id);

        if (!complaint) {
            throw new AppError('Complaint not found!');
        }

        complaint = {
            ...complaint,
            ...data,
            updated_at: new Date(),
        };

        return this.complaintsRepository.save(complaint);
    }
}

export default UpdateComplaintService;
