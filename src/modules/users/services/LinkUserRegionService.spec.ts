import AppError from '@shared/errors/AppError';
import FakeUserRegionRepository from '../repositories/fakes/FakeUserRegionRepository';

import LinkUserRegionService from './LinkUserRegionService';

let fakeUserRegionRepository: FakeUserRegionRepository;
let linkUserRegion: LinkUserRegionService;

describe('CreateRegionService', () => {
    beforeEach(() => {
        fakeUserRegionRepository = new FakeUserRegionRepository();

        linkUserRegion = new LinkUserRegionService(fakeUserRegionRepository);
    });

    it('should be able to create a new link user to region', async () => {
        await expect(
            linkUserRegion.execute({
                user_id: 'userId',
                region_id: 'regionId',
            }),
        ).not.toBeInstanceOf(AppError);
    });

    it('should be able to create a new link between a user and a region with an existing registration', async () => {
        await linkUserRegion.execute({
            user_id: 'userId',
            region_id: 'regionId',
        });

        await expect(
            linkUserRegion.execute({
                user_id: 'userId',
                region_id: 'regionId',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
