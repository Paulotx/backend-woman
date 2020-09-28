import ICreateRegionsDTO from '../dtos/ICreateRegionsDTO';
import Region from '../infra/typeorm/entities/Region';

export default interface IRegionsRepository {
    findByName(name: string): Promise<Region | undefined>;
    create(data: ICreateRegionsDTO): Promise<Region>;
}
