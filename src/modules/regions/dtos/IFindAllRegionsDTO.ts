import Region from '../infra/typeorm/entities/Region';

export default interface IFindAllUsers {
    regions: Region[];
    total: number;
}
