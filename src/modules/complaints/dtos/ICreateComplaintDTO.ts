export default interface ICreateComplaintDTO {
    type: string;
    victim: string;
    cpf: string;
    birth: Date;
    race: string;
    phone: string;
    cep: string;
    address: string;
    number: number;
    complement?: string;
    uf: string;
    city: string;
    subject: string;
    attacker: string;
    identification?: string;
    relation: string;
    report: string;
    status: string;
    region_id: string;
}
