const express = require('express');

const routerUser = require('./routes/usersRoutes.routes');
const controllerRepair = require('./routes/repairRoutes.routes');

const app = express();

app.use(express.json());

app.use('/api/v1/users', routerUser);

app.use('/api/v1/repairs', controllerRepair);

module.exports = app;
