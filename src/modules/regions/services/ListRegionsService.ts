import { injectable, inject } from 'tsyringe';

import IRegionsRepository from '../repositories/IRegionsRepository';
import IFindAllRegionsDTO from '../dtos/IFindAllRegionsDTO';
import Region from '../infra/typeorm/entities/Region';

@injectable()
class ListRegionsService {
    constructor(
        @inject('RegionsRepository')
        private regionsRepository: IRegionsRepository,
    ) {}

    public async execute(page: number): Promise<IFindAllRegionsDTO | Region[]> {
        if (page === 0) {
            const regions = await this.regionsRepository.findAllRegions();
            return regions;
        }
        const regions = await this.regionsRepository.findAllRegionsPaginate(
            page,
        );
        return regions;
    }
}

export default ListRegionsService;
