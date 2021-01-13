import ICreateLinkUserRegionDTO from '@modules/users/dtos/ICreateLinkUserRegionDTO';

import IUserRegionRepository from '../IUserRegionRepository';
import UserRegion from '../../infra/typeorm/entities/UserRegion';

class FakeUserRegionRepository implements IUserRegionRepository {
    private userRegions: UserRegion[] = [];

    public async create({
        user_id,
        region_id,
    }: ICreateLinkUserRegionDTO): Promise<UserRegion> {
        const userRegion = new UserRegion();

        Object.assign(userRegion, { user_id, region_id });

        this.userRegions.push(userRegion);

        return userRegion;
    }

    public async remove(link: UserRegion): Promise<void> {
        this.userRegions.filter(
            region =>
                region.region_id !== link.region_id &&
                region.user_id !== link.user_id,
        );
    }

    public async findByUserIdAndRegionId(
        user_id: string,
        region_id: string,
    ): Promise<UserRegion | undefined> {
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
