import Complaint from '../infra/typeorm/entities/Complaint';

export default interface IFindAllUsers {
    complaints: Complaint[];
    total: number;
}
