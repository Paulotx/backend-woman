import Complaint from '@modules/complaints/infra/typeorm/entities/Complaint';
import IReportsRepository from '@modules/reports/repositories/IReportsRepository';
import IFindTotalNumberGeneralComplaints from '../../dtos/findTotalNumberGeneralComplaintsDTO';

class FakeReportsRepository implements IReportsRepository {
    private complaints: Complaint[] = [];

    public async findComplaints(): Promise<Complaint[]> {
        return this.complaints;
    }

    public async findTotalNumberSpecificComplaints(
        query: string,
    ): Promise<number> {
        return this.complaints.filter(complaints => complaints.victim === query)
            .length;
    }

    public async findTotalNumberGeneralComplaints(
        query: string,
    ): Promise<IFindTotalNumberGeneralComplaints[]> {
        const complaint = this.complaints.filter(
            complaints => complaints.victim === query,
        );

        return [
            {
                key: complaint[0].victim,
                count: String(complaint.length),
            },
        ];
    }
}

export default FakeReportsRepository;
