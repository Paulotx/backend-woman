import ICreateRegionsDTO from '@modules/regions/dtos/ICreateRegionsDTO';
import IFindAllRegionsDTO from '@modules/regions/dtos/IFindAllRegionsDTO';
import IRegionsRepository from '../IRegionsRepository';

import Region from '../../infra/typeorm/entities/Region';

class FakeRegionsRepository implements IRegionsRepository {
    private regions: Region[] = [];

    public async findAllRegions(): Promise<Region[]> {
        return this.regions;
    }

    public async findAllRegionsPaginate(
        page: number,
    ): Promise<IFindAllRegionsDTO> {
        let limitStart = 1;
        let limitEnd = 0;

        if (page > 1) {
            limitStart = (page - 1) * 10 + 1;
        }

        limitEnd = page * 10;

        const regions = this.regions.filter(
            (_, index) => index + 1 >= limitStart && index + 1 <= limitEnd,
        );

        return {
            regions,
            total: regions.length,
        };
    }

    public async findByName(name: string): Promise<Region | undefined> {
        const findRegion = this.regions.find(region => region.name === name);

        return findRegion;
    }

    public async findById(id: string): Promise<Region | undefined> {
        const findRegion = this.regions.find(region => region.id === id);

        return findRegion;
    }

    public async create(data: ICreateRegionsDTO): Promise<Region> {
        const region = new Region();

        Object.assign(region, { id: this.regions.length + 1 }, data);

        this.regions.push(region);

        return region;
    }

    public async save(region: Region): Promise<Region> {
        const findIndex = this.regions.findIndex(
            findRegions => findRegions.id === region.id,
        );

        this.regions[findIndex] = region;

        return region;
    }

    public async remove(region: Region): Promise<void> {
        const findIndex = this.regions.findIndex(
            findRegion => findRegion.id === region.id,
        );

        delete this.regions[findIndex];
    }
}

export default FakeRegionsRepository;
