import ICacheProvider from '@shared/container/providers/CacheProvider/models/IChacheProvider';
import { id } from 'date-fns/locale';
import { injectable, inject } from 'tsyringe';
import IFindWithParamsDTO from '../dtos/IFindWithParamsDTO';

import Complaint from '../infra/typeorm/entities/Complaint';
import IComplaintsRepository from '../repositories/IComplaintsRepository';

interface IRequest {
    id?: string | Array<string>;
    victim?: string | Array<string>;
    cpf?: string | Array<string>;
    region_id?: string | Array<string>;
}

@injectable()
class ListComplaintsService {
    constructor(
        @inject('ComplaintsRepository')
        private complaintsRepository: IComplaintsRepository,

        @inject('CacheProvider')
        private cacheProvider: ICacheProvider,
    ) {}

    public async execute(data: IRequest): Promise<Complaint[]> {
        // console.log(data);
        // let complaints = await this.cacheProvider.recover<Complaint[]>(
        //     'complaints-list',
        // );

        // if (!complaints) {

        const params: IFindWithParamsDTO[] = [];

        if (data.id) {
            if (typeof data.id === 'string') {
                params.push({ id: Number(data.id) });
            } else {
                data.id.forEach(item => {
                    params.push({ id: Number(item) });
                });
            }
        }

        if (data.victim) {
            if (typeof data.victim === 'string') {
                params.push({ victim: data.victim });
            } else {
                data.victim.forEach(item => {
                    params.push({ victim: item });
                });
            }
        }

        if (data.cpf) {
            if (typeof data.cpf === 'string') {
                params.push({ cpf: data.cpf });
            } else {
                data.cpf.forEach(item => {
                    params.push({ cpf: item });
                });
            }
        }

        if (data.region_id) {
            if (typeof data.region_id === 'string') {
                params.push({ region_id: data.region_id });
            } else {
                data.region_id.forEach(item => {
                    params.push({ region_id: item });
                });
            }
        }

        const complaints = await this.complaintsRepository.findAllComplaints(
            params,
        );

        //     await this.cacheProvider.save('complaints-list', complaints);
        // }

        return complaints;
    }
}

export default ListComplaintsService;
