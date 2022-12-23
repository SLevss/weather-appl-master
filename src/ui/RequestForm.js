export class RequestForm {
    #formElement;
    #inputElements;

    constructor(params) {
        this.#formElememt = document.getElementById(params.idForm);
        this.#inputElements = document.querySelectorAll(`#${params.idForm} [name]`);
    }
    addSubmitHandler(processRequest) {
        this.#formElement.addEventListener("submit", (event) => {
            event.preventDefault();
            console.log("submitted");
            const request = Array.from(this.#inputElements).reduce(
                (res, cur) => {
                    res[cur.name] = cur.value;
                    return res;
                }, {}
            )
            console.log(request);
            processRequest(request);
        })
    }

}