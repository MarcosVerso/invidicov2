export class BaseComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
        this.afterRender();
    }

    render() {
        const template = document.createElement("template");
        const htmlContent = this.html();
    }

    style() { return ''; }
    html() { return ''; }
    afterRender() { }
}