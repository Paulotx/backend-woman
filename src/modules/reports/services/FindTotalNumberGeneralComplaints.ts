import { format } from 'date-fns';
import { injectable, inject } from 'tsyringe';
import IFindTotalNumberGeneralComplaints from '../dtos/findTotalNumberGeneralComplaintsDTO';

import IReportsRepository from '../repositories/IReportsRepository';

interface IRequest {
    region_id?: string | Array<string>;
    age?: boolean;
    race?: boolean;
    gender?: boolean;
    relation?: boolean;
    type?: boolean;
    startDate?: string;
    endDate?: string;
}

@injectable()
class FindTotalNumberGeneralComplaints {
    constructor(
        @inject('ReportsRepository')
        private reportsRepository: IReportsRepository,
    ) {}

    public async execute(
        data: IRequest,
    ): Promise<IFindTotalNumberGeneralComplaints[]> {
        let query = '';
        let variable = '';
        let filterQuery = '';

        if (data.region_id) {
            if (
                data.region_id.length === 1 ||
                typeof data.region_id === 'string'
            ) {
                filterQuery += ` WHERE(region_id = '${data.region_id}')`;
            } else if (typeof data.region_id === 'object') {
                filterQuery += ' WHERE(';

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

        if (data.race) {
            variable = 'race';
        }

        if (data.gender) {
            variable = 'gender';
        }

        if (data.relation) {
            variable = 'relation';
        }

        if (data.type) {
            variable = 'type';
        }

        if (data.startDate) {
            if (!data.region_id) {
                filterQuery += ' WHERE ';
            }
            if (data.region_id) {
                filterQuery += ' AND ';
            }
            filterQuery += `created_at::date >= '${data.startDate}'`;
        }

        if (data.endDate) {
            if (!data.region_id && !data.startDate) {
                filterQuery += ' WHERE ';
            }
            if (data.region_id || data.startDate) {
                filterQuery += ' AND ';
            }
            filterQuery += `created_at::date <= '${data.endDate}'`;
        }

        if (data.age) {
            let date = new Date();
            const year = date.getUTCFullYear();
            const month = date.getUTCMonth();
            const day = date.getUTCDate();

            date = new Date(`${year}-${month + 1}-${day} 00:00:00`);

            const dateFormatted = format(date, 'yyyy-MM-dd');

            query = `SELECT extract(year FROM age('${dateFormatted}', complaints.birth)) AS key, count(extract(year from age('${dateFormatted}', complaints.birth))) FROM complaints${filterQuery} GROUP BY key HAVING count(extract(year from age('${dateFormatted}', complaints.birth))) >= 1 ORDER BY extract(year from age('${dateFormatted}', complaints.birth)) ASC`;

            const total = await this.reportsRepository.findTotalNumberGeneralComplaints(
                query,
            );

            return total;
        }

        query += `SELECT ${variable} AS key, count(${variable}) FROM complaints${filterQuery} GROUP BY key HAVING count(${variable}) >= 1 ORDER BY count(${variable}) DESC`;

        const total = await this.reportsRepository.findTotalNumberGeneralComplaints(
            query,
        );

        return total;
    }
}

export default FindTotalNumberGeneralComplaints;
