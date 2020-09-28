import ICreateRegionsDTO from '@modules/regions/dtos/ICreateRegionsDTO';
import IRegionsRepository from '../IRegionsRepository';

import Region from '../../infra/typeorm/entities/Region';

class FakeRegionsRepository implements IRegionsRepository {
    private regions: Region[] = [];

    public async findByName(name: string): Promise<Region | undefined> {
        const findRegion = this.regions.find(region => region.name === name);

        return findRegion;
    }

    public async create(data: ICreateRegionsDTO): Promise<Region> {
        const region = new Region();

        Object.assign(region, { id: this.regions.length + 1 }, data);

        this.regions.push(region);

        return region;
    }
}

export default FakeRegionsRepository;
