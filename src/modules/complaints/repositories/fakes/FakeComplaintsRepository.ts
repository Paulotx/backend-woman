import IComplaintsRepository from '@modules/complaints/repositories/IComplaintsRepository';
import ICreateComplaintDTO from '@modules/complaints/dtos/ICreateComplaintDTO';
import IFindComplaintsDTO from '../../dtos/IFindComplaintsDTO';

import Complaint from '../../infra/typeorm/entities/Complaint';

class FakeComplaintsRepository implements IComplaintsRepository {
    private complaints: Complaint[] = [];

    public async findAllComplaints(): Promise<Complaint[]> {
        return this.complaints;
    }

    public async findAllComplaintsWithParams(
        _: string,
    ): Promise<IFindComplaintsDTO> {
        const findComplaint = this.complaints.filter(
            complaint =>
                complaint.region_id === 'region_id' ||
                complaint.region_id === 'region_id1' ||
                complaint.region_id === 'region_id2' ||
                complaint.victim === 'Maria José' ||
                complaint.id === 1 ||
                complaint.status === 'Nova' ||
                complaint.cpf === '111.111.111-11',
        );

        return {
            complaints: findComplaint,
            total: findComplaint.length,
        };
    }

    public async findByCpf(cpf: string): Promise<Complaint[]> {
        const findComplaint = this.complaints.filter(
            complaint => complaint.cpf === cpf,
        );

        return findComplaint;
    }

    public async findById(id: number): Promise<Complaint | undefined> {
        const findComplaint = this.complaints.find(
            complaint => complaint.id === id,
        );

        return findComplaint;
    }

    public async findByRegion(region_id: string): Promise<Complaint[]> {
        const findComplaint = this.complaints.filter(
            complaint => complaint.region_id === region_id,
        );

        return findComplaint;
    }

    public async create(data: ICreateComplaintDTO): Promise<Complaint> {
        const complaint = new Complaint();

        Object.assign(complaint, {
            id: this.complaints.length + 1,
            ...data,
        });

        this.complaints.push(complaint);

        return complaint;
    }

    public async save(complaint: Complaint): Promise<Complaint> {
        this.complaints[complaint.id - 1] = complaint;

        return this.complaints[complaint.id - 1];
    }
}

export default FakeComplaintsRepository;
