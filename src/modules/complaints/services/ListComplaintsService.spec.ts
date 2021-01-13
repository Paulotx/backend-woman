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
            region_id: 'region_id',
        });

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
            region_id: 'region_id',
        });

        const region_id = 'region_id';

        const complaints = await listComplaints.execute({ region_id }, 1);

        expect(complaints.total).toBe(2);
    });

    it('should be able to create the SQL with all parameters', async () => {
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
            region_id: 'region_id',
        });

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
            region_id: 'region_id',
        });

        const data = {
            region_id: complaint.region_id,
            id: String(complaint.id),
            victim: complaint.victim,
            cpf: complaint.cpf,
            status: complaint.status,
        };

        const complaints = await listComplaints.execute(data, 1);

        expect(complaints.total).toBe(2);
    });

    it('should be able to create the SQL with all parameters except id', async () => {
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
            region_id: 'region_id',
        });

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
            region_id: 'region_id',
        });

        const data = {
            victim: complaint.victim,
            cpf: complaint.cpf,
            status: complaint.status,
        };

        const complaints = await listComplaints.execute(data, 1);

        expect(complaints.total).toBe(2);
    });

    it('should be able to create the SQL with only cpf and status as parameters', async () => {
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
            region_id: 'region_id',
        });

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
            region_id: 'region_id',
        });

        const data = {
            cpf: complaint.cpf,
            status: complaint.status,
        };

        const complaints = await listComplaints.execute(data, 1);

        expect(complaints.total).toBe(2);
    });

    it('should be able to create the SQL with only cpf as parameters', async () => {
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
            region_id: 'region_id',
        });

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
            region_id: 'region_id',
        });

        const data = {
            cpf: complaint.cpf,
        };

        const complaints = await listComplaints.execute(data, 1);

        expect(complaints.total).toBe(2);
    });

    it('should be able to create the SQL with a region_id array', async () => {
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
            region_id: 'region_id1',
        });

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
            region_id: 'region_id2',
        });

        const data = {
            region_id: ['region_id2', 'region_id1'],
        };

        const complaints = await listComplaints.execute(data, 1);

        expect(complaints.total).toBe(2);
    });
});
