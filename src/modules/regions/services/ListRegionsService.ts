import { injectable, inject } from 'tsyringe';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/IChacheProvider';
import IRegionsRepository from '../repositories/IRegionsRepository';
import Region from '../infra/typeorm/entities/Region';

@injectable()
class ListRegionsService {
    constructor(
        @inject('RegionsRepository')
        private regionsRepository: IRegionsRepository,

        @inject('CacheProvider')
        private cacheProvider: ICacheProvider,
    ) {}

    public async execute(): Promise<Region[]> {
        let regions = await this.cacheProvider.recover<Region[]>(
            'regions-list',
        );

        if (!regions) {
            regions = await this.regionsRepository.findAllRegions();

            await this.cacheProvider.save('regions-list', regions);
        }

        return regions;
    }
}

export default ListRegionsService;
