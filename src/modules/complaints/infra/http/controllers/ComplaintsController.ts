import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateComplaintsService from '@modules/complaints/services/CreateComplaintsService';
import UpdateComplaintService from '@modules/complaints/services/UpdateComplaintService';

export default class ComplaintController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const data = request.body;

        const createComplaint = container.resolve(CreateComplaintsService);

        const complaint = await createComplaint.execute({
            victim: data.victim,
            cpf: data.cpf,
            phone: data.phone,
            cep: data.cep,
            address: data.address,
            number: data.number,
            complement: data.complement,
            uf: data.uf,
            city: data.city,
            subject: data.subject,
            attacker: data.attacker,
            identification: data.identification,
            report: data.report,
        });

        return response.json(complaint);
    }

    public async update(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const data = request.body;

        const updateComplaint = container.resolve(UpdateComplaintService);

        const complaint = await updateComplaint.execute({
            id: data.id,
            phone: data.phone,
            cep: data.cep,
            address: data.address,
            number: data.number,
            complement: data.complement,
            uf: data.uf,
            city: data.city,
            subject: data.subject,
            attacker: data.attacker,
            identification: data.identification,
            report: data.report,
            note: data.note,
            status: data.status,
        });

        return response.json(complaint);
    }
}
