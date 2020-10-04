import FakeComplaintsRepository from '../repositories/fakes/FakeComplaintsRepository';
import ListComplaintsService from './ListComplaintsService';

let fakeComplaintsRepository: FakeComplaintsRepository;
let listComplaints: ListComplaintsService;

describe('ListComplaintsService', () => {
    beforeEach(() => {
        fakeComplaintsRepository = new FakeComplaintsRepository();

        listComplaints = new ListComplaintsService(fakeComplaintsRepository);
    });

    it('should be able to list the complaints', async () => {
        await fakeComplaintsRepository.create({
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
            region_id: 'Id999',
        });

        await fakeComplaintsRepository.create({
            victim: 'Maria da Penha',
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
            region_id: 'Id999',
        });

        const region_id = 'Id999';

        const complaints = listComplaints.execute({ region_id });

        expect((await complaints).length).toBe(2);
    });

    it('should be able to create the SQL with all parameters', async () => {
        const complaint = await fakeComplaintsRepository.create({
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
            region_id: 'Id999',
        });

        await fakeComplaintsRepository.create({
            victim: 'Maria da Penha',
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
            region_id: 'Id999',
        });

        const data = {
            region_id: complaint.region_id,
            id: String(complaint.id),
            victim: complaint.victim,
            cpf: complaint.cpf,
        };

        const complaints = listComplaints.execute(data);

        expect((await complaints).length).toBe(2);
    });

    it('should be able to create the SQL with all parameters except id', async () => {
        const complaint = await fakeComplaintsRepository.create({
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
            region_id: 'Id999',
        });

        await fakeComplaintsRepository.create({
            victim: 'Maria da Penha',
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
            region_id: 'Id999',
        });

        const data = {
            victim: complaint.victim,
            cpf: complaint.cpf,
        };

        const complaints = listComplaints.execute(data);

        expect((await complaints).length).toBe(2);
    });

    it('should be able to create the SQL with only cpf as parameters', async () => {
        const complaint = await fakeComplaintsRepository.create({
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
            region_id: 'Id999',
        });

        await fakeComplaintsRepository.create({
            victim: 'Maria da Penha',
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
            region_id: 'Id999',
        });

        const data = {
            cpf: complaint.cpf,
        };

        const complaints = listComplaints.execute(data);

        expect((await complaints).length).toBe(2);
    });

    it('should be able to create the SQL with a region_id array', async () => {
        const complaint = await fakeComplaintsRepository.create({
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
            region_id: 'Id999',
        });

        await fakeComplaintsRepository.create({
            victim: 'Maria da Penha',
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
            region_id: 'Id999',
        });

        const data = {
            region_id: ['Id999', 'Id998'],
        };

        const complaints = listComplaints.execute(data);

        expect((await complaints).length).toBe(2);
    });
});
