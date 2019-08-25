import React from 'react';
import WeatherLocation from './WeatherLocation';

const LocationList = () => (
    <div>
        <WeatherLocation city = "Buenos Aires, ar" />
        <WeatherLocation city = "Bogota, col" />
        <WeatherLocation city = "Mexico, mx" />
    </div>
);

export default LocationList;