'use strict';

let Adapter;
try {
    Adapter = require('../adapter');
} catch (e) {
    if (e.code !== 'MODULE_NOT_FOUND') {
        throw e;
    }

    const gwa = require('gateway-addon');
    Adapter = gwa.Adapter;
}

import WeatherStation from './WeatherStation';

/**
 * Adapter class
 */
class DarkSkyAdatper extends Adapter {
    /**
     *
     * @param {*} addonManager
     * @param {*} packageName
     * @param {*} config
     */
    constructor(addonManager, packageName, config) {
        super(addonManager, 'DarkSkyWeatherStation', packageName);
        addonManager.addAdapter(this);
        this.adapter = new WeatherStation(config);
    }
}

module.exports = (addonManager, manifest) => {
    const adapter = new DarkSkyAdatper(addonManager, manifest.name, manifest.moziot.config);
};