import Complaint from '@modules/complaints/infra/typeorm/entities/Complaint';
import IFindTotalNumberGeneralComplaints from '../dtos/findTotalNumberGeneralComplaintsDTO';

export default interface IReportsRepository {
    findComplaints(query: string): Promise<Complaint[]>;
    findTotalNumberSpecificComplaints(query: string): Promise<number>;
    findTotalNumberGeneralComplaints(
        query: string,
    ): Promise<IFindTotalNumberGeneralComplaints[]>;
}
