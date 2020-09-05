import { Router } from 'express';
import { getCustomRepository } from 'typeorm';

import ComplaintsRepository from '../repositories/ComplaintsRepository';
import CreateComplaintsService from '../services/CreateComplaintsService';
import UpdateComplaintService from '../services/UpdateComplaintService';

import ensureAuthenticate from '../middlewares/ensureAuthenticated';
import onlyDelegateAndAdmin from '../middlewares/onlyDelegateAndAdmin';

const complaintsRouter = Router();

complaintsRouter.get('/', onlyDelegateAndAdmin, async (request, response) => {
    const complaintsRepository = getCustomRepository(ComplaintsRepository);
    const complaints = await complaintsRepository.find();

    return response.json(complaints);
});

complaintsRouter.post('/', ensureAuthenticate, async (request, response) => {
    try {
        const data = request.body;

        const createComplaint = new CreateComplaintsService();

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
    } catch (err) {
        return response.status(400).json({ message: err.message });
    }
});

complaintsRouter.put('/', onlyDelegateAndAdmin, async (request, response) => {
    try {
        const data = request.body;

        const updateComplaint = new UpdateComplaintService();

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
    } catch (err) {
        return response.status(400).json({ message: err.message });
    }
});

export default complaintsRouter;
