import { getRepository, Repository } from 'typeorm';

import ICreateLinkUserRegionDTO from '@modules/users/dtos/ICreateLinkUserRegionDTO';
import IUserRegionRepository from '@modules/users/repositories/IUserRegionRepository';
import UserRegion from '../entities/UserRegion';

class UserRegionRepository implements IUserRegionRepository {
    private ormRepository: Repository<UserRegion>;

    constructor() {
        this.ormRepository = getRepository(UserRegion);
    }

    public async create(data: ICreateLinkUserRegionDTO): Promise<UserRegion> {
        const userRegion = this.ormRepository.create(data);

        const linkUserRegion = await this.ormRepository.save(userRegion);

        return linkUserRegion;
    }

    public async remove(linkUserRegion: UserRegion): Promise<void> {
        await this.ormRepository.remove(linkUserRegion);
    }

    public async findByUserIdAndRegionId(
        user_id: string,
        region_id: string,
    ): Promise<UserRegion | undefined> {
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

export default UserRegionRepository;
