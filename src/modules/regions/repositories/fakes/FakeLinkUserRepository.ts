import ICreateLinkUserRegionDTO from '@modules/regions/dtos/ICreateLinkUserRegionDTO';
import ILinkUserRegionRepository from '../ILinkUserRegionRepository';

import UserRegion from '../../infra/typeorm/entities/UserRegion';

class FakeLinkUserRegionRepository implements ILinkUserRegionRepository {
    private userRegions: UserRegion[] = [];

    public async create({
        user_id,
        region_id,
    }: ICreateLinkUserRegionDTO): Promise<void> {
        const userRegion = new UserRegion();

        Object.assign(userRegion, { user_id, region_id });

        this.userRegions.push(userRegion);
    }

    public async findByUserIDAndRegionId({
        user_id,
        region_id,
    }: ICreateLinkUserRegionDTO): Promise<UserRegion | undefined> {
        const findUserRegion = this.userRegions.find(
            userRegion =>
                userRegion.user_id === user_id &&
                userRegion.region_id === region_id,
        );

        return findUserRegion;
    }
}

export default FakeLinkUserRegionRepository;
