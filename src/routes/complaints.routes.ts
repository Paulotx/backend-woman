import { Router } from 'express';
import { getCustomRepository } from 'typeorm';

import ComplaintsRepository from '../repositories/ComplaintsRepository';
import CreateComplaintsService from '../services/CreateComplaintsService';

const complaintsRouter = Router();

complaintsRouter.get('/', async (request, response) => {
    const complaintsRepository = getCustomRepository(ComplaintsRepository);
    const complaints = await complaintsRepository.find();

    return response.json(complaints);
});

complaintsRouter.post('/', async (request, response) => {
    try {
        const {
            victim,
            cpf,
            phone,
            cep,
            address,
            number,
            complement,
            uf,
            city,
            subject,
            attacker,
            identification,
            report,
        } = request.body;

        const createComplaint = new CreateComplaintsService();

        const complaint = await createComplaint.execute({
            victim,
            cpf,
            phone,
            cep,
            address,
            number,
            complement,
            uf,
            city,
            subject,
            attacker,
            identification,
            report,
        });

        return response.json(complaint);
    } catch (err) {
        return response.status(400).json({ message: err.message });
    }
});

export default complaintsRouter;
