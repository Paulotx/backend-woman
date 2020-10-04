import ICreateLinkUserRegionDTO from '../dtos/ICreateLinkUserRegionDTO';
import UserRegion from '../infra/typeorm/entities/UserRegion';

export default interface ILinkUserRegionRepository {
    create(data: ICreateLinkUserRegionDTO): Promise<void>;

    findByUserIdAndRegionId(
        data: ICreateLinkUserRegionDTO,
    ): Promise<UserRegion | undefined>;

    findRegionByUser(user_id: string): Promise<UserRegion[] | undefined>;
}
