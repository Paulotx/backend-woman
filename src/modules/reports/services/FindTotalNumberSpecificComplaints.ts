import { injectable, inject } from 'tsyringe';

import IReportsRepository from '../repositories/IReportsRepository';
import calculateAgeDate from '../utils/calculateAgeDate';

interface IRequest {
    region_id?: string | Array<string>;
    age?: number;
    race?: string;
    relation?: string;
    type?: string;
    startDate?: string;
    endDate?: string;
}

@injectable()
class FindTotalNumberSpecificComplaints {
    constructor(
        @inject('ReportsRepository')
        private reportsRepository: IReportsRepository,
    ) {}

    public async execute(data: IRequest): Promise<number> {
        let query = '';
        let filterQuery = '';

        if (data.region_id) {
            if (
                data.region_id.length === 1 ||
                typeof data.region_id === 'string'
            ) {
                filterQuery += `WHERE (region_id = '${data.region_id}')`;
            } else if (typeof data.region_id === 'object') {
                filterQuery += 'WHERE (';

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

        if (data.age) {
            const { startDateFormatted, dateFormatted } = calculateAgeDate(
                data.age,
            );

            if (!data.region_id) {
                filterQuery += 'WHERE ';
            }

            if (data.region_id) {
                filterQuery += ' AND ';
            }

            filterQuery += `(birth::date >= '${startDateFormatted}' AND birth::date <= '${dateFormatted}'`;

            if (data.race) {
                filterQuery += ` AND race = '${data.race}'`;
            }

            if (data.relation) {
                filterQuery += ` AND relation = '${data.relation}'`;
            }

            if (data.type) {
                filterQuery += ` AND type = '${data.type}'`;
            }

            if (data.startDate) {
                filterQuery += ` AND created_at::date >= '${data.startDate}'`;
            }

            if (data.endDate) {
                filterQuery += ` AND created_at::date <= '${data.endDate}'`;
            }

            filterQuery += ')';
        }

        if (!data.age && data.race) {
            if (!data.region_id) {
                filterQuery += 'WHERE ';
            }

            if (data.region_id) {
                filterQuery += ' AND ';
            }

            filterQuery += `(race = '${data.race}'`;

            if (data.relation) {
                filterQuery += ` AND relation = '${data.relation}'`;
            }

            if (data.type) {
                filterQuery += ` AND type = '${data.type}'`;
            }

            if (data.startDate) {
                filterQuery += ` AND created_at::date >= '${data.startDate}'`;
            }

            if (data.endDate) {
                filterQuery += ` AND created_at::date <= '${data.endDate}'`;
            }

            filterQuery += ')';
        }

        if (!data.age && !data.race && data.relation) {
            if (!data.region_id) {
                filterQuery += 'WHERE ';
            }

            if (data.region_id) {
                filterQuery += ' AND ';
            }

            filterQuery += `(relation = '${data.relation}'`;

            if (data.type) {
                filterQuery += ` AND type = '${data.type}'`;
            }

            if (data.startDate) {
                filterQuery += ` AND created_at::date >= '${data.startDate}'`;
            }

            if (data.endDate) {
                filterQuery += ` AND created_at::date <= '${data.endDate}'`;
            }

            filterQuery += ')';
        }

        if (!data.age && !data.race && !data.relation && data.type) {
            if (!data.region_id) {
                filterQuery += 'WHERE ';
            }

            if (data.region_id) {
                filterQuery += ' AND ';
            }

            filterQuery += `(type = '${data.type}'`;

            if (data.startDate) {
                filterQuery += ` AND created_at::date >= '${data.startDate}'`;
            }

            if (data.endDate) {
                filterQuery += ` AND created_at::date <= '${data.endDate}'`;
            }

            filterQuery += ')';
        }

        if (
            !data.age &&
            !data.race &&
            !data.relation &&
            !data.type &&
            data.startDate
        ) {
            if (!data.region_id) {
                filterQuery += 'WHERE ';
            }

            if (data.region_id) {
                filterQuery += ' AND ';
            }

            filterQuery += `(created_at::date >= '${data.startDate}'`;

            if (data.endDate) {
                filterQuery += ` AND created_at::date <= '${data.endDate}'`;
            }

            filterQuery += ')';
        }

        if (
            !data.age &&
            !data.race &&
            !data.relation &&
            !data.type &&
            !data.startDate &&
            data.endDate
        ) {
            if (!data.region_id) {
                filterQuery += 'WHERE ';
            }

            if (data.region_id) {
                filterQuery += ' AND ';
            }

            filterQuery += `(created_at::date <= '${data.endDate}'`;
        }

        query += `SELECT count(*) FROM complaints ${filterQuery}`;

        console.log(query);

        const total = await this.reportsRepository.findTotalNumberSpecificComplaints(
            query,
        );
        return total;
    }
}

export default FindTotalNumberSpecificComplaints;
