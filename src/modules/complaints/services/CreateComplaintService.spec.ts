import FakeNotificationsRepository from '@modules/notifications/repositories/fakes/FakeNotificationsRepository';
import FakeRegionsRepository from '@modules/regions/repositories/fakes/FakeRegionsRepository';
import FakeUserRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import FakeComplaintsRepository from '../repositories/fakes/FakeComplaintsRepository';
import CreateComplaintService from './CreateComplaintService';

let fakeComplaintsRepository: FakeComplaintsRepository;
let fakeNotificationsRepository: FakeNotificationsRepository;
let fakeUsersRepository: FakeUserRepository;
let fakeRegionsRepository: FakeRegionsRepository;
let fakeMailProvider: FakeMailProvider;
let createComplaints: CreateComplaintService;

describe('CreateComplaintService', () => {
    beforeEach(() => {
        fakeComplaintsRepository = new FakeComplaintsRepository();
        fakeNotificationsRepository = new FakeNotificationsRepository();
        fakeRegionsRepository = new FakeRegionsRepository();
        fakeUsersRepository = new FakeUserRepository();
        fakeMailProvider = new FakeMailProvider();

        createComplaints = new CreateComplaintService(
            fakeComplaintsRepository,
            fakeNotificationsRepository,
            fakeRegionsRepository,
            fakeUsersRepository,
            fakeMailProvider,
        );
    });

    it('should be able to create a new complaint', async () => {
        const user = await fakeUsersRepository.create({
            name: 'User Test',
            email: 'user@gmail.com',
            perfil: 'admin',
            password: '1234',
        });

        const region = await fakeRegionsRepository.create({
            name: 'Uruana',
            city: 'Uruana',
            uf: 'GO',
            responsible: user.id,
        });

        console.log(region.id);

        const complaint = await createComplaints.execute({
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
            region_id: region.id,
        });

        expect(complaint).toHaveProperty('id');
        expect(complaint.victim).toBe('Maria José');
    });
});
