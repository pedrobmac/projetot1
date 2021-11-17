export class View {

    protected elemento: HTMLLIElement

    constructor(seletor: string) {
        this.elemento = document.querySelector(seletor)
    }
}