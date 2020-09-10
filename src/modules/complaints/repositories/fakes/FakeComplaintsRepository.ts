import IComplaintsRepository from '@modules/complaints/repositories/IComplaintsRepository';
import ICreateComplaintDTO from '@modules/complaints/dtos/ICreateComplaintDTO';

import Complaint from '../../infra/typeorm/entities/Complaint';

class ComplaintsRepository implements IComplaintsRepository {
    private complaints: Complaint[] = [];

    public async findByCpf(cpf: string): Promise<Complaint | undefined> {
        const findComplaint = this.complaints.find(
            complaint => complaint.cpf === cpf,
        );

        return findComplaint;
    }

    public async findOne(id: number): Promise<Complaint | undefined> {
        const findComplaint = this.complaints.find(
            complaint => complaint.id === id,
        );

        return findComplaint;
    }

    public async create(data: ICreateComplaintDTO): Promise<Complaint> {
        const complaint = new Complaint();

        Object.assign(complaint, {
            id: this.complaints.length + 1,
            ...data,
            status: 'open',
        });

        this.complaints.push(complaint);

        return complaint;
    }

    public async save(complaint: Complaint): Promise<Complaint> {
        const index = this.complaints.findIndex(
            complaintItem => complaintItem.id === complaint.id,
        );

        this.complaints[index] = complaint;

        return this.complaints[index];
    }
}

export default ComplaintsRepository;
