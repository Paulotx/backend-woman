import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';

import Region from '../infra/typeorm/entities/Region';
import IRegionsRepository from '../repositories/IRegionsRepository';

interface IRequest {
    name: string;
    city: string;
    uf: string;
    responsible: string;
}

@injectable()
class CreateUserService {
    constructor(
        @inject('RegionsRepository')
        private regionsRepository: IRegionsRepository,
    ) {}

    public async execute({
        name,
        city,
        uf,
        responsible,
    }: IRequest): Promise<Region> {
        const findRegion = await this.regionsRepository.findByName(name);

        if (findRegion) {
            throw new AppError('Name is already in use.');
        }

        const region = await this.regionsRepository.create({
            name,
            city,
            uf,
            responsible,
        });

        return region;
    }
}

export default CreateUserService;
