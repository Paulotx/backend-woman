import { getRepository, Repository } from 'typeorm';

import IRegionsRepository from '@modules/regions/repositories/IRegionsRepository';
import ICreateRegionsDTO from '@modules/regions/dtos/ICreateRegionsDTO';
import Region from '../entities/Region';

class UserRepository implements IRegionsRepository {
    private ormRepository: Repository<Region>;

    constructor() {
        this.ormRepository = getRepository(Region);
    }

    public async findAllRegions(): Promise<Region[]> {
        const regions = this.ormRepository.find();

        return regions;
    }

    public async findByName(name: string): Promise<Region | undefined> {
        const findRegion = await this.ormRepository.findOne({
            where: { name },
        });

        return findRegion;
    }

    public async findById(id: string): Promise<Region | undefined> {
        const findRegion = await this.ormRepository.findOne({
            where: { id },
        });

        return findRegion;
    }

    public async create(data: ICreateRegionsDTO): Promise<Region> {
        const region = this.ormRepository.create(data);

        await this.ormRepository.save(region);

        return region;
    }

    public async remove(region: Region): Promise<void> {
        await this.ormRepository.remove(region);
    }

    public async save(region: Region): Promise<Region> {
        return this.ormRepository.save(region);
    }
}

export default UserRepository;
