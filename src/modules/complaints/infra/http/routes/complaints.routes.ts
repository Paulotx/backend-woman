import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticate from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import onlyDelegateAndAdmin from '@modules/users/infra/http/middlewares/onlyDelegateAndAdmin';

import ComplaintsController from '../controllers/ComplaintsController';

const complaintsRouter = Router();
const complaintsController = new ComplaintsController();

complaintsRouter.use(ensureAuthenticate);

complaintsRouter.get('/', onlyDelegateAndAdmin, complaintsController.index);
complaintsRouter.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            type: Joi.string().required(),
            victim: Joi.string().required(),
            cpf: Joi.string().required(),
            birth: Joi.date().required(),
            race: Joi.string().required(),
            phone: Joi.string().required(),
            cep: Joi.string().required(),
            address: Joi.string().required(),
            number: Joi.number().required(),
            complement: Joi.string().optional(),
            uf: Joi.string().required().min(2).max(2),
            city: Joi.string().required(),
            subject: Joi.string().required(),
            attacker: Joi.string().required(),
            identification: Joi.string().optional(),
            relation: Joi.string().required(),
            report: Joi.string().required(),
            region_id: Joi.string().required(),
        },
    }),
    complaintsController.create,
);
complaintsRouter.put(
    '/',
    onlyDelegateAndAdmin,
    celebrate({
        [Segments.BODY]: {
            id: Joi.number().required(),
            victim: Joi.string().required(),
            cpf: Joi.string().required(),
            phone: Joi.string().required(),
            cep: Joi.string().required(),
            address: Joi.string().required(),
            number: Joi.number().required(),
            complement: Joi.string().optional(),
            uf: Joi.string().required().min(2).max(2),
            city: Joi.string().required(),
            subject: Joi.string().required(),
            attacker: Joi.string().required(),
            identification: Joi.string().optional().allow(''),
            report: Joi.string().required(),
            note: Joi.string().optional(),
            status: Joi.string().optional(),
        },
    }),
    complaintsController.update,
);

export default complaintsRouter;
