import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/IChacheProvider';
import IRegionsRepository from '../repositories/IRegionsRepository';

import User from '../infra/typeorm/entities/Region';

interface IRequest {
    id: string;
    name: string;
    uf: string;
    city: string;
    responsible: string;
}

@injectable()
class UpdateRegionService {
    constructor(
        @inject('RegionsRepository')
        private regionsRepository: IRegionsRepository,

        @inject('CacheProvider')
        private cacheProvider: ICacheProvider,
    ) {}

    public async execute({
        id,
        name,
        uf,
        city,
        responsible,
    }: IRequest): Promise<User> {
        const region = await this.regionsRepository.findById(id);

        if (!region) {
            throw new AppError('Region not found.');
        }

        const findRegionWithName = await this.regionsRepository.findByName(
            name,
        );

        if (findRegionWithName && findRegionWithName.id !== id) {
            throw new AppError('Name already in use.');
        }

        region.name = name;
        region.uf = uf;
        region.city = city;
        region.responsible = responsible;
        region.updated_at = new Date();

        await this.cacheProvider.invalidate('regions-list');

        return this.regionsRepository.save(region);
    }
}

export default UpdateRegionService;
