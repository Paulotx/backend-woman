import { getCustomRepository } from 'typeorm';

import AppError from '../errors/AppError';
import Complaint from '../models/Complaint';
import ComplaintRepository from '../repositories/ComplaintsRepository';

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

class UpdateComplaintService {
    public async execute(data: Request): Promise<Complaint> {
        const complaintRepository = getCustomRepository(ComplaintRepository);

        let complaint = await complaintRepository.findOne(data.id);

        console.log(complaint);

        if (!complaint) {
            throw new AppError('Complaint not found!');
        }

        complaint = {
            ...complaint,
            ...data,
            updated_at: new Date(Date.now()),
        };

        await complaintRepository.save(complaint);

        return complaint;
    }
}

export default UpdateComplaintService;
