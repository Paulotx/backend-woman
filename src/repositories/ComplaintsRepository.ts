import { EntityRepository, Repository } from 'typeorm';
import Complaint from '../models/Complaint';

@EntityRepository(Complaint)
class ComplaintsRepository extends Repository<Complaint> {
    public async findByCpf(cpf: string): Promise<Complaint | null> {
        const findComplaint = await this.findOne({
            where: { cpf },
        });

        return findComplaint || null;
    }
}

export default ComplaintsRepository;
