export default interface ICreateComplaintDTO {
    type: string;
    victim: string;
    cpf: string;
    birth: Date;
    race: string;
    gender: string;
    phone: string;
    cep: string;
    address: string;
    number: number;
    complement?: string;
    neighborhood?: string;
    uf: string;
    city: string;
    subject: string;
    attacker: string;
    identification?: string;
    attacker_sex: string;
    relation: string;
    report: string;
    status: string;
    region_id: string;
}
