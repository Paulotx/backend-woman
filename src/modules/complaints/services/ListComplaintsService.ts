import { injectable, inject } from 'tsyringe';

import IFindComplaintsDTO from '../dtos/IFindComplaintsDTO';

import IComplaintsRepository from '../repositories/IComplaintsRepository';

interface IRequest {
    id?: string;
    victim?: string;
    cpf?: string;
    status?: string;
    region_id?: string | Array<string>;
}

@injectable()
class ListComplaintsService {
    constructor(
        @inject('ComplaintsRepository')
        private complaintsRepository: IComplaintsRepository,
    ) {}

    public async execute(
        data: IRequest,
        page: number,
    ): Promise<IFindComplaintsDTO> {
        let query = '';
        let filterQuery = '';

        if (data.region_id) {
            if (
                data.region_id.length === 1 ||
                typeof data.region_id === 'string'
            ) {
                filterQuery += `(region_id = '${data.region_id}')`;
            } else if (typeof data.region_id === 'object') {
                data.region_id.forEach(item => {
                    if (data.region_id) {
                        if (
                            data.region_id[data.region_id.length - 1] === item
                        ) {
                            filterQuery += `region_id = '${item}'`;
                        } else {
                            filterQuery += `region_id = '${item}' OR `;
                        }
                    }
                });
                filterQuery += ')';
            }
        }
        if (data.id) {
            filterQuery += ` AND (id = ${data.id}`;

            if (data.victim) {
                filterQuery += ` OR victim LIKE '%${data.victim}%'`;
            }

            if (data.cpf) {
                filterQuery += ` OR cpf = '${data.cpf}'`;
            }

            if (data.status) {
                filterQuery += ` OR status = '${data.status}'`;
            }
            filterQuery += ')';
        }

        if (!data.id && data.victim) {
            filterQuery += ` AND (victim LIKE '%${data.victim}%'`;

            if (data.cpf) {
                filterQuery += ` OR cpf LIKE '%${data.cpf}%'`;
            }

            if (data.status) {
                filterQuery += ` OR status = '${data.status}'`;
            }
            filterQuery += ')';
        }

        if (!data.id && !data.victim && data.cpf) {
            filterQuery += ` AND (cpf = '${data.cpf}')`;

            if (data.status) {
                filterQuery += ` OR status = '${data.status}'`;
            }
        }

        if (!data.id && !data.victim && !data.cpf && data.status) {
            filterQuery += ` AND (status = '${data.status}')`;
        }

        const offset = (page - 1) * 10;

        query += ` SELECT *, (SELECT count(*) FROM complaints WHERE ${filterQuery}) AS total FROM complaints WHERE ${filterQuery} GROUP BY id ORDER BY id DESC LIMIT 10 OFFSET ${offset}`;

        const complaints = await this.complaintsRepository.findAllComplaintsWithParams(
            query,
        );

        return complaints;
    }
}

export default ListComplaintsService;
