import { Request, Response } from 'express';
import { container } from 'tsyringe';

import FindTotalNumberSpecificComplaints from '@modules/reports/services/FindTotalNumberSpecificComplaints';

export default class ReportsSpecificController {
    public async index(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const findTotal = container.resolve(FindTotalNumberSpecificComplaints);

        const {
            region_id,
            age,
            race,
            gender,
            relation,
            type,
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

        if (gender) {
            params = {
                ...params,
                gender,
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
