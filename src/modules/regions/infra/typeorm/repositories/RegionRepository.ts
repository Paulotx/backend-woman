import { getRepository, Repository } from 'typeorm';

import IRegionsRepository from '@modules/regions/repositories/IRegionsRepository';
import ICreateRegionsDTO from '@modules/regions/dtos/ICreateRegionsDTO';
import Region from '../entities/Region';

class UserRepository implements IRegionsRepository {
    private ormRepository: Repository<Region>;

    constructor() {
        this.ormRepository = getRepository(Region);
    }

    public async findByName(name: string): Promise<Region | undefined> {
        const findRegion = await this.ormRepository.findOne({
            where: { name },
        });

        return findRegion;
    }

    public async create(data: ICreateRegionsDTO): Promise<Region> {
        const region = this.ormRepository.create(data);

        await this.ormRepository.save(region);

        return region;
    }
}

export default UserRepository;
