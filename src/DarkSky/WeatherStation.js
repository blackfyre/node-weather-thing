'use strict';

let Device, Property;
try {
    Device = require('../device');
    Property = require('../property');
} catch (e) {
    if (e.code !== 'MODULE_NOT_FOUND') {
        throw e;
    }

    const gwa = require('gateway-addon');
    Device = gwa.Device;
    Property = gwa.Property;
}

const units = require('./constants');
const DarkSky = require('dark-sky');

export default class WeatherStation extends Device {

}