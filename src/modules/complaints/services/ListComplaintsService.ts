import ICacheProvider from '@shared/container/providers/CacheProvider/models/IChacheProvider';
import { injectable, inject } from 'tsyringe';

import Complaint from '../infra/typeorm/entities/Complaint';
import IComplaintsRepository from '../repositories/IComplaintsRepository';

@injectable()
class ListComplaintsService {
    constructor(
        @inject('ComplaintsRepository')
        private complaintsRepository: IComplaintsRepository,

        @inject('CacheProvider')
        private cacheProvider: ICacheProvider,
    ) {}

    public async execute(): Promise<Complaint[]> {
        let complaints = await this.cacheProvider.recover<Complaint[]>(
            'complaints-list',
        );

        if (!complaints) {
            complaints = await this.complaintsRepository.findAllComplaints();

            await this.cacheProvider.save('complaints-list', complaints);
        }

        return complaints;
    }
}

export default ListComplaintsService;
