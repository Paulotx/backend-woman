import AppError from '@shared/errors/AppError';

import FakeComplaintsRepository from '../repositories/fakes/FakeComplaintsRepository';
import UpdateComplaintService from './UpdateComplaintService';

let fakeComplaintsRepository: FakeComplaintsRepository;
let updateComplaint: UpdateComplaintService;

describe('UpdateComplaintService', () => {
    beforeEach(() => {
        fakeComplaintsRepository = new FakeComplaintsRepository();

        updateComplaint = new UpdateComplaintService(fakeComplaintsRepository);
    });

    it('should be able to update a complaint', async () => {
        const complaint = await fakeComplaintsRepository.create({
            type: 'Violência Física',
            victim: 'Maria José',
            cpf: '111.111.111-11',
            birth: new Date('1990-10-25'),
            race: 'Pardo',
            gender: 'Cisgenero',
            phone: '(62) 98221-1979',
            cep: '74610-240',
            address: 'Rua 260',
            number: 470,
            complement: 'Bloco 1, Apto 603',
            neighborhood: 'Leste Universitário',
            uf: 'GO',
            city: 'Goiânia',
            subject: 'Internet 300',
            attacker: 'Jack',
            identification: '333.333.333-33',
            attacker_sex: 'Masculino',
            relation: 'Husband',
            report: 'Me bateu',
            status: 'Nova',
            region_id: 'Id999',
        });

        const complaintUpdate = await updateComplaint.execute({
            id: complaint.id,
            type: 'Violência Física',
            victim: 'Maria José',
            cpf: '111.111.111-11',
            birth: new Date('1990-10-25'),
            race: 'Pardo',
            gender: 'Cisgenero',
            phone: '(62) 98221-1979',
            cep: '74610-240',
            address: 'Rua 260',
            number: 470,
            complement: 'Bloco 1, Apto 603',
            neighborhood: 'Leste Universitário',
            uf: 'GO',
            city: 'Goiânia',
            subject: 'Internet 300',
            attacker: 'Jack Estripador',
            identification: '333.333.333-33',
            attacker_sex: 'Masculino',
            relation: 'Husband',
            report: 'Me bateu',
            status: 'Fechada',
            region_id: 'Id999',
        });

        expect(complaint.attacker).toBe('Jack');
        expect(complaint.status).toBe('Nova');
        expect(complaintUpdate.attacker).toBe('Jack Estripador');
        expect(complaintUpdate.status).toBe('Fechada');
    });

    it('should information complaint not found', async () => {
        await fakeComplaintsRepository.create({
            type: 'Violência Física',
            victim: 'Maria José',
            cpf: '111.111.111-11',
            birth: new Date('1990-10-25'),
            race: 'Pardo',
            gender: 'Cisgenero',
            phone: '(62) 98221-1979',
            cep: '74610-240',
            address: 'Rua 260',
            number: 470,
            complement: 'Bloco 1, Apto 603',
            neighborhood: 'Leste Universitário',
            uf: 'GO',
            city: 'Goiânia',
            subject: 'Internet 300',
            attacker: 'Jack',
            identification: '333.333.333-33',
            attacker_sex: 'Masculino',
            relation: 'Husband',
            report: 'Me bateu',
            status: 'Nova',
            region_id: 'Id999',
        });

        expect(
            updateComplaint.execute({
                id: 11,
                type: 'Violência Física',
                victim: 'Maria José',
                cpf: '111.111.111-11',
                birth: new Date('1990-10-25'),
                race: 'Pardo',
                gender: 'Cisgenero',
                phone: '(62) 98221-1979',
                cep: '74610-240',
                address: 'Rua 260',
                number: 470,
                complement: 'Bloco 1, Apto 603',
                neighborhood: 'Leste Universitário',
                uf: 'GO',
                city: 'Goiânia',
                subject: 'Internet 300',
                attacker: 'Jack',
                identification: '333.333.333-33',
                attacker_sex: 'Masculino',
                relation: 'Husband',
                report: 'Me bateu',
                status: 'Nova',
                region_id: 'Id999',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
