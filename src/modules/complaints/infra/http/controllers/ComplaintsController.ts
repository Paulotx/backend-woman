import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateComplaintService from '@modules/complaints/services/CreateComplaintService';
import UpdateComplaintService from '@modules/complaints/services/UpdateComplaintService';
import ListComplaintsService from '@modules/complaints/services/ListComplaintsService';

export default class ComplaintController {
    public async index(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { id, victim, cpf, region_id } = request.query;
        const { regions } = request;

        let params = {};

        if (id) {
            params = {
                ...params,
                id,
            };
        }

        if (victim) {
            params = {
                ...params,
                victim,
            };
        }

        if (cpf) {
            params = {
                ...params,
                cpf,
            };
        }

        if (region_id || regions) {
            params = {
                ...params,
                region_id: region_id || regions,
            };
        }

        console.log(params);

        const listComplaints = container.resolve(ListComplaintsService);

        const complaints = await listComplaints.execute(params);

        return response.json(complaints);
    }

    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const data = request.body;

        const createComplaint = container.resolve(CreateComplaintService);

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
            region_id: data.region_id,
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
