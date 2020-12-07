import { getRepository, Repository } from 'typeorm';

import IReportsRepository from '@modules/reports/repositories/IReportsRepository';

import Complaint from '@modules/complaints/infra/typeorm/entities/Complaint';

class ReportsRepository implements IReportsRepository {
    private ormRepository: Repository<Complaint>;

    constructor() {
        this.ormRepository = getRepository(Complaint);
    }

    public async findTotalComplaints(query: string): Promise<number> {
        const total = await this.ormRepository.query(query);

        return Number(total[0].count);
    }
}

export default ReportsRepository;
