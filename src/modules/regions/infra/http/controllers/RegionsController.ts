import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateRegionService from '@modules/regions/services/CreateRegionService';
import ListRegionsService from '@modules/regions/services/ListRegionsService';
import ShowRegionService from '@modules/regions/services/ShowRegionService';
import UpdateRegionService from '@modules/regions/services/UpdateRegionService';
import DeleteRegionService from '@modules/regions/services/DeleteRegionService';

export default class RegionsController {
    public async index(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { page } = request.query;
        const listRegions = container.resolve(ListRegionsService);

        if (page) {
            const regions = await listRegions.execute(Number(page));
            return response.json(regions);
        }

        const regions = await listRegions.execute(0);
        return response.json(regions);
    }

    public async show(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const showRegions = container.resolve(ShowRegionService);

        const region = await showRegions.execute({ id });

        return response.json(region);
    }

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

    public async update(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { id } = request.params;
        const { name, uf, city, responsible } = request.body;

        const updateRegion = container.resolve(UpdateRegionService);

        const region = await updateRegion.execute({
            id,
            name,
            uf,
            city,
            responsible,
        });

        return response.json(region);
    }

    public async delete(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { id } = request.params;

        const deleteRegion = container.resolve(DeleteRegionService);

        await deleteRegion.execute({ id });

        return response.status(204).json();
    }
}
