export default interface IReportsRepository {
    findTotalComplaints(query: string): Promise<number>;
}
