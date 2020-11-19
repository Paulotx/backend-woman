import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';

import IUserRegionRepository from '../repositories/IUserRegionRepository';

interface IRequest {
    user_id: string;
    region_id: string;
}

@injectable()
class DeleteUserService {
    constructor(
        @inject('UserRegionRepository')
        private userRegionRepository: IUserRegionRepository,
    ) {}

    public async execute({ user_id, region_id }: IRequest): Promise<void> {
        const userRegion = await this.userRegionRepository.findByUserIdAndRegionId(
            user_id,
            region_id,
        );

        if (!userRegion) {
            throw new AppError('Data not found.');
        }

        await this.userRegionRepository.remove(userRegion);
    }
}

export default DeleteUserService;
