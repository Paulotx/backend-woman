import { Request, Response } from 'express';
import { container } from 'tsyringe';

import FindTotalComplaints from '@modules/reports/services/FindTotalComplaints';

export default class ReportsController {
    public async index(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const findTotal = container.resolve(FindTotalComplaints);

        const {
            region_id,
            age,
            race,
            relation,
            type,
            startDate,
            endDate,
        } = request.body;

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
