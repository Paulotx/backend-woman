import { getRepository, Repository } from 'typeorm';

import ICreateLinkUserRegionDTO from '@modules/regions/dtos/ICreateLinkUserRegionDTO';
import ILinkUserRegionRepository from '@modules/regions/repositories/ILinkUserRegionRepository';
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

    public async findByUserIDAndRegionId({
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
}

export default LinkUserRegionRepository;
