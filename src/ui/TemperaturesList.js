export class TemperaturesList {
    #cityElement
    #listElement
    constructor(idList, idCity) {
        this.#cityElement = document.getElementById(idCity);
        this.#listElement = document.getElementById(idList);
    }
    showResult(dataArray) {
             this.#cityElement.innerHTML = dataArray.city;
             this.#listElement.innerHTML = getListItems(dataArray.objects)
              
    }
}
function getListItems(data) {
    return data.map(d =>
        `<li class="item-class">
                 <p class="item-element">Date: ${d.date} </p>
                 <p class="item-element">Hour: ${d.hour} </p>
                 <p class="item-element">Temperature: ${d.temperature}</p>
          </li>`).join('');
}