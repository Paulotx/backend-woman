import Complaint from '../infra/typeorm/entities/Complaint';
import ICreateComplaintDTO from '../dtos/ICreateComplaintDTO';
import IFindWithParamsDTO from '../dtos/IFindWithParamsDTO';

export default interface IComplaintsRepository {
    create(data: ICreateComplaintDTO): Promise<Complaint>;
    findAllComplaints(data: IFindWithParamsDTO[]): Promise<Complaint[]>;
    findByCpf(cpf: string): Promise<Complaint[]>;
    findById(id: number): Promise<Complaint | undefined>;
    findByRegion(region_id: string): Promise<Complaint[]>;
    save(complaint: Complaint): Promise<Complaint>;
}
