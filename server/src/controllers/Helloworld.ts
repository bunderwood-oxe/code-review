import { lang } from 'moment';
import { logger } from '../services';

// respond from the city with a greeting
const helloWorldController = (req: any, res: any): any => {
    const city = req.body.city
    // use date passed in request body or default to current date.
    const date = req.body.date || new Date()

    const cityExists = knownCities.find(function(_city) {
        return _city.city == city;
    })

    let response = cityExists ? knownCities.find(function(_city) {
        return _city.city == city
    })?.hello : '...'

    let languageTag = cityExists ? knownCities.find(function(_city) {
        return _city.city == city
    })?.intl : '...'
    
    // log message for debug purposes
    logger.info(`got new request from, ${city} for ${new Date(date).toLocaleDateString()} in ${languageTag}`)

    res.status(200).send(response + ' from ' + city + '! ' + 'the date is ' + new Date(date).toLocaleDateString(languageTag));
};

export default helloWorldController;

const knownCities = [
    { city: "London", hello: "Hello", intl: 'en-GB'},
    { city: "Paris", hello: "Bonjour", intl: 'fr_FR'},
    { city: "New York", hello: "Hey", intl: 'en-US'},
    { city: "Moscow", hello: "Привет", intl: 'ru_RU'},
    { city: "Dubai", hello: "أهلا", intl: 'ar-eg'},
    { city: "Tokyo", hello: "こんにちは", intl: 'JP'},
];