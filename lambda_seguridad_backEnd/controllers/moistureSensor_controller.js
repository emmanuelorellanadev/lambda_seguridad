// MOISTURE SENSOR CONTROLLER
// Handles incoming soil moisture readings from the ESP8266.
// POST /moisture-sensor/reading  → save reading, respond with sprinkler signal
// GET  /moisture-sensor/readings → paginated list (JWT-protected, admin dashboard)
// GET  /moisture-sensor/status/:sensor_id → latest reading for a given sensor

const { Op } = require('sequelize');

const { resSuccessful } = require('../response/resSucessful');
const { GeneralError, DBError } = require('../errors_handler/errors');
const catchedAsync = require('../errors_handler/catchedAsync');
const { MoistureSensorReading, MOISTURE_THRESHOLD } = require('../models/moistureSensor_model');
const { paginate } = require('../helpers/paginate');

// POST /moisture-sensor/reading
// Called by the ESP8266 after reading the soil moisture sensor.
// Body: { sensor_id: "sensor_01", moisture_value: 42.5 }
// Response: { activate_sprinkler: false, moisture_value: 42.5, threshold: 30 }
const postReading = async (req, res) => {
    const { sensor_id, moisture_value } = req.body;

    if (sensor_id === undefined || sensor_id === null || String(sensor_id).trim() === '') {
        throw new GeneralError('El campo sensor_id es requerido.');
    }

    const parsedValue = parseFloat(moisture_value);
    if (isNaN(parsedValue) || parsedValue < 0 || parsedValue > 100) {
        throw new GeneralError('El valor de humedad debe ser un número entre 0 y 100.');
    }

    const activate_sprinkler = parsedValue < MOISTURE_THRESHOLD;

    await MoistureSensorReading.create({
        sensor_id: String(sensor_id).trim(),
        moisture_value: parsedValue,
        activate_sprinkler,
    }).catch(error => {
        throw new DBError(error, 'Error al guardar la lectura del sensor de humedad.');
    });

    resSuccessful(res, {
        activate_sprinkler,
        moisture_value: parsedValue,
        threshold: MOISTURE_THRESHOLD,
    }, 201);
};

// GET /moisture-sensor/readings?page=1&limit=20&sensor_id=sensor_01
// Returns a paginated list of all stored readings.
const getReadings = async (req, res) => {
    const { page, limit, sensor_id } = req.query;

    let search = {};
    if (sensor_id) {
        search = {
            where: { sensor_id: { [Op.like]: `%${sensor_id}%` } },
        };
    }

    const readings = await paginate(MoistureSensorReading, page, limit, search);
    resSuccessful(res, readings);
};

// GET /moisture-sensor/status/:sensor_id
// Returns the most recent reading for the given sensor.
const getLatestStatus = async (req, res) => {
    const { sensor_id } = req.params;

    const latest = await MoistureSensorReading.findOne({
        where: { sensor_id },
        order: [['reading_at', 'DESC']],
    });

    if (!latest) throw new GeneralError(`No se encontraron lecturas para el sensor '${sensor_id}'.`);

    resSuccessful(res, { ...latest.toJSON(), threshold: MOISTURE_THRESHOLD });
};

module.exports = {
    postReading: catchedAsync(postReading),
    getReadings: catchedAsync(getReadings),
    getLatestStatus: catchedAsync(getLatestStatus),
};
