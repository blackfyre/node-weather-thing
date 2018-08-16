'use strict';

const units = {
    ca: {
        summary: '',
        nearestStormDistance: 'km',
        precipIntensity: 'mm/h',
        precipIntensityMax: 'mm/h',
        precipAccumulation: 'cm',
        temperature: '°C',
        temperatureMin: '°C',
        temperatureMax: '°C',
        apparentTemperature: '°C',
        dewPoint: '°C',
        windSpeed: 'km/h',
        windGust: 'km/h',
        pressure: 'hPa',
        visibility: 'km'
    },
    uk2: {
        summary: '',
        nearestStormDistance: 'mi',
        precipIntensity: 'mm/h',
        precipIntensityMax: 'mm/h',
        precipAccumulation: 'cm',
        temperature: '°C',
        temperatureMin: '°C',
        temperatureMax: '°C',
        apparentTemperature: '°C',
        dewPoint: '°C',
        windSpeed: 'mi/h',
        windGust: 'mi/h',
        pressure: 'hPa',
        visibility: 'mi'
    },
    us: {
        summary: '',
        nearestStormDistance: 'mi',
        precipIntensity: 'in/h',
        precipIntensityMax: 'in/h',
        precipAccumulation: 'cm',
        temperature: '°F',
        temperatureMin: '°F',
        temperatureMax: '°F',
        apparentTemperature: '°F',
        dewPoint: '°F',
        windSpeed: 'mi/h',
        windGust: 'mi/h',
        pressure: 'mb',
        visibility: 'mi'
    },
    si: {
        summary: '',
        nearestStormDistance: 'km',
        precipIntensity: 'mm/h',
        precipIntensityMax: 'mm/h',
        precipAccumulation: 'cm',
        temperature: '°C',
        temperatureMin: '°C',
        temperatureMax: '°C',
        apparentTemperature: '°C',
        dewPoint: '°C',
        windSpeed: 'm/s',
        windGust: 'm/s',
        pressure: 'hPa',
        visibility: 'km'
    }
};

exports.units = units;