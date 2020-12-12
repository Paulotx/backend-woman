import { Request, Response } from 'express';
import { container } from 'tsyringe';

import FindTotalNumberGeneralComplaints from '@modules/reports/services/FindTotalNumberGeneralComplaints';

export default class ReportsGeneralController {
    public async index(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const findTotal = container.resolve(FindTotalNumberGeneralComplaints);

        const {
            age,
            race,
            relation,
            type,
            region_id,
            startDate,
            endDate,
        } = request.query;

        let params = {};

        if (region_id) {
            params = {
                ...params,
                region_id,
            };
        }

        if (age) {
            params = {
                ...params,
                age,
            };
        }

        if (race) {
            params = {
                ...params,
                race,
            };
        }

        if (relation) {
            params = {
                ...params,
                relation,
            };
        }

        if (type) {
            params = {
                ...params,
                type,
            };
        }

        if (startDate) {
            params = {
                ...params,
                startDate,
            };
        }

        if (startDate) {
            params = {
                ...params,
                endDate,
            };
        }

        const total = await findTotal.execute(params);
        return response.json(total);
    }
}
