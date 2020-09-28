import AppError from '@shared/errors/AppError';
import FakeRegionsRepository from '../repositories/fakes/FakeRegionsRepository';

import CreateRegionService from './CreateRegionService';

let fakeRegionsRepository: FakeRegionsRepository;
let createRegion: CreateRegionService;

describe('CreateRegionService', () => {
    beforeEach(() => {
        fakeRegionsRepository = new FakeRegionsRepository();

        createRegion = new CreateRegionService(fakeRegionsRepository);
    });

    it('should be able to create a new region', async () => {
        const region = await createRegion.execute({
            name: 'Region',
            city: 'Uruana',
            uf: 'GO',
            responsible: 'idResponsible',
        });

        expect(region).toHaveProperty('id');
    });

    it('should not be able to create a new region with an existing name', async () => {
        await createRegion.execute({
            name: 'Region',
            city: 'Uruana',
            uf: 'GO',
            responsible: 'idResponsible',
        });

        await expect(
            createRegion.execute({
                name: 'Region',
                city: 'Goiânia',
                uf: 'GO',
                responsible: 'idResponsible',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
