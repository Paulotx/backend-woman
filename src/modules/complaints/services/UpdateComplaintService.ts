import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Complaint from '../infra/typeorm/entities/Complaint';
import IComplaintsRepository from '../repositories/IComplaintsRepository';

interface Request {
    id: number;
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
