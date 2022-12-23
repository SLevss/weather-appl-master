export class TemperaturesList {
    #listElement;
    constructor(idList) {
        this.#listElement = document.getElementById(idList)
    }
    showResults(dataArray) {
        this.#listElement.innerHTML = getRecordList(dataArray)
    }
}

function getRecordList(dataArr) {
    return dataArr.map(value => {
        return ` <div class="details-list">
            <p>Data: ${value.date} Time: ${value.hour} Temperature: ${value.temperature}</p>
    </div>`});
}

