import { injectable, inject } from 'tsyringe';
import ExcelJS from 'exceljs';

import IReportsRepository from '../repositories/IReportsRepository';
import calculateAgeDate from '../utils/calculateAgeDate';

interface IRequest {
    region_id?: string | Array<string>;
    age?: number;
    race?: string;
    gender?: string;
    relation?: string;
    type?: string;
    startDate?: string;
    endDate?: string;
}

interface IResponse {
    total: number;
    download_link: string;
}

@injectable()
class FindTotalNumberSpecificComplaints {
    constructor(
        @inject('ReportsRepository')
        private reportsRepository: IReportsRepository,
    ) {}

    public async execute(data: IRequest): Promise<IResponse> {
        let query = '';
        let queryCreateExcelReport = '';
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

            if (data.gender) {
                filterQuery += ` AND gender = '${data.gender}'`;
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

            if (data.gender) {
                filterQuery += ` AND gender = '${data.gender}'`;
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

        if (!data.age && !data.race && data.relation) {
            if (!data.region_id) {
                filterQuery += 'WHERE ';
            }

            if (data.region_id) {
                filterQuery += ' AND ';
            }

            filterQuery += `(relation = '${data.relation}'`;

            if (data.gender) {
                filterQuery += ` AND gender = '${data.gender}'`;
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

        if (!data.age && !data.race && !data.relation && data.type) {
            if (!data.region_id) {
                filterQuery += 'WHERE ';
            }

            if (data.region_id) {
                filterQuery += ' AND ';
            }

            filterQuery += `(type = '${data.type}'`;

            if (data.gender) {
                filterQuery += ` AND gender = '${data.gender}'`;
            }

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

            if (data.gender) {
                filterQuery += ` AND gender = '${data.gender}'`;
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

            if (data.gender) {
                filterQuery += ` AND gender = '${data.gender}'`;
            }

            filterQuery += ')';
        }

        if (
            !data.age &&
            !data.race &&
            !data.relation &&
            !data.type &&
            !data.startDate &&
            !data.endDate &&
            data.gender
        ) {
            if (!data.region_id) {
                filterQuery += 'WHERE ';
            }

            if (data.region_id) {
                filterQuery += ' AND ';
            }

            filterQuery += `(gender = '${data.gender}')`;
        }

        query += `SELECT count(*) FROM complaints ${filterQuery}`;
        queryCreateExcelReport += `SELECT complaints.*, regions.name AS region_name FROM complaints LEFT JOIN regions ON (complaints.region_id = regions.id) ${filterQuery} ORDER BY complaints.id`;

        const total = await this.reportsRepository.findTotalNumberSpecificComplaints(
            query,
        );

        const complaints = await this.reportsRepository.findComplaints(
            queryCreateExcelReport,
        );

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Relatótio');

        worksheet.columns = [
            { header: 'ID', key: 'id', width: 10 },
            { header: 'Região', key: 'region_name', width: 20 },
            { header: 'Vítima', key: 'victim', width: 32 },
            { header: 'Data de Nascimento', key: 'birth', width: 15 },
            { header: 'Telefone', key: 'phone', width: 15 },
            { header: 'Raça', key: 'race', width: 20 },
            { header: 'Transgênero', key: 'gender', width: 15 },
            { header: 'CEP', key: 'cep', width: 15 },
            { header: 'Endereço', key: 'address', width: 20 },
            { header: 'Numero', key: 'number', width: 10 },
            { header: 'Complemento', key: 'complement', width: 20 },
            { header: 'Bairro', key: 'neighborhood', width: 20 },
            { header: 'UF', key: 'uf', width: 10 },
            { header: 'Agressor', key: 'attacker', width: 32 },
            {
                header: 'Identificação do agressor',
                key: 'identification',
                width: 15,
            },
            { header: 'Sexo do Agressor', key: 'attacker_sex', width: 15 },
            { header: 'Parentesco', key: 'relation', width: 15 },
            { header: 'Tipo da agressão', key: 'type', width: 15 },
            { header: 'Assunto do retorno', key: 'subject', width: 15 },
            { header: 'Relato da agressão', key: 'report', width: 15 },
            { header: 'Status', key: 'status', width: 12 },
        ] as ExcelJS.Column[];

        complaints.forEach(complaint => {
            worksheet.addRow(complaint);
        });

        worksheet.getRow(1).eachCell(cell => {
            cell.font = { bold: true };
        });

        const reportName = `relatório-${Date.now()}`;

        workbook.xlsx.writeFile(`tmp/${reportName}.xlsx`);

        return {
            total,
            download_link: reportName,
        };
    }
}

export default FindTotalNumberSpecificComplaints;
