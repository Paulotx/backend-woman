import { getRepository, Repository } from 'typeorm';

import ICreateLinkUserRegionDTO from '@modules/users/dtos/ICreateLinkUserRegionDTO';
import ILinkUserRegionRepository from '@modules/users/repositories/IUserRegionRepository';
import UserRegion from '../entities/UserRegion';

class LinkUserRegionRepository implements ILinkUserRegionRepository {
    private ormRepository: Repository<UserRegion>;

    constructor() {
        this.ormRepository = getRepository(UserRegion);
    }

    public async create(data: ICreateLinkUserRegionDTO): Promise<void> {
        const userRegion = this.ormRepository.create(data);

        await this.ormRepository.save(userRegion);
    }

    public async findByUserIdAndRegionId({
        user_id,
        region_id,
    }: ICreateLinkUserRegionDTO): Promise<UserRegion | undefined> {
        const findUserRegion = this.ormRepository.findOne({
            where: {
                user_id,
                region_id,
            },
        });

        return findUserRegion;
    }

    public async findRegionByUser(
        user_id: string,
    ): Promise<UserRegion[] | undefined> {
        const findUserRegion = this.ormRepository.find({
            where: {
                user_id,
            },
        });

        return findUserRegion;
    }
}

export default LinkUserRegionRepository;
