import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IRegionsRepository from '../repositories/IRegionsRepository';

import User from '../infra/typeorm/entities/Region';

interface IRequest {
    id: string;
}

@injectable()
class ShowRegionService {
    constructor(
        @inject('RegionsRepository')
        private regionsRepository: IRegionsRepository,
    ) {}

    public async execute({ id }: IRequest): Promise<User> {
        const region = await this.regionsRepository.findById(id);

        if (!region) {
            throw new AppError('Region not found.');
        }

        return region;
    }
}

export default ShowRegionService;
