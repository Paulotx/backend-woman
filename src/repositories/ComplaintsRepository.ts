import Complaint from '../models/Complaint';

export interface CreateComplaintDTO {
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

class ComplaintsRepository {
    private complaints: Complaint[];

    constructor() {
        this.complaints = [];
    }

    public all(): Complaint[] {
        return this.complaints;
    }

    public create(data: CreateComplaintDTO): Complaint {
        const complaint = new Complaint(data);

        this.complaints.push(complaint);

        return complaint;
    }

    public findByCpf(cpf: string): Complaint | null {
        const findComplaintsOpen = this.complaints.find(
            complaint => complaint.cpf === cpf,
        );

        return findComplaintsOpen || null;
    }
}

export default ComplaintsRepository;
