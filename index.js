try {

    /* Let's set up the environment */
    const configResults = require('dotenv').config();
    const env = require('./src/env');

    /* Error management for .ENV */
    if (configResults.error) {
        throw configResults.error;
    }

    /* Get DarkSky as a weather provider on board */
    const DarkSky = require('dark-sky');
    const darksky = new DarkSky(process.env.DARK_SKY_API_KEY);

    /* Calculate the request interval, we don't have to be 100% precise, always err on the side of caution */
    const requestInterval = Math.ceil((24 * 60 * 60 * 1000) / env('CALLS_PER_DAY', 1000));

    /* Let's setup the WebThings, based on the Mozilla docs */
    const {
        Action,
        Event,
        Property,
        SingleThing,
        Thing,
        Value,
        WebThingServer,
        MultipleThings
    } = require('webthing');
    //const uuidv4 = require('uuid/v4');

    class DSTemperature extends Thing {
        constructor() {
            super('Dark Sky Temperature', ['MultiLevelSensor'], 'A Multi level sensor based on the Dark Sky API');
            this.level = new Value(0.0);
            this.createProperties();
            this.createSensorPolling();
        }

        createProperties() {
            this.addProperty(new Property(
                this,
                'level',
                this.level, {
                    '@type': 'LevelProperty',
                    label: 'Temperature',
                    type: 'number',
                    description: 'The current temperature in °C',
                    minimum: -100,
                    maximum: 100,
                    unit: '°C',
                }
            ));
        }

        createSensorPolling() {
            setInterval(() => {
                const newLevel = DSResultCollector.currently.temperature;
                this.level.notifyOfExternalUpdate(newLevel);
            }, 3000);
        }
    }


    class DSWindSpeed extends Thing {
        constructor() {
            super('Dark Sky Wind Speed', ['MultiLevelSensor'], 'A Multi level sensor based on the Dark Sky API');
            this.level = new Value(0.0);
            this.createProperties();
            this.createSensorPolling();
        }

        createProperties() {
            this.addProperty(new Property(
                this,
                'level',
                this.level, {
                    '@type': 'LevelProperty',
                    label: 'Temperature',
                    type: 'number',
                    description: 'The current wind speed in Km/h',
                    minimum: 0,
                    maximum: 100,
                    unit: 'Km/h',
                }
            ));
        }

        createSensorPolling() {
            setInterval(() => {
                const newLevel = DSResultCollector.currently.windSpeed;
                this.level.notifyOfExternalUpdate(newLevel);
            }, 3000);
        }
    }

    let DSResultCollector = {};

    let DarkSkyRequest = () => {
        darksky
            .latitude(process.env.LAT) // required: latitude, string || float.
            .longitude(process.env.LONG) // required: longitude, string || float.  
            .units(env('UNTI_TYPE', 'auto'))
            .language(env('LANGUAGE', 'en')) // optional: language, string, refer to API documentation.
            .exclude('hourly,minutely,daily') // optional: exclude, string || array, refer to API documentation.
            .extendHourly(true) // optional: extend, boolean, refer to API documentation.
            .get() // execute your get request.
            .then((response) => {
                DSResultCollector = response;
            })
            .catch(console.log); // handle your error response.
    };

    function runServer() {
        // Create a thing that represents a dimmable light
        const temp = new DSTemperature();

        // Create a thing that represents a humidity sensor
        const wind = new DSWindSpeed();

        // If adding more than one thing, use MultipleThings() with a name.
        // In the single thing case, the thing's name will be broadcast.
        const server = new WebThingServer(new MultipleThings([temp, wind],
            'DarkSkyWeatherStation'),
        8888);

        DarkSkyRequest();

        setInterval(() => {
            DarkSkyRequest();
        }, requestInterval);

        process.on('SIGINT', () => {
            server.stop();
            process.exit();
        });

        server.start();
    }


    runServer();
} catch (error) {
    console.log(error);
}