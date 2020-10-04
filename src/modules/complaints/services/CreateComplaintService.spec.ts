import FakeNotificationsRepository from '@modules/notifications/repositories/fakes/FakeNotificationsRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import FakeComplaintsRepository from '../repositories/fakes/FakeComplaintsRepository';
import CreateComplaintService from './CreateComplaintService';

let fakeComplaintsRepository: FakeComplaintsRepository;
let fakeNotificationsRepository: FakeNotificationsRepository;
let fakeMailProvider: FakeMailProvider;
let createComplaints: CreateComplaintService;

describe('CreateComplaintService', () => {
    beforeEach(() => {
        fakeComplaintsRepository = new FakeComplaintsRepository();
        fakeNotificationsRepository = new FakeNotificationsRepository();
        fakeMailProvider = new FakeMailProvider();

        createComplaints = new CreateComplaintService(
            fakeComplaintsRepository,
            fakeNotificationsRepository,
            fakeMailProvider,
        );
    });

    it('should be able to create a new complaint', async () => {
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
            region_id: 'Id99999',
        });

        expect(complaint).toHaveProperty('id');
        expect(complaint.victim).toBe('Maria José');
    });
});
