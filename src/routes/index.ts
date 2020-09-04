import { Router } from 'express';

import complaintsRouter from './complaints.routes';
import usersRouter from './users.routes';

const routes = Router();

routes.use('/complaints', complaintsRouter);
routes.use('/users', usersRouter);

export default routes;
