
//https://api.open-meteo.com/v1/gfs?latitude=31.0461&longitude=34.8516&hourly=temperature_2m&timezone=IST&start_date=2022-12-18&end_date=2023-01-03
let latitude = 31.046;
let longitude = 34.851;
let start_date = "2022-12-21";
let end_date = "2022-12-21";
const baseUrl = "https://api.open-meteo.com/v1/gfs?";
const baseParams = "&hourly=temperature_2m&timezone=IST&";
const url = `${baseUrl}latitude=${latitude}&longitude=${longitude}${baseParams}start_date=${start_date}&end_date=${end_date}`

 async function displayTimesTemperatures(url) {
    const response = await fetch(url);
    const data =  await response.json();
    console.log(data.hourly.time);
    console.log(data.hourly.temperature_2m)
}
function displayTimesTemperaturesThens(url) {
    const promiseResponse = fetch(url);
    const promiseData = promiseResponse.then(response => response.json());
    promiseData.then(data => {
        console.log(data.hourly.time);
        console.log(data.hourly.temperature_2m)
    })
}
// displayTimesTemperatures(url);
// console.log("after displaying data")
const currentDate = new Date();
console.log(currentDate.toISOString().substring(0,10));
const day = currentDate.getDate();
currentDate.setDate(day + 17);
console.log("date after 17 days", currentDate.toISOString().substring(0,10));







