import { Request, Response } from 'express';
import { container } from 'tsyringe';

import LinkUserRegionService from '@modules/users/services/LinkUserRegionService';

export default class LinkUserRegionController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { user_id, region_id } = request.body;

        const createLinkUserRegion = container.resolve(LinkUserRegionService);

        await createLinkUserRegion.execute({
            user_id,
            region_id,
        });

        return response.status(204).json();
    }
}
