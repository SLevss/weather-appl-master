import { showError } from "./errorMessage.js";
export class DataForm {
    #formElement;
    #inputElements;
    #dateFromElement;
    #dateToElement;
    #hourFromElement;
    #hourToElement;
    #errorMessageElement;
    #selectSityElement;
    #dateFrom;
    #dateTo;
    #hourFrom;
    #hourTo;
    #minDate;
    #maxDate;
    #cities;

    constructor(params) {
        this.#formElement = document.getElementById(params.idForm);
        this.#inputElements = document.querySelectorAll(`#${params.idForm} [name]`);
        this.#dateFromElement = document.getElementById(params.idDateFrom);
        this.#dateToElement = document.getElementById(params.idDateTo);
        this.#hourFromElement = document.getElementById(params.idHourFrom);
        this.#hourToElement = document.getElementById(params.idHourTo);
        this.#errorMessageElement = document.getElementById(params.idErrorMessage);
        this.#selectSityElement = document.querySelector(params.sitySelector);
        this.#minDate = params.minMaxDates.minDate;
        this.#maxDate = params.minMaxDates.maxDate;
        this.#cities = params.cities;
        this.onChangeDateFrom();
        this.onChangeDateTo();
        this.onChangeHourFrom();
        this.onChangeHourTo();
        this.outputData();
    }
    addSubmitHandler(processFun) {
        this.#formElement.addEventListener('submit', (event) => {
            event.preventDefault();
            const data = Array.from(this.#inputElements)
            .reduce((res, cur) => {
                res[cur.name] = cur.value;
                return res;
            }, {});
            processFun(data);

        })
    }
    onChangeDateFrom() {
        this.#dateFromElement.addEventListener('change', (event) => {
            const value = event.target.value;
            console.log('onChangeDateFrom', value, this.#dateTo);
            if (this.#dateTo && value > this.#dateTo) {
                showError(event.target, 'error Date From', this.#errorMessageElement);
                console.log('Value Date From must be less than value Date To', value, this.#dateTo);
            } else {
                this.#dateFrom = value;
            }
        })
    }
    onChangeDateTo() {
        this.#dateToElement.addEventListener('change', (event) => {
            const value = event.target.value;
            console.log('onChangeDateTo', value, this.#dateFrom);
            if (this.#dateFrom && value < this.#dateFrom) {
                showError(event.target, 'error Date To', this.#errorMessageElement);
                console.log('Value Date To must be greater than value Date From', this.#dateTo, value);
            } else {
                this.#dateTo = value;
            }
        })
    }
    onChangeHourFrom() {
        this.#hourFromElement.addEventListener('change', (event) => {
            const value = +event.target.value;
            if (this.#hourTo && value > this.#hourTo) {
                showError(event.target, 'error Hour From', this.#errorMessageElement);
                console.log('Value Hour From must be less than value Hour To', value, this.#hourTo);
            } else {
                this.#hourFrom = value;
            }
        })
    }
    onChangeHourTo() {
        this.#hourToElement.addEventListener('change', (event) => {
            const value = +event.target.value;
            if (this.#hourFrom && value < this.#hourFrom) {
                showError(event.target, 'error Hour To', this.#errorMessageElement);
                console.log('Value Hour To must be greater than value Hour From', this.#hourFrom, value);
            } else {
                this.#hourTo = value;
            }
        })
    }
    outputData() {

        this.#selectSityElement.innerHTML +=
            this.#cities.map(current => {
                return `<option value="${current}">${current}</option>`
            }).join('');

        this.#dateFromElement.min = this.#minDate;
        this.#dateFromElement.max = this.#maxDate;
        
        this.#dateToElement.min = this.#minDate;
        this.#dateToElement.max = this.#maxDate;
    }
}