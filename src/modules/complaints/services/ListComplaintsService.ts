import ICacheProvider from '@shared/container/providers/CacheProvider/models/IChacheProvider';
import { injectable, inject } from 'tsyringe';

import Complaint from '../infra/typeorm/entities/Complaint';
import IComplaintsRepository from '../repositories/IComplaintsRepository';

interface IRequest {
    id?: string;
    victim?: string;
    cpf?: string;
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

        let query = 'SELECT * FROM complaints WHERE (';

        if (data.region_id) {
            if (data.region_id.length === 1) {
                query += `region_id = '${data.region_id}')`;
            } else if (typeof data.region_id === 'object') {
                data.region_id.forEach(item => {
                    if (data.region_id) {
                        if (
                            data.region_id[data.region_id.length - 1] === item
                        ) {
                            query += `region_id = '${item}'`;
                        } else {
                            query += `region_id = '${item}' OR `;
                        }
                    }
                });
                query += ')';
            }
        }
        if (data.id) {
            query += ` AND (id = ${data.id}`;

            if (data.victim) {
                query += ` OR victim LIKE '%${data.victim}%'`;
            }

            if (data.cpf) {
                query += ` OR cpf LIKE '%${data.cpf}%'`;
            }
            query += ')';
        }

        if (!data.id && data.victim) {
            query += ` AND (id = ${data.victim}`;

            if (data.cpf) {
                query += ` OR cpf LIKE '%${data.cpf}%'`;
            }
            query += ')';
        }

        if (!data.id && !data.victim && data.cpf) {
            query += ` AND (id = ${data.cpf})`;
        }

        console.log(query);

        const complaints = await this.complaintsRepository.findAllComplaintsWithParams(
            query,
        );

        //     await this.cacheProvider.save('complaints-list', complaints);
        // }

        return complaints;
    }
}

export default ListComplaintsService;
