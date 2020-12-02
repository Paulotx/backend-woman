import Complaint from '../infra/typeorm/entities/Complaint';
import ICreateComplaintDTO from '../dtos/ICreateComplaintDTO';
import IFindComplaintsDTO from '../dtos/IFindComplaintsDTO';

export default interface IComplaintsRepository {
    create(data: ICreateComplaintDTO): Promise<Complaint>;
    findAllComplaints(): Promise<Complaint[]>;
    findAllComplaintsWithParams(query: string): Promise<IFindComplaintsDTO>;
    findByCpf(cpf: string): Promise<Complaint[]>;
    findById(id: number): Promise<Complaint | undefined>;
    findByRegion(region_id: string): Promise<Complaint[]>;
    save(complaint: Complaint): Promise<Complaint>;
}
