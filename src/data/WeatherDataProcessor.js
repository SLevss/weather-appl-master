
export class WeatherDataProcessor {
    #cityGeocodes;
    constructor() {
        this.#cityGeocodes = [{ city: "Rehovot", latitude: 31.89277, longitude: 34.81127 },
        { city: "Haifa", latitude: 32.7940, longitude: 34.9896 },
        { city: "Tel-Aviv", latitude: 32.0853, longitude: 34.7818 },
        { city: "Eilat", latitude: 29.5577, longitude: 34.9519 },
        { city: "Jerusalem", latitude: 31.7683, longitude: 35.2137 }]

    }

    async getData(requestObject) {

        const url = this.getUrl(requestObject);
        const response = await fetch(url);
        return this.processData(await response.json(), requestObject);
    }
    getUrl(requestObject) {
        const baseUrl = "https://api.open-meteo.com/v1/gfs?";
        const baseParams = "&hourly=temperature_2m&timezone=IST&";

        const geocodes = this.#cityGeocodes.find(gc => gc.city == requestObject.city);

        const beginningDay = requestObject.dateFrom;
        const finishDay = requestObject.dateTo;

        const latitude = geocodes.latitude;
        const longitude = geocodes.longitude;

        const url = `${baseUrl}latitude=${latitude}&longitude=${longitude}${baseParams}&start_date=${beginningDay}&end_date=${finishDay}`

        console.log(url);

        return url;
    }

    processData(data, requestObject) {

        const times = data.hourly.time;
        const temperatures = data.hourly.temperature_2m;
        const indexFrom = getIndexOfDate(times, requestObject.dateFrom);
        const indexTo = getIndexOfDate(times, requestObject.dateTo) + 24;
        const timesDates = times.slice(indexFrom, indexTo);
        const timesDatesHours = timesDates.filter((time, index) => {
            index = index % 24;
            return index >= requestObject.hourFrom && index <= requestObject.hourTo;
        })
        const temperDates = temperatures.slice(indexFrom, indexTo);
        const temperDatesHours = temperDates.filter((time, index) => {
            index = index % 24;
            return index >= requestObject.hourFrom && index <= requestObject.hourTo;
        })
        const objects = timesDatesHours.map((dt, index) => {
            const dateTime = dt.split("T");
            return { date: dateTime[0], hour: dateTime[1], temperature: temperDatesHours[index] }
        })

        return { city: requestObject.city, objects }
    }
    getPeriodInDays() {
        return 17;
    }
    getCities() {
        return this.#cityGeocodes.map(currValue => {
            return currValue.city;
        })
    }
}
function getIndexOfDate(times, date) {
    return times.findIndex(t => t.includes(date));
}

