import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import UserRegion from '../infra/typeorm/entities/UserRegion';
import IUserRegionRepository from '../repositories/IUserRegionRepository';

interface IRequest {
    user_id: string;
    region_id: string;
}

@injectable()
class LinkUserRegionService {
    constructor(
        @inject('UserRegionRepository')
        private userRegionRepository: IUserRegionRepository,
    ) {}

    public async execute({
        user_id,
        region_id,
    }: IRequest): Promise<UserRegion> {
        const userRegion = await this.userRegionRepository.findByUserIdAndRegionId(
            user_id,
            region_id,
        );

        if (userRegion) {
            throw new AppError('Data already registered');
        }

        const linkUserRegion = await this.userRegionRepository.create({
            user_id,
            region_id,
        });

        return linkUserRegion;
    }
}

export default LinkUserRegionService;
