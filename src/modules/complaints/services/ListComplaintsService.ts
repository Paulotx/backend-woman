import { injectable, inject } from 'tsyringe';

import Complaint from '../infra/typeorm/entities/Complaint';
import IComplaintsRepository from '../repositories/IComplaintsRepository';

@injectable()
class ListComplaintsService {
    constructor(
        @inject('ComplaintsRepository')
        private complaintsRepository: IComplaintsRepository,
    ) {}

    public async execute(): Promise<Complaint[]> {
        return this.complaintsRepository.findAllComplaints();
    }
}

export default ListComplaintsService;
