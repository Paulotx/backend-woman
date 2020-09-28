import ICreateLinkUserRegionDTO from '../dtos/ICreateLinkUserRegionDTO';
import UserRegion from '../infra/typeorm/entities/UserRegion';

export default interface ILinkUserRegionRepository {
    create(data: ICreateLinkUserRegionDTO): Promise<void>;
    findByUserIDAndRegionId(
        data: ICreateLinkUserRegionDTO,
    ): Promise<UserRegion | undefined>;
}
