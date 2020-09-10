import AppError from '@shared/errors/AppError';

import FakeComplaintsRepository from '../repositories/fakes/FakeComplaintsRepository';
import CreateComplaintsService from './CreateComplaintsService';
import UpdateComplaintService from './UpdateComplaintService';

describe('UpdateComplaintService', () => {
    it('should be able to update a complaint', async () => {
        const fakeComplaintsRepository = new FakeComplaintsRepository();

        const createComplaints = new CreateComplaintsService(
            fakeComplaintsRepository,
        );
        const updateComplaint = new UpdateComplaintService(
            fakeComplaintsRepository,
        );

        const complaint = await createComplaints.execute({
            victim: 'Maria José',
            cpf: '111.111.111-11',
            phone: '(62) 98221-1979',
            cep: '74610-240',
            address: 'Rua 260',
            number: 470,
            complement: 'Bloco 1, Apto 603',
            uf: 'GO',
            city: 'Goiânia',
            subject: 'Internet 300',
            attacker: 'Jack',
            identification: '333.333.333-33',
            report: 'Me bateu',
            status: 'open',
        });

        const complaintUpdate = await updateComplaint.execute({
            id: complaint.id,
            phone: '(62) 98221-1979',
            cep: '74610-240',
            address: 'Rua 260',
            number: 470,
            complement: 'Bloco 1, Apto 603',
            uf: 'GO',
            city: 'Goiânia',
            subject: 'Internet 300',
            attacker: 'Jack Estripador',
            identification: '333.333.333-33',
            report: 'Me bateu',
            status: 'closed',
        });

        expect(complaint.attacker).toBe('Jack');
        expect(complaint.status).toBe('open');
        expect(complaintUpdate.attacker).toBe('Jack Estripador');
        expect(complaintUpdate.status).toBe('closed');
    });

    it('should information complaint not found', async () => {
        const fakeComplaintsRepository = new FakeComplaintsRepository();

        const createComplaints = new CreateComplaintsService(
            fakeComplaintsRepository,
        );
        const updateComplaint = new UpdateComplaintService(
            fakeComplaintsRepository,
        );

        await createComplaints.execute({
            victim: 'Maria José',
            cpf: '111.111.111-11',
            phone: '(62) 98221-1979',
            cep: '74610-240',
            address: 'Rua 260',
            number: 470,
            complement: 'Bloco 1, Apto 603',
            uf: 'GO',
            city: 'Goiânia',
            subject: 'Internet 300',
            attacker: 'Jack',
            identification: '333.333.333-33',
            report: 'Me bateu',
            status: 'open',
        });

        expect(
            updateComplaint.execute({
                id: 11,
                phone: '(62) 98221-1979',
                cep: '74610-240',
                address: 'Rua 260',
                number: 470,
                complement: 'Bloco 1, Apto 603',
                uf: 'GO',
                city: 'Goiânia',
                subject: 'Internet 300',
                attacker: 'Jack Estripador',
                identification: '333.333.333-33',
                report: 'Me bateu',
                status: 'closed',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});