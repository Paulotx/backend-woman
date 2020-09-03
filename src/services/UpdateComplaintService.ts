import { getCustomRepository } from 'typeorm';

import Complaint from '../models/Complaint';
import ComplaintRepository from '../repositories/ComplaintsRepository';

interface Request {
    id: number;
    note: string;
    status: string;
}

class UpdateComplaintService {
    public async execute({ id, note, status }: Request): Promise<Complaint> {
        const complaintRepository = getCustomRepository(ComplaintRepository);

        const complaint = await complaintRepository.findOne(id);

        if (!complaint) {
            throw Error('Complaint not found!');
        }

        if (note) {
            complaint.note = note;
        }

        if (status) {
            complaint.status = status;
        }

        await complaintRepository.save(complaint);

        return complaint;
    }
}

export default UpdateComplaintService;
