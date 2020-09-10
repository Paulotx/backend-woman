import Complaint from '../infra/typeorm/entities/Complaint';
import ICreateComplaintDTO from '../dtos/ICreateComplaintDTO';

export default interface IComplaintsRepository {
    create(data: ICreateComplaintDTO): Promise<Complaint>;
    findByCpf(cpf: string): Promise<Complaint | undefined>;
    findOne(id: number): Promise<Complaint | undefined>;
    save(complaint: Complaint): Promise<Complaint>;
}