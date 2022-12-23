import { DataForm } from "./ui/DataForm.js";
import { TemperaturesList } from "./ui/TemperaturesList.js";
import { WeatherDataProcessor } from "./data/WeatherDataProcessor.js";

const weatherProcessor = new WeatherDataProcessor();
const params = {idForm: "form-request", idCity: "city", idDateFrom: "date_from",
idDateTo: "date_to", idHourFrom: "hour_from", idHourTo: "hour_to", idErrorMessage: 'error_msg'};
const dataForm = new DataForm(params);
const resultsList = new TemperaturesList("weather-list");

dataForm.addSubmitHandler((dataFromForm) => {
    weatherProcessor.getData(dataFromForm, (data) => {
        resultsList.showResults(data);
    });
})





