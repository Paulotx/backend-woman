import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUserRegionRepository from '../repositories/IUserRegionRepository';

import UserRegion from '../infra/typeorm/entities/UserRegion';

interface IRequest {
    user_id: string;
}

@injectable()
class ShowLinkUserRegionService {
    constructor(
        @inject('UserRegionRepository')
        private userRegionRepository: IUserRegionRepository,
    ) {}

    public async execute({ user_id }: IRequest): Promise<UserRegion[]> {
        const regions = await this.userRegionRepository.findRegionByUser(
            user_id,
        );

        if (!regions) {
            throw new AppError('No linked region.');
        }

        return regions;
    }
}

export default ShowLinkUserRegionService;
