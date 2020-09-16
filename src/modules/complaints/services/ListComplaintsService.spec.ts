import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeComplaintsRepository from '../repositories/fakes/FakeComplaintsRepository';
import ListComplaintsService from './ListComplaintsService';

let fakeComplaintsRepository: FakeComplaintsRepository;
let fakeCacheProvider: FakeCacheProvider;
let listComplaints: ListComplaintsService;

describe('ListComplaintsService', () => {
    beforeEach(() => {
        fakeComplaintsRepository = new FakeComplaintsRepository();
        fakeCacheProvider = new FakeCacheProvider();

        listComplaints = new ListComplaintsService(
            fakeComplaintsRepository,
            fakeCacheProvider,
        );
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
        });

        const complaints = listComplaints.execute();

        expect((await complaints).length).toBe(2);
    });
});
