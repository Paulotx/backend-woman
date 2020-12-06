import ICreateRegionsDTO from '../dtos/ICreateRegionsDTO';
import IFindAllRegionsDTO from '../dtos/IFindAllRegionsDTO';

import Region from '../infra/typeorm/entities/Region';

export default interface IReportsRepository {
    findAllRegions(): Promise<Region[]>;
    findAllRegionsPaginate(page: number): Promise<IFindAllRegionsDTO>;
    findByName(name: string): Promise<Region | undefined>;
    findById(id: string): Promise<Region | undefined>;
    create(data: ICreateRegionsDTO): Promise<Region>;
    save(region: Region): Promise<Region>;
    remove(region: Region): Promise<void>;
}
