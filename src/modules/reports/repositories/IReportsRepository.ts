import IFindTotalNumberGeneralComplaints from '../dtos/findTotalNumberGeneralComplaintsDTO';

export default interface IReportsRepository {
    findTotalNumberSpecificComplaints(query: string): Promise<number>;
    findTotalNumberGeneralComplaints(
        query: string,
    ): Promise<IFindTotalNumberGeneralComplaints[]>;
}
