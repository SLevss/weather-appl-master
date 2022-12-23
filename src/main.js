import { DataForm } from "./ui/DataForm.js";
import { TemperaturesList } from "./ui/TemperaturesList.js";
import { WeatherDataProcessor } from "./data/WeatherDataProcessor.js";

const weatherProcessor = new WeatherDataProcessor();

const params = {
    idForm: "data_form", idDateFrom: "date_from", idDateTo: "date_to",
    idHourFrom: "hour_from", idHourTo: "hour_to", idErrorMessage: "error_message",
    sitySelector: 'select[name="city"]',
    minMaxDates: getMinMaxDates(weatherProcessor.getPeriodInDays()),
    cities: weatherProcessor.getCities()
};
const dataForm = new DataForm(params);
const temperatureList = new TemperaturesList("items-list", "city");
function getMinMaxDates(periodInDays) {
    const date = new Date();
    const beginningDay = date.toISOString().substring(0, 10);
    const day = date.getDate();
    date.setDate(day + periodInDays);
    const finishDay = date.toISOString().substring(0, 10);
    return { minDate: beginningDay, maxDate: finishDay };
}

dataForm.addSubmitHandler( (dataFF) => {
    const promiseData = weatherProcessor.getData(dataFF);
    promiseData.then( data => temperatureList.showResult(data));
})

