import { getRepository, Repository } from 'typeorm';

import IComplaintsRepository from '@modules/complaints/repositories/IComplaintsRepository';
import ICreateComplaintDTO from '@modules/complaints/dtos/ICreateComplaintDTO';
import IFindComplaintsDTO from '@modules/complaints/dtos/IFindComplaintsDTO';

import Complaint from '../entities/Complaint';

class ComplaintsRepository implements IComplaintsRepository {
    private ormRepository: Repository<Complaint>;

    constructor() {
        this.ormRepository = getRepository(Complaint);
    }

    public async findAllComplaints(): Promise<Complaint[]> {
        return this.ormRepository.find();
    }

    public async findAllComplaintsWithParams(
        query: string,
    ): Promise<IFindComplaintsDTO> {
        const complaints = await this.ormRepository.query(query);

        return {
            complaints,
            total: complaints[0].total,
        };
    }

    public async findByCpf(cpf: string): Promise<Complaint[]> {
        const findComplaint = await this.ormRepository.find({
            where: {
                cpf,
            },
        });

        return findComplaint;
    }

    public async findById(id: number): Promise<Complaint | undefined> {
        const findComplaint = await this.ormRepository.findOne(id);

        return findComplaint;
    }

    public async findByRegion(region_id: string): Promise<Complaint[]> {
        const findComplaints = await this.ormRepository.find({
            where: {
                region_id,
            },
        });

        return findComplaints;
    }

    public async create(data: ICreateComplaintDTO): Promise<Complaint> {
        const complaint = this.ormRepository.create({
            type: data.type,
            victim: data.victim,
            cpf: data.cpf,
            birth: data.birth,
            race: data.race,
            gender: data.gender,
            phone: data.phone,
            cep: data.cep,
            address: data.address,
            number: data.number,
            complement: data.complement,
            neighborhood: data.neighborhood,
            uf: data.uf,
            city: data.city,
            subject: data.subject,
            attacker: data.attacker,
            identification: data.identification,
            attacker_sex: data.attacker_sex,
            relation: data.relation,
            report: data.report,
            status: data.status,
            region_id: data.region_id,
        });

        await this.ormRepository.save(complaint);

        return complaint;
    }

    public async save(complaint: Complaint): Promise<Complaint> {
        return this.ormRepository.save(complaint);
    }
}

export default ComplaintsRepository;
