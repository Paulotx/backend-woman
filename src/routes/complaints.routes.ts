import { Router } from 'express';

import ComplaintsRepository from '../repositories/ComplaintsRepository';
import CreateComplaintsService from '../services/CreateComplaintsService';

const complaintsRouter = Router();

const complaintsRepository = new ComplaintsRepository();

complaintsRouter.get('/', (request, response) => {
    const complaints = complaintsRepository.all();

    return response.json(complaints);
});

complaintsRouter.post('/', (request, response) => {
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

        const createComplaint = new CreateComplaintsService(
            complaintsRepository,
        );

        const complaint = createComplaint.execute({
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
