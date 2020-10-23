import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateRegionService from '@modules/regions/services/CreateRegionService';

export default class RegionsController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { name, city, uf, responsible } = request.body;

        const createRegion = container.resolve(CreateRegionService);

        const region = await createRegion.execute({
            name,
            city,
            uf,
            responsible,
        });

        return response.status(201).json(region);
    }
}
