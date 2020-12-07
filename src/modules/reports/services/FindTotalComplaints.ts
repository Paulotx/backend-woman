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
class FindTotalComplaints {
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
                filterQuery += `(region_id = '${data.region_id}') AND `;
            } else if (typeof data.region_id === 'object') {
                filterQuery += '(';

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
            if (data.region_id) {
                filterQuery += ' AND ';
            }

            filterQuery += `(created_at::date <= '${data.endDate}'`;
        }

        query += `SELECT count(*) from complaints WHERE (${filterQuery})`;

        // Quantidade de denúncias no total
        // query += 'SELECT count(*) FROM complaints';

        // Quantidade de denúncias por Região
        // query +=
        //     "SELECT count(*) FROM complaints WHERE (region_id = '1e3067de-e8a7-440c-8ba6-0dc7d6cbd7c3' OR region_id = 'a1dc7896-ebab-43fe-8fe5-b6488b6e8ac4' OR region_id = 'f2c7e9ef-2442-4969-90d1-a01ecb8fa115')";

        // Quantidade de denúncias por raça no total
        // query += "SELECT count(*) FROM complaints WHERE race = 'Pardo'";

        // Quantidade de denúncias por raça por região
        // query +=
        //     "SELECT count(*) FROM complaints WHERE (region_id = '1e3067de-e8a7-440c-8ba6-0dc7d6cbd7c3') AND (race = 'Pardo')";

        // Quantidade de denúncias por grau de parentesco no total
        // query += "SELECT count(*) FROM complaints WHERE relation = 'Namorado'";

        // Quantidade de denúncias por parentesco por região
        // query +=
        //     "SELECT count(*) FROM complaints WHERE (region_id = '1e3067de-e8a7-440c-8ba6-0dc7d6cbd7c3') AND (relation = 'Marido')";

        // Quantidade de denúncias por grau de tipe de agressão no total
        // query += "SELECT count(*) FROM complaints WHERE type = 'Física'";

        // Quantidade de denúncias por tipo de agressão por região
        // query +=
        //     "SELECT count(*) FROM complaints WHERE (region_id = '1e3067de-e8a7-440c-8ba6-0dc7d6cbd7c3') AND (type = 'Física')";

        // Quantidade de denúncias por vítima no total
        // query += "SELECT count(*) FROM complaints WHERE cpf = '240.551.500-83'";

        // Quantidade de denúncias por vítima  por região
        // query +=
        //     "SELECT count(*) FROM complaints WHERE (region_id = '1e3067de-e8a7-440c-8ba6-0dc7d6cbd7c3') AND (cpf = '240.551.500-83')";

        // Quantidade de denúncias por tipo de agressão e por raça no total
        // query +=
        //     "SELECT count(*) FROM complaints WHERE (type = 'Física' AND race='Pardo')";

        // Quantidade de denúncias por tipo de agressão e por raça por região
        // query +=
        //     "SELECT count(*) FROM complaints WHERE (region_id = '1e3067de-e8a7-440c-8ba6-0dc7d6cbd7c3') AND (type = 'Física' AND race='Pardo')";

        // Quantidade de denúncias por tipo de agressão e por parentesco no total
        // query +=
        //     "SELECT count(*) FROM complaints WHERE (type = 'Física' AND relation='Namorado')";

        // Quantidade de denúncias por tipo de agressão e por parentesco por região
        // query +=
        //     "SELECT count(*) FROM complaints WHERE (region_id = '1e3067de-e8a7-440c-8ba6-0dc7d6cbd7c3') AND (type = 'Física' AND relation='Namorado')";

        // const age = 15;

        // const date = new Date('2020-12-06 23:00:00');

        // date.setFullYear(date.getFullYear() - age);

        // const dateFormatted = format(date, 'yyyy-MM-dd');

        // const startDate = new Date(`${date.getFullYear()}-01-01 00:00:00`);

        // const startDateFormatted = format(startDate, 'yyyy-MM-dd');

        // Quantidade de denúncias por idade no total
        // query += `SELECT count(*) FROM complaints WHERE birth::date >= '${startDateFormatted}' AND birth::date <= '${dateFormatted}'`;

        // // Quantidade de denúncias por idade por região
        // query += `SELECT count(*) FROM complaints WHERE (region_id = '1e3067de-e8a7-440c-8ba6-0dc7d6cbd7c3' OR region_id = 'a1dc7896-ebab-43fe-8fe5-b6488b6e8ac4') AND (birth::date >= '${startDateFormatted}' AND birth::date <= '${dateFormatted}')`;

        // Quantidade de denúncias por idade e por parentesco no total
        // query += `SELECT count(*) FROM complaints WHERE (birth::date >= '${startDateFormatted}' AND birth::date <= '${dateFormatted}') AND (relation = 'Namorado')`;

        // // Quantidade de denúncias por idade e por parentesco por região
        // query += `SELECT count(*) FROM complaints WHERE (region_id = '1e3067de-e8a7-440c-8ba6-0dc7d6cbd7c3') AND (birth::date >= '${startDateFormatted}' AND birth::date <= '${dateFormatted}') AND (relation = 'Namorado')`;

        // Quantidade de denúncias por idade e por raça no total
        // query += `SELECT count(*) FROM complaints WHERE (birth::date >= '${startDateFormatted}' AND birth::date <= '${dateFormatted}') AND (race = 'Pardo')`;

        // // Quantidade de denúncias por idade e por raça por região
        // query += `SELECT count(*) FROM complaints WHERE (region_id = '1e3067de-e8a7-440c-8ba6-0dc7d6cbd7c3' OR region_id = 'a1dc7896-ebab-43fe-8fe5-b6488b6e8ac4') AND (birth::date >= '${startDateFormatted}' AND birth::date <= '${dateFormatted}') AND (race = 'Pardo')`;

        const total = await this.reportsRepository.findTotalComplaints(query);
        return total;
    }
}

export default FindTotalComplaints;
