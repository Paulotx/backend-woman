import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/IChacheProvider';
import IRegionsRepository from '../repositories/IRegionsRepository';

interface IRequest {
    id: string;
}

@injectable()
class DeleteUserService {
    constructor(
        @inject('RegionsRepository')
        private regionsRepository: IRegionsRepository,

        @inject('CacheProvider')
        private cacheProvider: ICacheProvider,
    ) {}

    public async execute({ id }: IRequest): Promise<void> {
        const region = await this.regionsRepository.findById(id);

        if (!region) {
            throw new AppError('Region not found.');
        }

        await this.regionsRepository.remove(region);

        await this.cacheProvider.invalidate('regions-list');
    }
}

export default DeleteUserService;
