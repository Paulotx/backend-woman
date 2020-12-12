import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateComplaintService from '@modules/complaints/services/CreateComplaintService';
import UpdateComplaintService from '@modules/complaints/services/UpdateComplaintService';
import ListComplaintsService from '@modules/complaints/services/ListComplaintsService';
import ShowComplaintService from '@modules/complaints/services/ShowComplaintService';

export default class ComplaintController {
    public async index(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { id, victim, cpf, status, region_id, page = 1 } = request.query;
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

        if (status) {
            params = {
                ...params,
                status,
            };
        }

        if (region_id || regions) {
            params = {
                ...params,
                region_id: region_id || regions,
            };
        }

        const listComplaints = container.resolve(ListComplaintsService);

        const complaints = await listComplaints.execute(params, Number(page));

        return response.json(complaints);
    }

    public async show(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const showComplaint = container.resolve(ShowComplaintService);

        const complaint = await showComplaint.execute({ id: Number(id) });

        return response.json(complaint);
    }

    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const data = request.body;

        const createComplaint = container.resolve(CreateComplaintService);

        const complaint = await createComplaint.execute({
            type: data.type,
            victim: data.victim,
            cpf: data.cpf,
            birth: data.birth,
            race: data.race,
            gender: data.gender,
            phone: data.phone,
            cep: data.cep,
            address: data.address,
            number: data.number,
            complement: data.complement,
            neighborhood: data.neighborhood,
            uf: data.uf,
            city: data.city,
            subject: data.subject,
            attacker: data.attacker,
            identification: data.identification,
            attacker_sex: data.attacker_sex,
            relation: data.relation,
            report: data.report,
            region_id: data.region_id,
        });

        return response.status(201).json(complaint);
    }

    public async update(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const data = request.body;

        const updateComplaint = container.resolve(UpdateComplaintService);

        const complaint = await updateComplaint.execute({
            id: data.id,
            victim: data.victim,
            cpf: data.cpf,
            type: data.type,
            phone: data.phone,
            birth: data.brith,
            race: data.race,
            gender: data.gender,
            cep: data.cep,
            address: data.address,
            number: data.number,
            complement: data.complement,
            neighborhood: data.neighborhood,
            uf: data.uf,
            city: data.city,
            subject: data.subject,
            attacker: data.attacker,
            identification: data.identification,
            attacker_sex: data.attacker_sex,
            relation: data.relation,
            report: data.report,
            note: data.note,
            status: data.status,
            region_id: data.region_id,
        });

        return response.json(complaint);
    }
}
