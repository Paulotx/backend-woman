import { Router } from 'express';

import complaintsRouter from '@modules/complaints/infra/http/routes/complaints.routes';

import usersRouter from '@modules/users/infra/http/routes/users.routes';
import regionsRouter from '@modules/regions/infra/http/routes/regions.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';
import profileRouter from '@modules/users/infra/http/routes/profile.routes';
import reportsRouter from '@modules/reports/infra/http/routes/reports.routes';

const routes = Router();

routes.use('/complaints', complaintsRouter);

routes.use('/users', usersRouter);
routes.use('/regions', regionsRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);
routes.use('/profile', profileRouter);
routes.use('/reports', reportsRouter);

export default routes;
