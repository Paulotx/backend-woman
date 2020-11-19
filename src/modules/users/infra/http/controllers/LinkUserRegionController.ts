import { Request, Response } from 'express';
import { container } from 'tsyringe';

import LinkUserRegionService from '@modules/users/services/LinkUserRegionService';
import ShowLinkUserRegionService from '@modules/users/services/ShowLinkUserRegionService';
import DeleteLinkUserRegionService from '@modules/users/services/DeleteLinkUserRegionService';

export default class LinkUserRegionController {
    public async index(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { id } = request.params;

        const listLinkUserRegion = container.resolve(ShowLinkUserRegionService);

        const link = await listLinkUserRegion.execute({
            user_id: id,
        });

        return response.json(link);
    }

    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { user, region } = request.body;

        const createLinkUserRegion = container.resolve(LinkUserRegionService);

        const linkUserRegion = await createLinkUserRegion.execute({
            user_id: user,
            region_id: region,
        });

        return response.json(linkUserRegion);
    }

    public async delete(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { user_id, region_id } = request.params;

        const deleteLinkUserRegion = container.resolve(
            DeleteLinkUserRegionService,
        );

        await deleteLinkUserRegion.execute({ user_id, region_id });

        return response.status(204).json();
    }
}
