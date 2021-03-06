import { getRepository, Repository } from 'typeorm';

import IRegionsRepository from '@modules/regions/repositories/IRegionsRepository';
import ICreateRegionsDTO from '@modules/regions/dtos/ICreateRegionsDTO';
import IFindAllRegionsDTO from '@modules/regions/dtos/IFindAllRegionsDTO';

import Region from '../entities/Region';

class RegionsRepository implements IRegionsRepository {
    private ormRepository: Repository<Region>;

    constructor() {
        this.ormRepository = getRepository(Region);
    }

    public async findAllRegions(): Promise<Region[]> {
        const regions = await this.ormRepository.find();

        return regions;
    }

    public async findAllRegionsPaginate(
        page: number,
    ): Promise<IFindAllRegionsDTO> {
        const [regions, total] = await this.ormRepository.findAndCount({
            skip: (page - 1) * 10,
            take: 10,
            order: {
                name: 'ASC',
            },
        });

        return {
            regions,
            total,
        };
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

export default RegionsRepository;
