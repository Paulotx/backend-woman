import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IComplaintsRepository from '../repositories/IComplaintsRepository';

import Complaint from '../infra/typeorm/entities/Complaint';

interface IRequest {
    id: number;
}

@injectable()
class ShowComplaintService {
    constructor(
        @inject('ComplaintsRepository')
        private complaintsRepository: IComplaintsRepository,
    ) {}

    public async execute({ id }: IRequest): Promise<Complaint> {
        const complaint = await this.complaintsRepository.findById(id);

        if (!complaint) {
            throw new AppError('Complaint not found.');
        }

        return complaint;
    }
}

export default ShowComplaintService;
