import AppError from '@shared/errors/AppError';
// import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import ILinkUserRegionRepository from '../repositories/ILinkUserRegionRepository';

interface IRequest {
    user_id: string;
    region_id: string;
}

@injectable()
class CreateUserService {
    constructor(
        @inject('LinkUserRegionRepository')
        private linkUserRegionRepository: ILinkUserRegionRepository,
    ) {}

    public async execute({ user_id, region_id }: IRequest): Promise<void> {
        const userRegion = await this.linkUserRegionRepository.findByUserIDAndRegionId(
            { user_id, region_id },
        );

        if (userRegion) {
            throw new AppError('Data already registered');
        }

        await this.linkUserRegionRepository.create({
            user_id,
            region_id,
        });
    }
}

export default CreateUserService;
