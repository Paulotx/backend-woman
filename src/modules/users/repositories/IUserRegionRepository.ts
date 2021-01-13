import ICreateLinkUserRegionDTO from '@modules/users/dtos/ICreateLinkUserRegionDTO';

import UserRegion from '../infra/typeorm/entities/UserRegion';

export default interface IUserRegionRepository {
    create(data: ICreateLinkUserRegionDTO): Promise<UserRegion>;
    remove(link: UserRegion): Promise<void>;

    findByUserIdAndRegionId(
        user_id: string,
        region_id: string,
    ): Promise<UserRegion | undefined>;

    findRegionByUser(user_id: string): Promise<UserRegion[] | undefined>;
}
