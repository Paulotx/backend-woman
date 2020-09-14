import { getRepository, Repository } from 'typeorm';

import IComplaintsRepository from '@modules/complaints/repositories/IComplaintsRepository';
import ICreateComplaintDTO from '@modules/complaints/dtos/ICreateComplaintDTO';

import Complaint from '../entities/Complaint';

class ComplaintsRepository implements IComplaintsRepository {
    private ormRepository: Repository<Complaint>;

    constructor() {
        this.ormRepository = getRepository(Complaint);
    }

    public async findAllComplaints(): Promise<Complaint[]> {
        return this.ormRepository.find();
    }

    public async findByCpf(cpf: string): Promise<Complaint | undefined> {
        const findComplaint = await this.ormRepository.findOne({
            where: { cpf },
        });

        return findComplaint;
    }

    public async findById(id: number): Promise<Complaint | undefined> {
        const findComplaint = await this.ormRepository.findOne(id);

        return findComplaint;
    }

    public async create(data: ICreateComplaintDTO): Promise<Complaint> {
        const complaint = this.ormRepository.create({
            victim: data.victim,
            cpf: data.cpf,
            phone: data.phone,
            cep: data.cep,
            address: data.address,
            number: data.number,
            complement: data.complement,
            uf: data.uf,
            city: data.city,
            subject: data.subject,
            attacker: data.attacker,
            identification: data.identification,
            report: data.report,
            status: data.status,
        });

        await this.ormRepository.save(complaint);

        return complaint;
    }

    public async save(complaint: Complaint): Promise<Complaint> {
        return this.ormRepository.save(complaint);
    }
}

export default ComplaintsRepository;
