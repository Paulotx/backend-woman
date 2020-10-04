import ICreateLinkUserRegionDTO from '@modules/users/dtos/ICreateLinkUserRegionDTO';
import IUserRegionRepository from '../IUserRegionRepository';

import UserRegion from '../../infra/typeorm/entities/UserRegion';

class FakeUserRegionRepository implements IUserRegionRepository {
    private userRegions: UserRegion[] = [];

    public async create({
        user_id,
        region_id,
    }: ICreateLinkUserRegionDTO): Promise<void> {
        const userRegion = new UserRegion();

        Object.assign(userRegion, { user_id, region_id });

        this.userRegions.push(userRegion);
    }

    public async findByUserIdAndRegionId({
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

    public async findRegionByUser(
        user_id: string,
    ): Promise<UserRegion[] | undefined> {
        const findUserRegion = this.userRegions.filter(
            userRegion => userRegion.user_id === user_id,
        );

        return findUserRegion;
    }
}

export default FakeUserRegionRepository;
