import { getRepository, Repository } from 'typeorm';

import IReportsRepository from '@modules/reports/repositories/IReportsRepository';
import IFindTotalNumberGeneralComplaints from '@modules/reports/dtos/findTotalNumberGeneralComplaintsDTO';

import Complaint from '@modules/complaints/infra/typeorm/entities/Complaint';

class ReportsRepository implements IReportsRepository {
    private ormRepository: Repository<Complaint>;

    constructor() {
        this.ormRepository = getRepository(Complaint);
    }

    public async findComplaints(query: string): Promise<Complaint[]> {
        const complaints = await this.ormRepository.query(query);

        return complaints;
    }

    public async findTotalNumberSpecificComplaints(
        query: string,
    ): Promise<number> {
        const total = await this.ormRepository.query(query);

        return Number(total[0].count);
    }

    public async findTotalNumberGeneralComplaints(
        query: string,
    ): Promise<IFindTotalNumberGeneralComplaints[]> {
        const response = await this.ormRepository.query(query);

        return response;
    }
}

export default ReportsRepository;
