import { Router } from 'express';
import complaintsRouter from './complaints.routes';

const routes = Router();

routes.use('/complaints', complaintsRouter);

export default routes;
