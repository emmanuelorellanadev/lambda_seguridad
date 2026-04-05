// MOISTURE SENSOR ROUTE
// POST /moisture-sensor/reading  – public endpoint for the ESP8266 device
// GET  /moisture-sensor/readings – JWT-protected list of readings (admin dashboard)
// GET  /moisture-sensor/status/:sensor_id – JWT-protected latest status per sensor

const { Router } = require('express');
const { check } = require('express-validator');

const { moistureSensorController } = require('../controllers');
const { checkJWT, requiredRole, checkFields } = require('../middlewares');

const route = Router();

// Public endpoint: the ESP8266 POSTs its soil moisture reading here.
// No JWT required because the device does not hold user credentials.
route.post(
    '/reading',
    [
        check('sensor_id', 'El identificador del sensor es requerido.').not().isEmpty(),
        check('moisture_value', 'El valor de humedad es requerido.').not().isEmpty(),
        check('moisture_value', 'El valor de humedad debe ser un número.').isNumeric(),
        checkFields,
    ],
    moistureSensorController.postReading
);

// Protected endpoints: only accessible from the admin dashboard.
route.get(
    '/readings',
    [checkJWT, requiredRole('ROLE_ADMINSYS'), checkFields],
    moistureSensorController.getReadings
);

route.get(
    '/status/:sensor_id',
    [checkJWT, requiredRole('ROLE_ADMINSYS'), checkFields],
    moistureSensorController.getLatestStatus
);

module.exports = route;
