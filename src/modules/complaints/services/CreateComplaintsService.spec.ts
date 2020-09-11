import FakeComplaintsRepository from '../repositories/fakes/FakeComplaintsRepository';
import CreateComplaintsService from './CreateComplaintsService';

describe('CreateComplaintsService', () => {
    it('should be able to create a new complaint', async () => {
        const fakeComplaintsRepository = new FakeComplaintsRepository();
        const createComplaints = new CreateComplaintsService(
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
        });

        expect(complaint).toHaveProperty('id');
        expect(complaint.victim).toBe('Maria José');
    });
});
