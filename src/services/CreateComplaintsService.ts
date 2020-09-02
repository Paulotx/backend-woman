import Complaint from '../models/Complaint';
import ComplaintsRepository from '../repositories/ComplaintsRepository';

interface Request {
    victim: string;
    cpf: string;
    phone: string;
    cep: string;
    address: string;
    number: number;
    complement: string;
    uf: string;
    city: string;
    subject: string;
    attacker: string;
    identification?: string;
    report: string;
    note?: string;
    status?: string;
}

class CreateComplaintsService {
    private complaintsRepository: ComplaintsRepository;

    constructor(complaintsRepository: ComplaintsRepository) {
        this.complaintsRepository = complaintsRepository;
    }

    public execute(data: Request): Complaint {
        const findComplaintsOpen = this.complaintsRepository.findByCpf(
            data.cpf,
        );

        if (findComplaintsOpen) {
            throw Error('There is already an open complaint with this cpf.');
        }

        const complaint = this.complaintsRepository.create({
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
            note: data.note,
            status: data.status,
        });

        return complaint;
    }
}

export default CreateComplaintsService;
